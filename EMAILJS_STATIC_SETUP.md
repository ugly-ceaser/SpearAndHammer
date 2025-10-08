# EmailJS Setup Instructions for Static Build

## 🎯 Quick Setup (3 Steps)

### Step 1: Get Your EmailJS Credentials
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. If you don't have an account, create one (it's free)
3. Collect these 3 values:

   **Service ID**: 
   - Go to **Email Services** → Your service → Copy the Service ID
   - Example: `service_abc123xyz`

   **Template ID**:
   - Go to **Email Templates** → Your template → Copy the Template ID  
   - Example: `template_def456uvw`

   **Public Key**:
   - Go to **Account** → **General** → Copy the Public Key
   - Example: `xyz789pqr123`

### Step 2: Update Configuration File
Edit `src/config/emailjs.ts` and replace the placeholder values:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123xyz',     // ← Your actual service ID
  TEMPLATE_ID: 'template_def456uvw',   // ← Your actual template ID  
  PUBLIC_KEY: 'xyz789pqr123'           // ← Your actual public key
};
```

### Step 3: Test Your Setup
1. Run `npm run build` to generate static files
2. Your forms will now work in the static build!
3. Check browser console for validation messages

## 🔧 Development Mode
To test forms without sending real emails, set:
```typescript
export const IS_DEVELOPMENT = true;  // This will simulate emails in console
```

## ✅ Benefits of This Approach
- ✅ Works with static builds (`output: 'export'`)
- ✅ No server required - pure client-side
- ✅ Credentials bundled securely in build
- ✅ Easy to configure and maintain
- ✅ Perfect for cPanel static hosting

## 🚨 Important Notes
- Your credentials will be bundled in the static files (this is normal for client-side email services)
- EmailJS public keys are designed to be exposed in frontend code
- For sensitive operations, consider server-side solutions

## 📧 Email Template Variables
Make sure your EmailJS template includes these variables:
- `{{to_email}}` - Recipient email
- `{{from_name}}` - Sender name  
- `{{from_email}}` - Sender email
- `{{subject}}` - Email subject
- `{{message}}` - Email content
- `{{submission_id}}` - Unique submission ID
- `{{form_type}}` - Type of form submitted
- `{{timestamp}}` - Submission timestamp