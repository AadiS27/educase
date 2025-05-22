"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router";
import { Input } from "../components/input"
import { validateEmail, validatePhone, validatePassword } from "../lib/validation"
import { Loader2 } from "lucide-react"

const Signup = () => {
    const router = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    agency: "Yes",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agency: e.target.value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters with a number and special character"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required"
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

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(formData))

      // Navigate to profile page
      router("/profile")
    } catch (error) {
      console.error("Error creating account:", error)
      setErrors((prev) => ({
        ...prev,
        form: "Failed to create account. Please try again.",
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8F9] font-sans">
      <div className="bg-[#F7F8F9] w-[375px] h-auto border border-gray-200 px-5 pt-10 pb-7 font-sans">
        <h1 className="text-2xl font-bold text-[#1D2226] leading-9">
          Create your <br /> PopX account
        </h1>

        {errors.form && (
          <div className="mt-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">{errors.form}</div>
        )}

        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          <Input
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            showError={isSubmitted && !!errors.name}
            errorMessage={errors.name}
          />
          <Input
            id="phone"
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            showError={isSubmitted && !!errors.phone}
            errorMessage={errors.phone}
          />
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
          <Input
            id="company"
            placeholder="Company name"
            value={formData.company}
            onChange={handleChange}
            showError={isSubmitted && !!errors.company}
            errorMessage={errors.company}
          />

          {/* Radio Group */}
          <div>
            <span className="text-[13px] leading-[17px] text-[#1D2226]">
              Are you an Agency?<span className="text-red-500 ml-1">*</span>
            </span>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="agency"
                  value="Yes"
                  checked={formData.agency === "Yes"}
                  onChange={handleRadioChange}
                  className="accent-[#6C25FF] size-4 cursor-pointer"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="agency"
                  value="No"
                  checked={formData.agency === "No"}
                  onChange={handleRadioChange}
                  className="accent-[#6C25FF] cursor-pointer size-4"
                />
                No
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#6C25FF] rounded-md text-white text-base leading-[17px] font-medium w-full h-[46px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#5A1EDB] mt-[88px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
