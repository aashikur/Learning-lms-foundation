"use client"

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/AuthProvider'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

import LoginButton from '../shared/LoginButton'
import LogoutButton from '../shared/LogoutButton'
import LoaderBasic from '../loading-state/LoaderBasic'

// 1. Centralized Nav Items Type & Data
interface NavItem {
    name: string
    href: string
}

const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Posts', href: '/posts' },
    { name: 'Courses', href: '/courses' },
    { name: 'Contact', href: '/contact' },
    { name: 'sms', href: '/sms' },
    { name: 'order', href: '/order' },
]

export default function Navbar() {
    const { user, loading } = useAuth()
    const pathname = usePathname()

    return (
        <header className="sticky top-4 z-50 w-full px-4">
            <nav className="container mx-auto flex h-16 items-center justify-between rounded-full border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
                
                {/* Logo */}
                <Link href="/" className="font-bold cursor-pointer text-lg tracking-tight">
                    TCPC-Rankings
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link 
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80 text-foreground/60",
                                    pathname === item.href && "text-foreground font-semibold"
                                )}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side: Auth State (Desktop) + Mobile Menu */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center">
                        <AuthStatus user={user} loading={loading} />
                    </div>

                    {/* Mobile Menu Trigger via Shadcn Sheet */}
                    <div className="md:hidden flex items-center space-x-2">
                        <AuthStatus user={user} loading={loading} />
                        <MobileNav pathname={pathname} />
                    </div>
                </div>
            </nav>
        </header>
    )
}

/* ==========================================
   SUB-COMPONENTS (Contained in the same file)
   ========================================== */

// Auth Status Component to handle loading/user state cleanly
function AuthStatus({ user, loading }: { user: any; loading: boolean }) {
    if (loading) return <LoaderBasic />
    
    if (user) {
        return (
            <div className="flex items-center space-x-2">
                <Avatar title={user.displayName || undefined} className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || ""} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || "CN"}</AvatarFallback>
                </Avatar>
                <LogoutButton />
            </div>
        )
    }

    return <LoginButton />
}

// Mobile Responsive Drawer/Sheet Component
function MobileNav({ pathname }: { pathname: string }) {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger >
                <span 
                    // variant="ghost" 
                    // size="icon" 
                    className="rounded-full h-9 w-9 p-0 hover:bg-muted"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </span>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0 border-l">
                {/* Accessibility requirement for Shadcn Dialogs/Sheets */}
                <SheetTitle className="px-7 text-left font-bold text-lg">
                    Navigation
                </SheetTitle>
                
                <div className="mx-1 my-4 flex flex-col space-y-3 pl-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)} // Close drawer on link click
                            className={cn(
                                "text-muted-foreground hover:text-foreground text-lg transition-colors py-2 block",
                                pathname === item.href && "text-foreground font-medium"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}