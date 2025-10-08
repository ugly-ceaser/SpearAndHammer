// EmailJS Configuration for Static Build
// These values will be bundled into your static files
// Replace with your actual EmailJS credentials from https://dashboard.emailjs.com/
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_qvnyfqg',  // From EmailJS > Email Services
  TEMPLATE_ID: 'template_6ihf3ak',  // From EmailJS > Email Templates  
  PUBLIC_KEY: 'ZDnJQ_cBJ6iSHfLhS'   // From EmailJS > Account > General
};

// Development/Testing mode - set to true to simulate emails without sending
export const IS_DEVELOPMENT = false;

// Validation function to check if config is properly set
export const isEmailJSConfigured = (): boolean => {
  return (
    EMAILJS_CONFIG.SERVICE_ID !== 'service_your_service_id' &&
    EMAILJS_CONFIG.TEMPLATE_ID !== 'template_your_template_id' &&
    EMAILJS_CONFIG.PUBLIC_KEY !== 'your_public_key_here' &&
    EMAILJS_CONFIG.SERVICE_ID.length > 0 &&
    EMAILJS_CONFIG.TEMPLATE_ID.length > 0 &&
    EMAILJS_CONFIG.PUBLIC_KEY.length > 0
  );
};