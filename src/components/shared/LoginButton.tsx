"use client"

import { Button } from '../ui/button'
import { LogIn } from 'lucide-react'
import { LoginInWithGoogle } from '@/services/auth'

function LoginButton() {
        
    return (
        <Button 
            size="lg"
            className={`rounded-full px-8 cursor-pointer`}
            onClick={() => LoginInWithGoogle()}
            variant="default">
            Login With Google
        </Button>
    )
}

export default LoginButton