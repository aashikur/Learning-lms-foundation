"use client"

import { use, useEffect, useState, useTransition } from "react"
import { useRouter } from 'next/navigation';

function TableSms({ contactList }: { contactList: any[] }) {
    // const res = use(ContactPromise);

    const router = useRouter();
    // const [isPending, startTransition] = useTransition();

    // const contactList = contacts?.contacts;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (contactList) {
            setIsLoading(false);
        }

    }, [contactList]);

    console.log("Contacts in TableSms:", contactList);
    const handleRefresh = () => {
        // startTransition keeps the UI responsive while refreshing

        router.refresh();

    };

    if(isLoading) {
        return (
            <div className="bg-[#7d6cff] w-full max-w-5xl rounded-[2.2rem] shadow-2xl p-8 md:p-12 lg:p-16 mt-12">
                <h2 className="text-xl font-bold text-white mb-4">Contact List</h2>
                <p className="text-white">Loading contacts...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#7d6cff] w-full max-w-5xl rounded-[2.2rem] shadow-2xl p-8 md:p-12 lg:p-16 mt-12">
            <h2 className="text-xl font-bold text-white mb-4">Contact List

                <button
                    onClick={handleRefresh}
                    // disabled={isPending}

                    className="px-4 py-2 bg-white text-purple-600 rounded ml-4 hover:bg-gray-200 transition-colors duration-300"
                >
                    Refresh List
                </button>
            </h2>
            <ul className="space-y-2">
                <li>
                    <div className="text-gray-00 flex gap-4 md:gap-6 p-4 rounded-md">
                        <p>#</p>
                        <p>Name</p>
                        <p>Email</p>
                        <p>Message</p>
                    </div>
                </li>
                {contactList && contactList.map((contact: any, index: number) => (
                    <li key={contact.id} className="text-white border flex gap-4 md:gap-6 p-4 rounded-md">
                        <p>{index + 1}.</p>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                        <p className='line-clamp-4'>{contact.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TableSms