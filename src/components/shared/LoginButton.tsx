"use client"

import { LoginInWithGoogle } from '@/services/auth.service'
import { Button } from '../ui/button'
import { LogIn } from 'lucide-react'
// import { LoginInWithGoogle } from '@/services/auth'

function LoginButton() {
        
    return (
        <Button 
            size="lg"
            className={`rounded-full px-8 cursor-pointer`}
            onClick={() => LoginInWithGoogle()}
            variant="default">
            <span className=" sm:hidden"> G</span>
            <span className="hidden sm:inline"> Login With Google</span>
        </Button>
    )
}

export default LoginButton