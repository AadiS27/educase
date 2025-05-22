"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router";
import { Input } from "../components/input"
import { validateEmail } from "../lib/validation"
import { Loader2 } from 'lucide-react'


const Login = () => {
    const router = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user exists in localStorage (from signup)
      const storedUser = localStorage.getItem("user")
      
      if (storedUser) {
        const user = JSON.parse(storedUser)
        
        // Simple authentication check
        if (user.email === formData.email) {
          // Update login status
          localStorage.setItem("isLoggedIn", "true")
          
          // Navigate to profile page
          router("/profile")
        } else {
          throw new Error("Invalid credentials")
        }
      } else {
        throw new Error("User not found")
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors((prev) => ({
        ...prev,
        form: error instanceof Error ? error.message : "Failed to login. Please try again.",
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8F9] font-sans">
      <div className="bg-[#F7F8F9] w-[375px] h-auto border border-gray-200 px-5 pt-10 pb-7 font-sans">
        <h1 className="text-2xl font-bold text-[#1D2226] leading-9">
          Signin to your <br />
          PopX account
        </h1>
        <p className="text-base text-[#1D2226] opacity-60 leading-[22px] mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>

        {errors.form && (
          <div className="mt-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            {errors.form}
          </div>
        )}

        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            showError={isSubmitted && !!errors.email}
            errorMessage={errors.email}
           
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            showError={isSubmitted && !!errors.password}
            errorMessage={errors.password}
           
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router("/forgot-password")}
              className="text-sm text-[#6C25FF] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#6C25FF] rounded-md text-white text-base leading-[17px] font-medium w-full h-[46px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#5A1EDB] mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-[#1D2226]">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-[#6C25FF] hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
