// components/ProtectedRoute.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '../app/firebase'

import { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push('/')
        } else {
          setLoading(false)
        }
      })
  
      return () => unsubscribe()
    }, [router])
  
    if (loading) return null 
  
    return children
  }