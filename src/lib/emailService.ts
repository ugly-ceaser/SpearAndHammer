import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, IS_DEVELOPMENT, isEmailJSConfigured } from '../config/emailjs';

// EmailJS configuration for static build
const EMAILJS_SERVICE_ID = EMAILJS_CONFIG.SERVICE_ID;
const EMAILJS_TEMPLATE_ID = EMAILJS_CONFIG.TEMPLATE_ID;  
const EMAILJS_PUBLIC_KEY = EMAILJS_CONFIG.PUBLIC_KEY;

// Validate configuration
const validateEmailJSConfig = () => {
  if (!isEmailJSConfigured()) {
    console.error('EmailJS configuration missing or using default values. Please update src/config/emailjs.ts:');
    console.error('- SERVICE_ID:', EMAILJS_SERVICE_ID !== 'service_your_service_id' ? '✓' : '❌ (using default)');
    console.error('- TEMPLATE_ID:', EMAILJS_TEMPLATE_ID !== 'template_your_template_id' ? '✓' : '❌ (using default)');
    console.error('- PUBLIC_KEY:', EMAILJS_PUBLIC_KEY !== 'your_public_key_here' ? '✓' : '❌ (using default)');
    return false;
  }
  return true;
};

// Initialize EmailJS only if configuration is valid
if (typeof window !== 'undefined' && validateEmailJSConfig() && EMAILJS_PUBLIC_KEY) {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS initialized successfully');
  } catch (error) {
    console.error('❌ EmailJS initialization failed:', error);
  }
}

export interface FormSubmissionData {
  formType: string;
  submissionId: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
  data: Record<string, any>;
}

export const generateSubmissionId = (): string => {
  return `SUB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const createFormSubmission = (
  formType: string,
  formData: Record<string, any>
): FormSubmissionData => {
  return {
    formType,
    submissionId: generateSubmissionId(),
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
    referrer: typeof window !== 'undefined' ? window.document.referrer || 'Direct' : 'Unknown',
    data: formData
  };
};

export const getFormLabels = (formType: string): Record<string, string> => {
  const labelMappings: Record<string, Record<string, string>> = {
    contact: {
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      email: 'Email Address',
      companyName: 'Company Name',
      message: 'Message/Inquiry Details',
      privacyPolicy: 'Privacy Policy Acceptance'
    },
    jobApplication: {
      fullName: 'Applicant Full Name',
      email: 'Applicant Email Address',
      cvLink: 'CV/Resume Link',
      jobTitle: 'Applied Position',
      privacyPolicy: 'Privacy Policy Acceptance'
    },
    trainingBooking: {
      fullName: 'Student Full Name',
      email: 'Student Email Address',
      phone: 'Student Phone Number',
      course: 'Preferred Course',
      experience: 'Experience Level',
      goals: 'Learning Goals & Objectives',
      availability: 'Preferred Schedule',
      selectedPlan: 'Selected Training Plan',
      privacyPolicy: 'Privacy Policy Acceptance'
    },
    corporateConsultation: {
      companyName: 'Company Name',
      contactPerson: 'Primary Contact Person',
      email: 'Company Email Address',
      phone: 'Company Phone Number',
      companySize: 'Company Size/Employees',
      industry: 'Industry Sector',
      trainingNeeds: 'Training Requirements',
      timeline: 'Preferred Timeline',
      objectives: 'Training Objectives',
      selectedPackage: 'Selected Enterprise Package',
      privacyPolicy: 'Privacy Policy Acceptance'
    },
    quotationRequest: {
      name: 'Client Name',
      email: 'Client Email Address',
      projectType: 'Project Type',
      message: 'Project Description & Requirements'
    }
  };

  return labelMappings[formType] || {};
};

export const formatFormDataForEmail = (submission: FormSubmissionData): string => {
  const labels = getFormLabels(submission.formType);
  
  const formattedData = Object.entries(submission.data)
    .map(([key, value]) => {
      const label = labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
      let formattedValue = value;
      
      // Format different value types
      if (typeof value === 'boolean') {
        formattedValue = value ? 'Yes/Accepted' : 'No/Declined';
      } else if (Array.isArray(value)) {
        formattedValue = value.join(', ');
      } else if (value === '' || value === null || value === undefined) {
        formattedValue = 'Not provided';
      }
      
      return `• ${label}: ${formattedValue}`;
    })
    .join('\n');

  const formTypeLabels: Record<string, string> = {
    contact: 'Contact Form Submission',
    jobApplication: 'Job Application Submission',
    trainingBooking: 'Training Booking Request',
    corporateConsultation: 'Corporate Consultation Request',
    quotationRequest: 'Project Quotation Request'
  };

  const formTitle = formTypeLabels[submission.formType] || 'Form Submission';

  return `
=== ${formTitle} ===

📋 SUBMISSION DETAILS:
• Submission ID: ${submission.submissionId}
• Date & Time: ${new Date(submission.timestamp).toLocaleString()}
• Form Type: ${formTitle}
• User Agent: ${submission.userAgent}
• Referrer: ${submission.referrer}

📝 FORM DATA:
${formattedData}

📄 RAW JSON DATA:
${JSON.stringify(submission, null, 2)}

---
This is an automated submission from SpearAndHammer website.
Please respond to the client within 24 hours for optimal customer service.
  `.trim();
};

export const sendFormSubmission = async (
  formType: string,
  formData: Record<string, any>
): Promise<{ success: boolean; error?: string; submissionId?: string }> => {
  try {
    const submission = createFormSubmission(formType, formData);
    
    // Check if EmailJS is disabled (for development/testing)
    if (IS_DEVELOPMENT) {
      console.log('📧 EMAIL SIMULATION - Would send to info@spearandhammertech.com:');
      console.log('Form Type:', formType);
      console.log('Submission ID:', submission.submissionId);
      console.log('Form Data:', JSON.stringify(submission, null, 2));
      console.log('Email Content:', formatFormDataForEmail(submission));
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        submissionId: submission.submissionId
      };
    }
    
    // Check if EmailJS is properly configured
    if (!validateEmailJSConfig()) {
      return {
        success: false,
        error: 'EmailJS is not properly configured. Please check your environment variables.'
      };
    }
    const emailContent = formatFormDataForEmail(submission);
    
    const formTypeLabels: Record<string, string> = {
      contact: 'Contact Form',
      jobApplication: 'Job Application',
      trainingBooking: 'Training Booking',
      corporateConsultation: 'Corporate Consultation',
      quotationRequest: 'Quotation Request'
    };

    const emailData = {
      to_email: 'info@spearandhammertech.com',
      from_name: formData.fullName || formData.name || formData.contactPerson || 'Website Visitor',
      from_email: formData.email || 'noreply@spearandhammertech.com',
      subject: `New ${formTypeLabels[formType] || 'Form'} Submission - ${submission.submissionId}`,
      message: emailContent,
      submission_id: submission.submissionId,
      form_type: formType,
      timestamp: submission.timestamp
    };

    // Add network connectivity check
    if (!navigator.onLine) {
      throw new Error('No internet connection. Please check your network and try again.');
    }

    console.log('📧 Sending email with EmailJS...');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', EMAILJS_TEMPLATE_ID);
    
    // Retry mechanism for network issues
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Attempt ${attempt}/3...`);
        
        const response = await emailjs.send(
          EMAILJS_SERVICE_ID!,
          EMAILJS_TEMPLATE_ID!,
          emailData
        );

        console.log('✅ EmailJS response:', response);
        
        if (response.status === 200) {
          return { 
            success: true, 
            submissionId: submission.submissionId 
          };
        } else {
          throw new Error(`Email service returned status ${response.status}: ${response.text}`);
        }
        
      } catch (error) {
        lastError = error;
        console.log(`❌ Attempt ${attempt} failed:`, error);
        
        if (attempt < 3) {
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    // If all attempts failed, throw the last error
    throw lastError;

  } catch (error) {
    console.error('Form submission error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Handle specific EmailJS and network errors
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error: Please check your internet connection and try again. If the problem persists, try refreshing the page.';
      } else if (error.message.includes('Public Key is invalid')) {
        errorMessage = 'EmailJS configuration error: Invalid public key.';
      } else if (error.message.includes('Service ID')) {
        errorMessage = 'EmailJS configuration error: Invalid service ID.';
      } else if (error.message.includes('Template')) {
        errorMessage = 'EmailJS configuration error: Invalid template ID.';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'CORS error: Please try refreshing the page and submitting again.';
      } else if (error.message.includes('No internet connection')) {
        errorMessage = error.message; // Use the specific network message
      }
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
};