
"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Navbar() {

    const navItems = [
        { name: 'Home', href: '/'},
        { name: 'About', href: '/about'},
        { name: 'Posts', href: '/posts'},
        { name: 'Contact', href: '/contact'},
    ]


    return (
        <nav className="flex container mx-auto items-center justify-between bg-background py-4 px-6  sm border rounded-full">
           <Link href="/" className='font-bold cursor-pointer'> TCPC-Rankings</Link>

            <ul className="flex space-x-4 hidden sm:flex">
                {navItems.map((item) => (
                    <li key={item.name}> 
                        <Link className='hover:opacity-70' href={item.href}>{item.name}</Link>
                    </li>
                ))}
            </ul>
            <Button size="lg" className={`rounded-full px-8 cursor-pointer`}>Login</Button>
        </nav>
    )
}

export default Navbar