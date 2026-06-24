```json

import { connectDB } from "@/lib/db";
import { PaymentOrder } from "@/models/payment.model";

export async function GET(req: Request) {
  try {
    // -------------------------------------------------------------------------
    // ১. ডেটাবেজ কানেকশন এবং ইউআরএল প্যারামিটার রিড করা
    // -------------------------------------------------------------------------
    await connectDB();
    const { searchParams } = new URL(req.url);

    // ইউআরএল থেকে ফিল্টারিং প্যারামিটারগুলো গ্র্যাব করা হচ্ছে
    const status = searchParams.get("status");                 // উদা: "PAID" অথবা "PAID,PENDING"
    const mobileOperator = searchParams.get("mobileOperator"); // উদা: "BKASH" বা "NAGAD"
    const courseId = searchParams.get("courseId");             // উদা: "6a1f3a63ab4e3b"
    const userId = searchParams.get("userId");                 // উদা: "usr_9921"
    const fromDate = searchParams.get("from");                 // ডেট ফিল্টার শুরুর দিন
    const toDate = searchParams.get("to");                     // ডেট ফিল্টার শেষের দিন
    const fields = searchParams.get("fields");                 // ক্লায়েন্ট কোন কোন কলাম ডাউনলোড করতে চায়

    // -------------------------------------------------------------------------
    // ২. ডাইনামিক মঙ্গোডিবি কুয়েরি ফিল্টার বিল্ড আপ (Dynamic Filter Builder)
    // -------------------------------------------------------------------------
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    // ক) স্ট্যাটাস ফিল্টারিং লজিক (সিঙ্গেল এবং মাল্টিপল উভয়ই হ্যান্ডেল করবে)
    if (status) {
      // যদি ইউজার কমা দিয়ে পাঠায় (যেমন: "PAID,PENDING"), তা অ্যারে হয়ে যাবে: ["PAID", "PENDING"]
      const statusArray = status.split(",");
      // $in অপারেটর মানে হলো ডাটাবেজের স্ট্যাটাস এই অ্যারের যেকোনো একটির সাথে মিললেই হবে
      filter.status = { $in: statusArray };
    }

    // খ) মোবাইল অপারেটর ফিল্টারিং লজিক (উদা: শুধু BKASH এর ট্রানজেকশন দেখতে চাইলে)
    if (mobileOperator) {
      const operatorArray = mobileOperator.toUpperCase().split(",");
      filter.mobileOperator = { $in: operatorArray };
    }

    // গ) কোর্স এবং ইউজার আইডি নির্দিষ্ট করা (যদি খালি থাকে বা না পাঠায়, তবে সব ডেটা আসবে)
    if (courseId) filter.courseId = courseId;
    if (userId) filter.userId = userId;

    // ঘ) অ্যাডভান্সড ডেট-রেঞ্জ ফিল্টারিং লজিক
    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) {
        // $gte = Greater Than or Equal (এই তারিখ বা তার পর থেকে)
        filter.createdAt.$gte = new Date(fromDate);
      }
      if (toDate) {
        const endDate = new Date(toDate);
        // টাইমস্ট্যাম্পের শেষ মুহূর্ত (রাত ১১:৫৯:৫৯) সেট করা হচ্ছে যেন ওই দিনের শেষ ট্রানজেকশনটাও মিস না হয়
        endDate.setHours(23, 59, 59, 999);
        // $lte = Less Than or Equal (এই তারিখের ভেতর)
        filter.createdAt.$lte = endDate;
      }
    }

    // -------------------------------------------------------------------------
    // ৩. ডাইনামিক কলাম সিলেকশন (Custom Header Engine)
    // -------------------------------------------------------------------------
    // ইউজার যদি সুনির্দিষ্ট কিছু কলাম চায়, তবে তা অ্যারে হবে, অন্যথায় ডিফল্ট সব কলাম সেট হবে
    const selectedFields = fields 
      ? fields.split(",") 
      : ["userId", "courseId", "amount", "senderNumber", "mobileOperator", "tnxId", "status", "createdAt"];

    // -------------------------------------------------------------------------
    // ৪. ডেটাবেজ এক্সিকিউশন
    // -------------------------------------------------------------------------
    // .find(filter) এর মাধ্যমে শুধুমাত্র ফিল্টার করা ডেটাগুলো খুব দ্রুত মেমোরিতে আসবে (.lean() এর কারণে)
    const orders = await PaymentOrder.find(filter).sort({ createdAt: -1 }).lean();

    if (!orders || orders.length === 0) {
      return new Response("No payment records found for the specified filters.", { status: 404 });
    }

    // CSV ফাইলের একদম প্রথম লাইন (কলামের নামগুলো) তৈরি করা হচ্ছে
    const headers = selectedFields.join(",");

    // -------------------------------------------------------------------------
    // ৫. অবজেক্ট টু সিএসভি রো কনভার্সন (The CSV Processing Engine)
    // -------------------------------------------------------------------------
    const rows = orders.map((order: any) => {
      return selectedFields.map((field) => {
        let value = order[field];

        // যদি কোনো ফিল্ডের ভ্যালু আনডিফাইন্ড, নাল বা খালি থাকে, সিএসভিতে খালি স্ট্রিং বসবে
        if (value === undefined || value === null) {
          return "";
        }

        // যদি ডেট অবজেক্ট হয়, সেটিকে প্লেইন আইএসও স্ট্রিং ফরমেটে কনভার্ট করা হচ্ছে
        if (value instanceof Date) {
          value = value.toISOString();
        }

        // সেফটি চেক: যদি ডেটার ভেতরে কমা (,) বা নতুন লাইন (\n) থাকে, 
        // তবে এক্সেল বা সিএসভি ফাইল ব্রেক করে অন্য কলামে চলে যায়। 
        // তাই পুরো ভ্যালুটাকে ডাবল কোটেশন (") দিয়ে র‍্যাপ করা হচ্ছে।
        const stringValue = String(value).replace(/"/g, '""');
        return `"${stringValue}"`;
      });
    }).map(rowArray => rowArray.join(","));

    // -------------------------------------------------------------------------
    // ৬. সিএসভি স্ট্রিং জোড়া লাগানো (Joining Content)
    // -------------------------------------------------------------------------
    // এখানে হেডার লাইন এবং ডেটার সব লাইনগুলোকে নতুন লাইন ক্যারেক্টার (\n) দিয়ে জোড়া দেওয়া হচ্ছে
    const csvString = [headers, ...rows].join("\n");

    // -------------------------------------------------------------------------
    // ৭. বাফার এবং এনকোডার কেন ব্যবহার করা হয়? (The Binary Stream Engine)
    // -------------------------------------------------------------------------
    // জাভাস্ক্রিপ্টের টেক্সট স্ট্রিং সরাসরি কাঁচা নেটওয়ার্ক প্রোটোকলে ট্রান্সমিট করার চেয়ে 
    // বাইনারি ডেটায় (Uint8Array) রূপান্তর করলে ব্রাউজার অনেক দ্রুত এবং কোনো ডেটা লস ছাড়া 
    // ফাইলটি ডাউনলোড করতে পারে। বিশেষ করে বাংলা বা স্পেশাল ক্যারেক্টার থাকলে UTF-8 বাফারিং জরুরি।
    const encoder = new TextEncoder();
    const csvBuffer = encoder.encode(csvString);

    // -------------------------------------------------------------------------
    // ৮. রেসপন্স এবং ফাইল ডাউনলোড ট্রিগার
    // -------------------------------------------------------------------------
    return new Response(csvBuffer, {
      status: 200,
      headers: {
        // text/csv হেডার ব্রাউজারকে বলে যে এটি কোনো সাধারণ টেক্সট বা এক্সএমএল নয়
        "Content-Type": "text/csv; charset=utf-8",
        // attachment হেডারটি ব্রাউজারকে স্ক্রিনে ডেটা না দেখিয়ে ফাইল হিসেবে পপআপে সেভ করতে বাধ্য করে
        "Content-Disposition": `attachment; filename="payment_orders_${Date.now()}.csv"`,
        "Cache-Control": "no-store, max-age=0"
      }
    });

  } catch (error) {
    console.error("Critical error during payment export:", error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}


