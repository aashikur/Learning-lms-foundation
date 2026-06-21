import React from 'react';

const ContactForm = () => {
    return (
        <form className="space-y-4">
            {/* Name Input  */}
            <div className="space-y-1.5">
                <label className="text-xs md:text-base text-gray-400 tracking-wide  inline-block"> Your Name</label>
                <input type="text"
                    className="w-full bg-[#f4f5fa] px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#8172ff] transition-all"
                    placeholder="Enter your name" />
            </div>
            {/* Email Input  */}
            <div className="space-y-1.5">
                <label className="text-xs md:text-base text-gray-400 tracking-wide  inline-block"> Your Email</label>
                <input type="email"
                    className="w-full bg-[#f4f5fa] px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#8172ff] transition-all"
                    placeholder="Enter your email" />
            </div>
            {/* Message Input  */}
            <div className="space-y-1.5">
                <label className="text-xs md:text-base text-gray-400 tracking-wide  inline-block"> Your Message</label>
                <textarea placeholder="Enter your message"
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