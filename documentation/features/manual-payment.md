# 🚀 Production Migration Guide: MFS Payment & SMS System

Follow these 4 organized steps to safely migrate your automated MFS (bKash/Nagad/Rocket) SMS verification system to your new Next.js project.

---

## 📂 Step 1: Match Infrastructure & Dependencies

Ensure your new project has the exact same foundational setups, packages, and environment variables.

* **Database Connection:** Copy your existing MongoDB connection singleton (`db.ts`) into your new project.
* **UI Icons:** Install the required icon library by running the following command in your terminal:
    ```bash
    npm i lucide-react
    ```
* **Environment Variables:** Add your secure webhook token to your new `.env.local` file:
    ```env
    MFS_WEBHOOK_SECRET="YOUR_SAFE_CUSTOM_PASSWORD"
    ```

---

## 🗂️ Step 2: Copy the Architecture Files

Transfer the exact folders and logic files from your current setup directly into your new project's `src/` directory:

| Source File / Folder | Destination Path | Purpose |
| :--- | :--- | :--- |
| `models/Order.ts` & `VerifiedSMS.ts` | `src/models/` | Database schemas for tracking orders & incoming SMS |
| `utils/mfsParser.ts` | `src/utils/` | Regex parser to read Amount, TrxID, and Sender from SMS |
| `app/api/payments/` | `src/app/api/payments/` | **Entire folder** (Contains webhook & manual verify API endpoints) |
| `components/payment/MfsVerificationModal.tsx` | `src/components/payment/` | Client-side modal UI for users to paste their TrxID |

---

## ⚙️ Step 3: Update Fulfillment Logic

Open `src/app/api/payments/verify/route.ts` (and your webhook route file). Find the conditional block where the order status flips to `"paid"`. 

Depending on your current project type, insert your specific fulfillment logic right there:

> 📄 **For PDFs / Digital Downloads**
> * Trigger an automated email containing the secure download link, or 
> * Set a database flag unlocking instant file access on the user's dashboard.

> 🎓 **For Course Enrollments**
> * Create a new database entry in your `Enrollment` collection matching the `userId` to the specific `courseId`.

> 📋 **For Custom Forms / Registrations**
> * Mark the user's submitted custom form status as `"Approved/Paid"` so it immediately populates on your admin dashboard.

---

## 📱 Step 4: Link the Android Forwarder App

Finally, update your gateway connection so your physical automation phone forwards incoming SMS to the new backend deployment.

1. **Update Target URL:** Open your Android SMS Forwarder app settings and change the target webhook endpoint to your new domain:
   ```text
   [https://your-new-domain.com/api/payments/sms-webhook](https://your-new-domain.com/api/payments/sms-webhook)