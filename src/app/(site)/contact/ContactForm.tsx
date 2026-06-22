"use client"

import { createContact } from '@/services/contact.service';
import { sendEmail } from '@/services/mail.service';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner"
const ContactForm = () => {

    const { register, handleSubmit, reset } = useForm();

    const handleSendMessage = async (data: any) => {

        console.log("Message sent!", data);
        await createContact(data); // Save contact message to database
        reset();

        
        
        toast.success("Message sent successfully!", {
            description: "Thank you for reaching out to us. We will get back to you shortly.",
            position: "top-center",
        });

    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(handleSendMessage)} >
            {/* Name Input  */}
            <div className="space-y-1.5">
                <label className="text-xs md:text-base text-gray-400 tracking-wide  inline-block"> Your Name</label>
                <input type="text"
                    {...register("name")}
                    className="w-full bg-[#f4f5fa] px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#8172ff] transition-all"
                    placeholder="Enter your name" />
            </div>
            {/* Email Input  */}
            <div className="space-y-1.5">
                <label className="text-xs md:text-base text-gray-400 tracking-wide  inline-block"> Your Email</label>
                <input type="email"
                    {...register("email")}
                    className="w-full bg-[#f4f5fa] px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#8172ff] transition-all"
                    placeholder="Enter your email" />
            </div>
            {/* Message Input  */}
            <div className="space-y-1.5">
                <label className="text-xs md:text-base text-gray-400 tracking-wide  inline-block"> Your Message</label>
                <textarea placeholder="Enter your message"
                    {...register("message")}
                    className="w-full bg-[#f4f5fa] px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#8172ff] transition-all"
                    rows={4} />
            </div>
            {/* Name Input  */}
            <button type="submit"
                className="bg-[#7d6cff] hover:bg-[#6c5ce7] text-white font-medium text-sm px-8 py-3.5 shadow-lg transition-all duration-200 transform active:scale-95">
                Send Message
            </button>
        </form>
    );
};

export default ContactForm;