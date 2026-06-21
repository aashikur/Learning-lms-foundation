'use client'

import React, { useState, useEffect } from 'react'
import { GetAllPaymentOrders } from '@/services/payment.service'
import DownloadFile from '@/app/(site)/order/DownloadFile';

// Define a TypeScript interface for your order data structure
interface Order {
    _id: string;
    userId: string;
    courseId: string;
    amount: number;
    senderNumber: string;
    mobileOperator: string;
    tnxId: string;
    status: string;
    unlocked: boolean;
    createdAt: string;
}

export default function OrderPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    // Function to handle fetching data
    const fetchOrders = async () => {
        setLoading(true)
        try {
            const res = await GetAllPaymentOrders()
            // Adjust this fallback depending on how your API response looks
            setOrders(res?.orders || []) 
        } catch (error) {
            console.error("Failed fetching orders:", error)
        } finally {
            setLoading(false)
        }
    }

    // Automatically load data once when the page loads
    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <section className="container mx-auto py-10 px-4">

            <DownloadFile/>
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Payment Orders</h1>
                
                {/* Fetch Button */}
                <button 
                    onClick={fetchOrders}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
                >
                    {loading ? 'Fetching...' : 'Fetch New Data'}
                </button>
            </div>

            {/* Simple Demo Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 bg-white text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Sender Number</th>
                            <th className="px-6 py-3">Operator</th>
                            <th className="px-6 py-3">Transaction ID</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                                    {loading ? 'Loading data...' : 'No orders found. Click fetch to try again.'}
                                </td>
                            </tr>
                        ) : (
                            orders.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{item._id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.senderNumber}</td>
                                    <td className="px-6 py-4 uppercase">{item.mobileOperator}</td>
                                    <td className="px-6 py-4 font-mono">{item.tnxId}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">${item.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                                            item.status === 'PAID' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}