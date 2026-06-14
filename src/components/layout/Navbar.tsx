
"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoginButton from '../shared/LoginButton'
import { useAuth } from '@/providers/AuthProvider'
import { Loader2, LogOut } from 'lucide-react'
import LoaderBasic from '../loading-state/LoaderBasic'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LogoutButton from '../shared/LogoutButton'

function Navbar() {
    const { user, loading } = useAuth();


    const pathname = usePathname()
    console.log(pathname)

    const navItems = [
        { name: 'Home', href: '/' },
        // { name: 'About', href: '/about' },
        // { name: 'Posts', href: '/posts' },
        // { name: 'Courses', href: '/courses' },
        // { name: 'Contact', href: '/contact' },
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
            {
                loading ? <LoaderBasic />
                    :
                    user ?
                        <div  className='flex items-center space-x-.5'>
                            <Avatar title={user.displayName || undefined}>
                                <AvatarImage src={user?.photoURL || ""} />
                                <AvatarFallback>{user?.displayName?.charAt(0) || "CN"}</AvatarFallback>
                            </Avatar>
                            <LogoutButton/>
                            </div>
                        :
                        <LoginButton />
            }
        </nav>
    )
}

export default Navbar
