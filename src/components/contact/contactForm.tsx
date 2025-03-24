'use client'
import React, { useState } from "react";

// Add this type at the top of your component
type FormErrors = {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  message?: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    message: "",
    privacyPolicy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: e.target.type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.email) newErrors.email = "Invalid Email Format";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen p-4 md:p-16 bg-white">
      {/* Left Section */}
      <div className="md:w-1/2 text-left mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-black">
          Send Us A Message
        </h1>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 bg-white">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-semibold"
            >
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-semibold"
            >
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number with country code"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter a valid email address"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-gray-700 font-semibold"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              placeholder="Enter your company name"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold"
            >
              How can we help you?<span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Privacy Policy */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="privacyPolicy"
              className="mt-1 focus:ring-blue-500"
            />
            <label
              htmlFor="privacyPolicy"
              className="text-gray-700 text-sm font-medium"
            >
              By submitting this form, you agree to our{" "}
              <a
                href="#"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Privacy Policy
              </a>
            </label>
          </div>
          <p className="text-red-500 text-sm mt-1">
            Please check this field if you want to proceed
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Send message →
          </button>
        </form>
      </div>
    </div>
  );
}
