# EmailJS Setup Guide for ArchEase

## Steps to Configure EmailJS:

1. **Create an EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Create an Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the connection instructions
   - Note your **Service ID** (you'll need this)

3. **Create Email Templates**
   
   Create two templates - one for architect inquiries and one for vendor registrations:

   ### Template 1: Architect Inquiry
   - Go to "Email Templates" → "Create New Template"
   - Name it: "architect_inquiry"
   - Set up the template:
     - Subject: "New Architect Inquiry - {{firm_name}}"
     - To: Your email address
     - From Name: {{from_name}}
     - From Email: {{email}}
     - Content:
       ```
       New architect inquiry received:
       
       Firm Name: {{firm_name}}
       Contact Name: {{from_name}}
       Email: {{email}}
       Phone: {{phone}}
       Project Type: {{project_type}}
       
       Message:
       {{message}}
       ```

   ### Template 2: Vendor Registration
   - Create another template
   - Name it: "vendor_registration"
   - Set up the template:
     - Subject: "New Vendor Registration - {{company_name}}"
     - To: Your email address
     - From Name: {{contact_name}}
     - From Email: {{email}}
     - Content:
       ```
       New vendor registration received:
       
       Company Name: {{company_name}}
       Contact Person: {{contact_name}}
       Email: {{email}}
       Phone: {{phone}}
       GST Number: {{gst_number}}
       Product Category: {{product_category}}
       
       Description:
       {{description}}
       ```

4. **Get Your API Keys**
   - Go to "Account" → "API Keys"
   - Note your **Public Key**
   - Note your **Template IDs** for both templates

5. **Update the .env file**
   - Add your credentials to the .env file (see .env.example)

6. **Test the Forms**
   - Fill out each form and submit
   - Check your email inbox for the messages

## Important Notes:
- Free tier allows 200 emails per month
- Keep your Service ID and Template IDs secure
- Never commit your actual API keys to version control