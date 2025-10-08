// EmailJS Test - Run this in browser console to test your configuration

console.log('🧪 Testing EmailJS Configuration...');

// Check environment variables
console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
console.log('Public Key:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
console.log('Disabled:', process.env.NEXT_PUBLIC_EMAILJS_DISABLED);

// Simple test function
async function testEmailJS() {
  try {
    const emailjs = (await import('@emailjs/browser')).default;
    
    // Initialize
    emailjs.init('DRw2WblW2bJFsU3rN');
    
    // Test data
    const testData = {
      to_email: 'info@spearandhammertech.com',
      from_name: 'Test User',
      from_email: 'test@example.com',
      subject: 'EmailJS Test',
      message: 'This is a test email from EmailJS',
      submission_id: 'TEST_' + Date.now(),
      form_type: 'test',
      timestamp: new Date().toISOString()
    };
    
    console.log('📧 Sending test email...');
    const response = await emailjs.send(
      'service_up4wzoa',
      'template_upx9wed',
      testData
    );
    
    console.log('✅ Success!', response);
    return response;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return error;
  }
}

// Run the test
testEmailJS();

// Instructions
console.log(`
🔧 TROUBLESHOOTING STEPS:

1. Check your EmailJS Dashboard:
   - Service is active: https://dashboard.emailjs.com/admin/services
   - Template exists: https://dashboard.emailjs.com/admin/templates
   - Account is verified

2. Verify template variables in EmailJS Dashboard:
   Required variables: {{subject}}, {{message}}, {{from_name}}, {{from_email}}, {{submission_id}}, {{form_type}}, {{timestamp}}

3. Check network:
   - Try on different network
   - Disable ad blockers
   - Check firewall settings

4. Restart your development server:
   npm run dev

5. If still failing, try the fallback mode:
   Set NEXT_PUBLIC_EMAILJS_DISABLED=true in .env.local
`);