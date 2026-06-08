"use client"

import { useAuth } from '@/providers/AuthProvider'
import React from 'react'

function AuthDebug() {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Session Loading...</div>
  }

  console.log("Auth Debug:", { user, loading });
  return (
    <div>
      
      <h1>Auth Debug</h1>
      <p>email: {user?.email}</p>
      <p>uid: {user?.uid}</p>
    </div>
  )
}

export default AuthDebug    