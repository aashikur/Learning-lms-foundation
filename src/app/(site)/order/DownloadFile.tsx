"use client";

import { cn } from '@/lib/utils';
import React, { useState } from 'react';

/**
 * @interface ExportConfig
 * Configuration for explicit static typing across lists
 */
type AllowedField = "userId" | "courseId" | "amount" | "status" | "tnxId" | "createdAt";
type AllowedStatus = "PAID" | "PENDING" | "FAILED";

const DownloadFile: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [selectedFields, setSelectedFields] = useState<AllowedField[]>(["amount", "status", "tnxId"]);
    const [selectedStatuses, setSelectedStatuses] = useState<AllowedStatus[]>(["PAID"]);

    // --- assending or desending order state ---
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    // --- Date raange state --- 
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");

    // --- STATIC SCHEMA DEFINITIONS ---
    const availableFields: { id: AllowedField; label: string }[] = [
        { id: "userId", label: "User ID" },
        { id: "courseId", label: "Course ID" },
        { id: "amount", label: "Amount" },
        { id: "status", label: "Status" },
        { id: "tnxId", label: "Transaction ID" },
        { id: "createdAt", label: "Date Created" },
    ];

    const availableStatuses: AllowedStatus[] = ["PAID", "PENDING", "FAILED"];

    // --- TOGGLE HANDLERS ---
    const handleFieldChange = (field: AllowedField) => {
        setSelectedFields(prev =>
            prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
        );
    };

    const handleStatusChange = (status: AllowedStatus) => {
        setSelectedStatuses(prev =>
            prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
        );
    };

    // --- EXPORT TRIGGER ---
    const handleExport = () => {
        // Production Guard: Stop execution if payload would be empty
        if (selectedFields.length === 0 || selectedStatuses.length === 0) return;

        const params = new URLSearchParams();
        params.set('fields', selectedFields.join(','));
        params.set('status', selectedStatuses.join(','));

        if (fromDate) params.set('from', fromDate);
        if (toDate) params.set('to', toDate);

        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);

        // Safe explicit string casting for cross-browser reliability
        // console.log("Exporting with params:", Object.fromEntries(params.entries()));
        window.open(`/api/payments/export?${params.toString()}`, '_blank');
    };

    // Validation checks for button states
    const isExportDisabled = selectedFields.length === 0 || selectedStatuses.length === 0;

    return (
        <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            {/* Main structural layout: Stacks on mobile, splits elegantly on large screens */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* Left Controls Wrapper */}
                <div className="flex flex-col sm:flex-row gap-6 flex-1">

                    {/* Status Filter Column */}
                    <div className="flex flex-col gap-2 min-w-40 border px-8 py-4 rounded-lg">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                            Filter Status
                        </span>
                        <div className="flex flex-wrap gap-2 ">
                            {availableStatuses.map(statusVal => {
                                const isChecked = selectedStatuses.includes(statusVal);
                                return (
                                    <label
                                        key={statusVal}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md border cursor-pointer select-none transition-all duration-200 flex items-center justify-center
                                            ${isChecked
                                                ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 font-semibold '
                                                : 'bg-transparent border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleStatusChange(statusVal)}
                                            className="sr-only" // Visually hidden, remains focusable/accessible
                                        />
                                        {statusVal}
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column Selection Filter */}
                    <div className="flex flex-col gap-2 flex-1 border px-8 py-4 rounded-lg">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                            Export Columns ({selectedFields.length} selected)
                        </span>
                        <div className="flex flex-wrap gap-2 ">
                            {availableFields.map(field => {
                                const isChecked = selectedFields.includes(field.id);
                                return (
                                    <label
                                        key={field.id}
                                        className={cn("border rounded-lg px-2", isChecked ? "bg-black text-white" : "")}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleFieldChange(field.id)}
                                            className="sr-only"
                                        />
                                        {field.label}
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Date Range Filter (TBD) */}
                    <div className="flex flex-col gap-2 min-w-40 border px-8 py-4 rounded-lg">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                            Date Range (TBD)
                        </span>
                        <div className="flex items-center gap-2">
                            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border rounded-lg px-2 py-1 text-sm" />
                            <span className="text-sm text-zinc-400">to</span>
                            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border rounded-lg px-2 py-1 text-sm" />
                        </div>
                    </div>

                    <div className="flex gap-4">

                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} >
                            <option value="createdAt">
                                Created Date
                            </option>
                            <option value="amount">
                                Amount
                            </option>
                            <option value="status">
                                Status
                            </option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                        >
                            <option value="desc">
                                Descending
                            </option>
                            <option value="asc">
                                Ascending
                            </option>
                        </select>
                    </div>
                </div>

                {/* Right Export Action Section */}
                <div className="flex flex-col items-stretch lg:items-end justify-end pt-4 lg:pt-0 border-t border-zinc-100 dark:border-zinc-800 lg:border-t-0 min-w-35">
                    <button
                        onClick={handleExport}
                        disabled={isExportDisabled}
                        className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium py-2.5 px-5 rounded-lg text-sm transition-all shadow-sm active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none disabled:transform-none"
                    >
                        {/* Inline Minimal SVG Icon representing a Download Action */}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Export CSV
                    </button>

                </div>

            </div>
        </div >
    );
};

export default DownloadFile;