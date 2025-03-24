export default function JobApplicationForm() {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
        <div className="w-full max-w-4xl bg-white p-8 rounded-md shadow-lg">
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black">
              Apply as a <span className="text-gray-800">Front-End Web</span>
            </h1>
          </div>
  
          {/* Form Section */}
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-gray-800 font-medium">
                Full name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                required
                className="w-full border border-gray-300 rounded-md p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
  
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-gray-800 font-medium">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter a valid email address"
                required
                className="w-full border border-gray-300 rounded-md p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
  
            {/* Link to CV */}
            <div>
              <label htmlFor="cvLink" className="block text-gray-800 font-medium">
                Link to your CV<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cvLink"
                name="cvLink"
                placeholder="Enter a link to your CV"
                required
                className="w-full border border-gray-300 rounded-md p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
  
            {/* Privacy Policy Agreement */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                required
                className="w-5 h-5 text-black border border-gray-300 rounded focus:ring-2 focus:ring-gray-500"
              />
              <label htmlFor="privacyPolicy" className="ml-3 text-gray-700">
                By submitting this form, you agree to our{" "}
                <a href="#" className="text-black underline">
                  Privacy policy
                </a>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Please check this field if you want to proceed
            </p>
  
            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-40 h-12 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  