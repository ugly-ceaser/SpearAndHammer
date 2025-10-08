# EmailJS Setup Guide for SpearAndHammer Forms

## 🚀 Setup Instructions

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Copy the **Service ID** (something like `service_xxxxxxx`)

### 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

#### Template Variables:
```
Template Name: SpearAndHammer Form Submissions
Template ID: Copy this ID (something like `template_xxxxxxx`)

Subject: {{subject}}

Content:
New form submission from SpearAndHammer website:

From: {{from_name}} ({{from_email}})
Submission ID: {{submission_id}}
Form Type: {{form_type}}
Timestamp: {{timestamp}}

{{message}}

---
Please respond within 24 hours for optimal customer service.
```

### 4. Get Public Key
1. Go to **Account** in your EmailJS dashboard
2. Copy your **Public Key** (something like `user_xxxxxxxxxxxxxxx`)

### 5. Update Configuration
Replace the placeholder values in `src/lib/emailService.ts`:

```typescript
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'your_service_id'; // From step 2
const EMAILJS_TEMPLATE_ID = 'your_template_id'; // From step 3  
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // From step 4
```

### 6. Test the Integration
1. Fill out any form on your website
2. Check the browser console for any errors
3. Verify that emails are received at info@spearandhammertech.com

## 📧 Email Format Example

When a user submits a form, you'll receive an email like this:

```
Subject: New Contact Form Submission - SUB_1696712345_abc123def

=== Contact Form Submission ===

📋 SUBMISSION DETAILS:
• Submission ID: SUB_1696712345_abc123def
• Date & Time: 10/7/2025, 2:30:45 PM
• Form Type: Contact Form Submission
• User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)...
• Referrer: https://spearandhammertech.com/

📝 FORM DATA:
• Full Name: John Doe
• Phone Number: +234 123 456 7890
• Email Address: john.doe@example.com
• Company Name: Tech Solutions Ltd
• Message/Inquiry Details: I need help building a web application...
• Privacy Policy Acceptance: Yes/Accepted

📄 RAW JSON DATA:
{
  "formType": "contact",
  "submissionId": "SUB_1696712345_abc123def",
  "timestamp": "2025-10-07T14:30:45.123Z",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://spearandhammertech.com/",
  "data": {
    "fullName": "John Doe",
    "phoneNumber": "+234 123 456 7890",
    "email": "john.doe@example.com",
    "companyName": "Tech Solutions Ltd",
    "message": "I need help building a web application...",
    "privacyPolicy": true
  }
}

---
This is an automated submission from SpearAndHammer website.
Please respond to the client within 24 hours for optimal customer service.
```

## 🔧 Features Implemented

### ✅ All Forms Now Send Emails With:
1. **Contact Form** - General inquiries
2. **Job Application Form** - Career applications with CV links
3. **Training Booking Form** - Private training requests
4. **Corporate Consultation Form** - Enterprise training consultations
5. **Footer Quotation Form** - Quick project quotes

### ✅ Each Email Contains:
- **Unique Submission ID** for tracking
- **Detailed labels** for each field
- **Timestamp** and user information
- **Form-specific context** (job title, selected plan, etc.)
- **Raw JSON data** for processing
- **Professional formatting**

### ✅ Enhanced User Experience:
- **Loading states** during submission
- **Success/error messages** with visual feedback
- **Form validation** with error messages
- **Automatic form reset** after successful submission
- **Fallback email suggestions** if submission fails

## 🚨 Security Notes

1. **Public Key Safety**: The EmailJS public key can be safely exposed in client-side code
2. **Rate Limiting**: EmailJS has built-in rate limiting to prevent abuse
3. **Domain Restrictions**: Configure domain restrictions in EmailJS dashboard for production
4. **Data Privacy**: All form data is transmitted securely to EmailJS then to your email

## 📊 Monitoring & Analytics

- Check EmailJS dashboard for delivery statistics
- Monitor browser console for any errors
- Track submission IDs for customer service
- Use the JSON data for CRM integration if needed

## 🆘 Troubleshooting

### Common Issues:
1. **No emails received**: Check EmailJS service configuration and spam folder
2. **Console errors**: Verify all three IDs are correctly configured
3. **Template not working**: Ensure template variables match the ones used in code
4. **Rate limiting**: EmailJS free plan has monthly limits

### Testing:
```bash
# Check network requests in browser DevTools
# Look for EmailJS API calls to api.emailjs.com
# Verify 200 status codes for successful submissions
```

Ready to receive professional, detailed form submissions at info@spearandhammertech.com! 🎉