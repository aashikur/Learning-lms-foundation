
"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Navbar() {

    const pathname = usePathname()
    console.log(pathname)

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Posts', href: '/posts' },
        { name: 'Courses', href: '/courses' },
        { name: 'Contact', href: '/contact' },
    ]


    return (
        <nav className="flex flex-col sm:flex-row container mx-auto items-center justify-between bg-background py-4 px-6  sm border rounded-full">
            <Link href="/" className='font-bold cursor-pointer'> TCPC-Rankings </Link>

            <ul className="flex space-x-4  flex">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link className={cn(pathname === item.href && pathname) + "hover:opacity-70"} href={item.href}>{item.name}</Link>
                    </li>
                ))}
            </ul>
            <Button size="lg" className={`rounded-full px-8 cursor-pointer`}>Login</Button>
        </nav>
    )
}

export default Navbar