"use client"
import React from 'react'
import { Button } from '../ui/button'
import { LogOutIcon } from 'lucide-react'
import { logout } from '@/services/auth'

function LogoutButton() {
  return (
    <Button variant="ghost" onClick={() =>{logout()}}>
       <LogOutIcon className="size-4 cursor-pointer text-muted-foreground hover:text-foreground" />
    </Button>
  )
}

export default LogoutButton