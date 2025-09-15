# Firebase Setup Guide for Email Authentication

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `portfolio-contact` (or your preferred name)
4. Choose whether to enable Google Analytics (optional)
5. Click "Create Project"

## Step 2: Enable Authentication
1. In your Firebase project dashboard, click "Authentication" in the left sidebar
2. Click "Get Started" if you haven't used Authentication before
3. Go to "Sign-in method" tab
4. Find "Email/Password" and click on it
5. **Enable** the first toggle (Email/Password)
6. **Enable** the second toggle (Email link - passwordless sign-in)
7. Click "Save"

## Step 3: Add Web App to Firebase Project
1. In the project overview, click the web icon (`</>`) to add a web app
2. Enter app nickname: "Portfolio Contact Form"
3. **Check** "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the configuration object (you'll need this for Step 4)

## Step 4: Configure Environment Variables
1. Open your `.env.local` file
2. Replace the Firebase placeholder values with your actual configuration:

```env
# Get these values from your Firebase project settings > General > Your apps
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Step 5: Configure Authorized Domains
1. In Firebase Console, go to "Authentication" > "Settings" tab
2. In "Authorized domains" section, make sure these domains are added:
   - `localhost` (for local development)
   - `your-domain.com` (your production domain)
   - `your-domain.vercel.app` (if using Vercel)

## Step 6: Test the Setup
1. Restart your development server: `npm run dev`
2. Go to your contact form
3. Fill out the form with a valid email address
4. Click "Send Message"
5. You should see the email verification modal
6. Check your email for the verification link
7. Click the verification link to complete the process

## How It Works

### Email Verification Flow:
1. **User fills form** → Form validation runs
2. **Email verification needed** → Firebase sends verification email
3. **User clicks email link** → Redirected to `/verify-email` page
4. **Email verified** → Redirected back to contact form
5. **Message sent** → EmailJS sends the message to your inbox

### Security Features:
- ✅ **Email ownership verification** - Only verified email addresses can send messages
- ✅ **One-time verification** - Each email must be verified before sending
- ✅ **Session management** - Verification expires after 1 hour
- ✅ **Spam protection** - Prevents fake/bot submissions
- ✅ **Rate limiting** - Built-in Firebase rate limiting

## Troubleshooting

### "Firebase configuration missing" error:
- Check that all Firebase environment variables are set in `.env.local`
- Restart your development server after updating `.env.local`
- Ensure no spaces around the `=` signs in the env file

### "Domain not authorized" error:
- Add your domain to Firebase Console > Authentication > Settings > Authorized domains
- For local development, ensure `localhost` is in the authorized domains list

### Email verification not working:
- Check that "Email link (passwordless sign-in)" is enabled in Firebase Console
- Verify your authorized domains include the domain you're testing from
- Check spam/junk folder for verification emails
- Ensure the verification URL in `OTPVerification.jsx` matches your domain

### "Auth domain mismatch" error:
- Make sure `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` matches your Firebase project's auth domain
- The format should be: `your-project-id.firebaseapp.com`

## Security Best Practices

### Environment Variables:
- Never commit actual Firebase keys to version control
- Use different Firebase projects for development and production
- Rotate API keys periodically

### Firebase Security Rules:
Since we're only using Authentication (not Firestore/Storage), no additional security rules are needed.

### Rate Limiting:
Firebase Authentication includes built-in rate limiting, but for additional protection:
- Consider implementing client-side rate limiting
- Monitor unusual activity in Firebase Console
- Set up Firebase App Check for production (optional)

## Production Deployment

### Vercel/Netlify:
1. Add your Firebase environment variables to your hosting platform
2. Add your production domain to Firebase authorized domains
3. Update the verification URL in `OTPVerification.jsx` if needed

### Custom Domain:
1. Update authorized domains in Firebase Console
2. Ensure SSL certificate is properly configured
3. Test the email verification flow on production

## Firebase Pricing
- **Spark Plan (Free)**: 10K email verifications/month
- **Blaze Plan (Pay-as-you-go)**: $0.0055 per verification after free tier
- Authentication is very cost-effective for contact forms

## Additional Features (Optional)

### Email Templates:
- Customize verification email templates in Firebase Console
- Add your branding and styling
- Multiple language support

### Analytics:
- Enable Firebase Analytics to track verification success rates
- Monitor bounce rates and user behavior
- Set up conversion tracking
