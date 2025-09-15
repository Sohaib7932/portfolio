# EmailJS Setup Guide for Portfolio Contact Form

## Step 1: Create EmailJS Account
1. Go to [https://emailjs.com/](https://emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, click on "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail is recommended)
4. For Gmail:
   - Select "Gmail"
   - Click "Connect Account" and authorize with your Gmail account
   - Your service will be created with a Service ID (save this)

## Step 3: Create Email Template
1. Click on "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: {{subject}} - Portfolio Contact Form

From: {{user_name}} ({{user_email}})

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Sender: {{user_name}}
Email: {{user_email}}
```

4. Save the template and note the Template ID

## Step 4: Get Your Public Key
1. Go to "Account" in your EmailJS dashboard  
2. Find your Public Key (User ID) in the API Keys section

## Step 5: Update Environment Variables
1. Open your `.env.local` file
2. Replace the placeholder values with your actual keys:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

## Step 6: Set Email Destination
In EmailJS dashboard:
1. Go to your email template
2. In the "To Email" field, enter: muhammadsohaib7932@gmail.com
3. Save the template

## Step 7: Test the Form
1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email (muhammadsohaib7932@gmail.com) for the message

## Troubleshooting

### Form shows "EmailJS configuration missing" error:
- Check that all three environment variables are set in `.env.local`
- Restart your development server after updating `.env.local`
- Make sure there are no spaces around the = sign in the env file

### Email not receiving messages:
- Check your EmailJS template configuration
- Verify the "To Email" is set to muhammadsohaib7932@gmail.com
- Check your spam folder
- Ensure your EmailJS service is properly connected

### "Failed to send email" error:
- Check browser console for detailed error messages
- Verify your Service ID, Template ID, and Public Key are correct
- Make sure your EmailJS account is verified

## Free Tier Limits
- EmailJS free tier allows 200 emails per month
- No credit card required for basic usage
- Upgrade to paid plans for higher limits if needed

## Security Notes
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- EmailJS public key is meant to be public (hence the name)
- Rate limiting is handled by EmailJS servers
- Consider adding your own rate limiting for production use
