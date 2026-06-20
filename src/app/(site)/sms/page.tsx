'use client'

import React, { useState, useEffect } from 'react'
import { VerifedSMS } from '@/services/sms.service'
import DemoSMS from './DemoSMS';

// Define the structure of your SMS data
interface SmsItem {
    _id: string;
    tnxId: string;
    amount: number;
    provider: string;
    rawText: string;
    createdAt: string;
}

export default function SMSPage() {
    const [smsList, setSmsList] = useState<SmsItem[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    // Function to handle fetching data dynamically
    const fetchSMSData = async () => {
        setLoading(true)
        try {
            const res = await VerifedSMS()
            // Pulling res.data based on your code structure
            setSmsList(res?.data || [])
        } catch (error) {
            console.error("Failed fetching SMS data:", error)
        } finally {
            setLoading(false)
        }
    }

    // Load data automatically when the page mounts
    useEffect(() => {
        fetchSMSData()
    }, [])

    return (
        <section className="container mx-auto py-10 px-4">
            <DemoSMS/>


            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Verified SMS Logs</h1>
                    <p className="text-sm text-gray-500">Incoming automated payment verification messages</p>
                </div>
                
                {/* Fetch Button */}
                <button 
                    onClick={fetchSMSData}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
                >
                    {loading ? 'Fetching...' : 'Fetch New SMS'}
                </button>
            </div>

            {/* Simple Demo Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 bg-white text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-3">Transaction ID</th>
                            <th className="px-6 py-3">Provider</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Raw SMS Text</th>
                            <th className="px-6 py-3">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {smsList.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                                    {loading ? 'Loading data...' : 'No SMS data found. Click fetch to reload.'}
                                </td>
                            </tr>
                        ) : (
                            smsList.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono font-bold text-gray-900">{item.tnxId}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 uppercase">
                                            {item.provider}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        Tk {item.amount}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate text-gray-500" title={item.rawText}>
                                        {item.rawText}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-400">
                                        {new Date(item.createdAt).toLocaleString()}
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