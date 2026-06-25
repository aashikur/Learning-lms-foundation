"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useForm, type FieldValues } from 'react-hook-form';


import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import { CreatePaymentOrder } from '@/services/payment.service';
import { Course } from "@/types/course.types";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { config } from "@/config";
import { SMSStatus } from "@/services/sms.service";
import { CreateOrder } from "@/services/order.service";
import { useRouter } from 'next/navigation';
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";

const CreateOrderButton = ({ course, className }: { course: Course, className?: string }) => {
    const [orderId, setOrderId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { mongoUser, loading } = useAuth();
    // console.log("Mongo User in EnrollNowButton:", mongoUser);

    const router = useRouter();

    const handleEnroll = async () => {

        if (!mongoUser || !mongoUser._id) {
            console.warn("Enroll attempted without authenticated user");
            return;
        }

        const payload = {
            userId: mongoUser._id,
            courseId: course._id,
            amount: course.price,
        };

        setIsLoading(true);
        try {
            const res = await CreateOrder(payload);

            setTimeout(() => {

                router.push(`/checkout/${res.data._id}`);
            }, 1000);


            setOrderId(res.data._id);

        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);


        }
    }





    return (

        <>
            <Button
                size="sm"
                className={`bg-green-600 text-white hover:bg-green-700 ${className}`}
                disabled={loading || !mongoUser}
                onClick={() => handleEnroll()}
            >
                {isLoading ?
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    :
                    "Create Order Now"
                }
            </Button>



            {/* {
                (
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button

                                size="sm"
                                className={`bg-green-600 text-white hover:bg-green-700 ${className}`}
                                disabled={loading || !mongoUser}
                            >
                                Create Order
                            </Button>
                        </DrawerTrigger>


                        <DrawerContent className="max-w-lg mx-auto px-4 sm:px-6">
                            {
                                paymentStatus === "PAID" &&
                                <div className="p-4 py-30">
                                    <h2 className="text-xl font-semibold mb-4">Payment Successful</h2>
                                    <p>Your payment has been completed successfully.</p>

                                    <button
                                        onClick={() =>
                                            window.open(
                                                `/api/download/${orderId}`
                                            )
                                        }
                                        className="bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        Download PDF
                                    </button>
                                </div>
                            }
                            {
                                paymentStatus === "PENDING" &&
                                <div className="p-4 py-30">
                                    <h2 className="text-xl font-semibold mb-4">Payment Pending</h2>
                                    <p>order ID: {orderId}</p>
                                    <p>Your payment is being processed. Please wait...</p>
                                    <p>Checking payment status... Attempt: {count}</p>
                                    <Button onClick={() => setPaymentStatus("PAID")}>test paid</Button>
                                </div>
                            }

                            {
                                paymentStatus === null &&
                                <form onSubmit={handleSubmit(handleEnroll)} className="space-y-4">

                                    <DrawerHeader>
                                        <DrawerTitle>Enroll in Course</DrawerTitle>
                                        <DrawerDescription>Fill in the details to complete your enrollment.</DrawerDescription>
                                    </DrawerHeader>

                                    <Input {...register("tnxId")} type="text" placeholder="TnxId" />
                                    <Input {...register("senderNumber")} type="tel" placeholder="Sender Phone Number" />

                                    <select {...register("mobileOperator")} className="w-full border rounded-md p-2 mt-4">
                                        <option value="">Select Mobile Operator</option>
                                        <option value="bkash">Bkash</option>
                                        <option value="nagad">Nagad</option>
                                        <option value="rocket">Rocket</option>
                                    </select>



                                    <DrawerFooter>
                                        <Button
                                            type="submit"
                                            variant="default"
                                            className="w-full"
                                        >Enroll Now</Button>
                                        <DrawerClose>

                                        </DrawerClose>
                                    </DrawerFooter>
                                </form>
                            }

                        </DrawerContent>
                    </Drawer >
                )
            } */}

        </>
    );
};

export default CreateOrderButton;