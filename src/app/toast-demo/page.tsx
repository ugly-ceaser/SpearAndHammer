'use client';
import { useToast } from '@/components/ui/Toast';

export default function ToastDemo() {
  const { showToast } = useToast();

  const showSuccessToast = () => {
    showToast({
      type: 'success',
      title: 'Form Submitted Successfully!',
      message: 'We will contact you within 24 hours to schedule your consultation.'
    });
  };

  const showErrorToast = () => {
    showToast({
      type: 'error',
      title: 'Submission Failed',
      message: 'Please try again or email us directly at info@spearandhammertech.com'
    });
  };

  const showWarningToast = () => {
    showToast({
      type: 'warning',
      title: 'Please Complete Required Fields',
      message: 'Some required fields are missing. Please check your form and try again.'
    });
  };

  const showInfoToast = () => {
    showToast({
      type: 'info',
      title: 'Email Configuration',
      message: 'Forms are currently in demo mode. Check console for details.'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="w-[80vw] mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Toast Notification System
          </h1>
          <p className="text-gray-600 text-lg">
            Elegant feedback system with brand-consistent colors
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Demo Toast Types</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={showSuccessToast}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Success Toast
            </button>
            
            <button
              onClick={showErrorToast}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Error Toast
            </button>
            
            <button
              onClick={showWarningToast}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Warning Toast
            </button>
            
            <button
              onClick={showInfoToast}
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Info Toast
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Toast Features:</h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Consistent with brand colors (black, gray, white)</li>
              <li>• Auto-dismiss after 5 seconds</li>
              <li>• Smooth animations (slide in from right)</li>
              <li>• Click to dismiss manually</li>
              <li>• Stacks multiple toasts elegantly</li>
              <li>• Accessible with proper ARIA labels</li>
              <li>• Mobile-responsive design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}