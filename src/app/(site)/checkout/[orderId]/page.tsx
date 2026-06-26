"use client"
import { Instruction } from '@/app/(site)/checkout/[orderId]/Instruction';
import MfsVerificationModal from '@/components/payment/MfsVerificationModal';
import React from 'react';

interface PageProps {
    params: Promise<{
        orderId: string;
    }>
}

const CheckoutPage = async ({ params }: PageProps) => {
    const { orderId } = await params;
    return (
        <div className="container mx-auto py-10 text-center">
            <Instruction/>
            {/* <h1 className="text-3xl font-bold mb-4">Checkout Page</h1>
            <p>Order ID: {orderId}</p>
            {/* Add more checkout details and components here */}
            <MfsVerificationModal expectedAmount={1200} orderId={orderId} /> 
        </div>
    );
}



export default CheckoutPage 