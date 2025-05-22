"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { Camera, Edit2 } from "lucide-react";



interface UserData {
  name?: string
  email: string
  phone?: string
  company?: string
  agency?: string
}

export default function Profile() {
  const router = useNavigate()
  const [user, setUser] = useState<UserData | null>(null)



  useEffect(() => {
    // Check if user is logged in
    try {
      const userData = localStorage.getItem("user")
     
      if (userData) {
        setUser(JSON.parse(userData))
      } else {
        // Redirect to login if no user data found
        router("/login")
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem("isLoggedIn")
        if (isLoggedIn !== "true") {
            router("/login")
        }
    }
  }, [router])

  

  
  

  if (!user) {
    return null // Will redirect in useEffect
  }

  const name = user.name || "Guest User"
  const email = user.email || "Not logged in"
  const company = user.company || ""

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center">
      <div className="w-full max-w-md mx-4 mt-8 pb-8">
        <div className="bg-white rounded-t-xl shadow-sm">
          <h2 className="text-lg font-semibold p-6 pb-3 text-left border-b">Account Settings</h2>
          <div className="flex items-center gap-4 px-6 pt-5 pb-2">
            <div className="relative">
              <div className="rounded-full w-16 h-16 overflow-hidden border">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="profile"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                className="absolute bottom-0 right-0 bg-[#6C25FF] p-1 rounded-full border-2 border-white"
                aria-label="Change profile picture"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-base mb-1">{name}</span>
              <span className="text-gray-500 text-sm">{email}</span>
              {company && <span className="text-gray-400 text-xs mt-0.5">{company}</span>}
            </div>
            <button
              onClick={() => router("/")}
              className="ml-auto bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
              aria-label="Edit profile"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="px-6 pb-4 pt-2">
            <p className="text-sm text-gray-600">
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore
              Et Dolore Magna Aliquam Erat, Sed Diam
            </p>
          </div>
        </div>

       
        
      </div>
    </div>
  )
}
