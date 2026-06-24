
import ContactForm from './ContactForm';
import Image from 'next/image';
import { PhoneIcon } from 'lucide-react';
import { getContacts } from '@/services/contact.service';
import TableSms from './TableSms';

const  ContactPage =  async() => {

    // const ContactPromise =   getContacts();
    const contacts  =   await getContacts();
    const contactList = contacts?.contacts || [];


    

    return (
        <div className="min-h-screen w-full bg-[#6c5ce7] -mt-20  flex flex-col items-center justify-center p-4  pt-11 font-sans"> 
         
         <div className="mt-25"></div>

            <div className="bg-white border w-full max-w-5xl rounded-[2.2rem] shadow-2xl p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative overflow-hidden">

                {/* Left */}
                <div className="md:col-span-7 space-y-6">
                    <header className="space-y-3">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#3b3b98]">Let&apos;s Talk</h1>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed tracking-wide max-w-md">
                            To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly
                        </p>
                    </header>
                    <ContactForm />
                </div>

                {/* Right */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">

                    <div className="relative w-full">
                        <Image width={500} height={500} src="/contact-image.jpg" alt="Contact Us" className="w-full object-cover" />
                    </div>

                    {/* contact details */}
                    <div className="w-full space-y-4 text-sm text-gray-500">
                        {/* address */}
                        <div className="flex items-start gap-3 space-x-3 md:justify-start justify-center">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#7d6cff] mt-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </span>
                            <div>
                                <p>123 Main Street, City, Country</p>
                                <p>123 Main Street, City, Country</p>
                            </div>
                        </div>
                        {/* phone */}
                        <div className="flex items-start gap-3 space-x-3 justify-center md:justify-start">
                            <span className="text-[#7d6cff] mt-0.5">
                                <PhoneIcon className="h-5 w-5" />
                            </span>
                            <div>
                                <p>+1 (123) 456-7890</p>
                                <p>+1 (123) 456-7890</p>
                            </div>
                        </div>
                        {/* email */}
                        <div className="flex items-start gap-3 space-x-3 justify-center md:justify-start">
                            <span className="text-[#7d6cff] mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-13.5a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6H18M6 6A4.543 4.543 0 019 4A4.543 4.543 0 0113.9988888888889 6H6z" />
                                </svg>
                            </span>
                            <div className="flex flex-col">
                                <a href="mailto:info@company.com" className="text-blue-500 hover:underline">
                                    info@company.com
                                </a>
                            </div>
                        </div>

                        {/* Social media links */}
                        <div className="w-full flex justify-center md:justify-start space-x-4">
                            <a href="#" className="w-10 h-10 bg-[#3B5998] text-white rounded-full flex items-center justify-center font-bold hover:opacity-90 transition-opacity">f</a>
                            <a href="#" className="w-10 h-10 bg-[#1DA1F2] text-white rounded-full flex items-center justify-center font-bold hover:opacity-90 transition-opacity">t</a>
                            <a href="#" className="w-10 h-10 bg-[#0077B5] text-white rounded-full flex items-center justify-center font-bold hover:opacity-90 transition-opacity">i</a>
                        </div>
                    </div>
                </div>
            </div>


        <TableSms contactList={contactList} />
        </div>
    );
};

export default ContactPage;