# Web3Forms Email Service

## What is Web3Forms?

Web3Forms is the email service that powers the contact form on this website. When someone submits the contact form, Web3Forms sends you an email notification with their information.

## Current Configuration

### Account Information
- **Email Address:** jseligsonrealtor@gmail.com (receives form submissions)
- **Service:** Web3Forms (https://web3forms.com)
- **Access Key:** Stored securely in Netlify environment variables

### What Gets Sent
When someone fills out the contact form, you receive an email with:
- **From:** Their name and email (so you can reply directly)
- **Subject:** "New Contact Form Submission from Realtor Website"
- **Body Contains:**
  - Name
  - Email address
  - Phone number
  - Message
  - Selected interests (Buying, Selling, Green building, Rural properties)

### Current Features
✅ **Unlimited Submissions:** No monthly limits on free tier
✅ **Spam Protection:** Honeypot field filters out bots
✅ **No Credit Card Required:** Completely free service
✅ **Direct Reply:** Email appears to come from the sender so you can reply directly

## Transferring Ownership

### Option 1: Change Email Destination (Simplest)

If the Web3Forms account is already set up, just update where emails go:

1. **Login to Web3Forms:**
   - Go to: https://web3forms.com
   - Click "Login" (top right)
   - Use the email that created the account

2. **Update Email Address:**
   - Click on your access key in the dashboard
   - Update email to new owner's address
   - Verify new email address (check inbox)

3. **Done!**
   - No code changes needed
   - Form submissions now go to new email

### Option 2: Create New Web3Forms Account (Fresh Start)

If you can't access the original account or want a fresh start:

1. **Create New Account:**
   - Go to: https://web3forms.com
   - Click "Get Started Free"
   - Enter new owner's email address (jseligsonrealtor@gmail.com)
   - Click "Create Access Key"
   - Copy the access key (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

2. **Update Netlify Environment Variable:**
   - Login to Netlify Dashboard: https://app.netlify.com
   - Select site: "Realtor_Website"
   - Go to: Site configuration → Environment variables
   - Find `WEB3FORMS_ACCESS_KEY`
   - Click "Options (...)→ "Edit"
   - Paste new access key
   - Save

3. **Trigger Redeploy:**
   - Go to: Deploys tab
   - Click "Trigger deploy" → "Deploy site"
   - Wait ~30 seconds

4. **Test the Form:**
   - Visit website contact form
   - Submit a test message
   - Check that email arrives at new address

## Customizing Email Settings

### Change Email Subject Line

Edit the file: `netlify/functions/contact-form.js`

Find line ~65:
```javascript
subject: 'New Contact Form Submission from Realtor Website',
```

Change to whatever you want, then commit and push to GitHub.

### Add CC or BCC

Edit the file: `netlify/functions/contact-form.js`

Add these lines to the `web3formsData` object (around line 66):
```javascript
cc: 'backup@email.com',
bcc: 'another@email.com',
```

Commit and push to GitHub.

### Change "From" Name

Edit the file: `netlify/functions/contact-form.js`

Find line ~67:
```javascript
from_name: 'Jeffrey Seligson Website'
```

Change to desired name, commit and push to GitHub.

### Add Custom Reply-To

Edit the file: `netlify/functions/contact-form.js`

Add this line to the `web3formsData` object:
```javascript
replyto: formData.email,  // Already configured - replies go to form submitter
```

## Security and Privacy

### How the Access Key is Protected
- ✅ Stored in Netlify environment variables (server-side only)
- ✅ Never exposed in browser or HTML source code
- ✅ Marked as "Secret value" in Netlify
- ✅ Only accessible to serverless functions

### Spam Protection
- Honeypot field catches automated bots
- Web3Forms has built-in spam filtering
- Rate limiting prevents abuse
- Server-side validation of required fields

### Data Privacy
- Web3Forms does NOT store form submissions
- Emails sent directly to your inbox
- No third-party data collection
- GDPR compliant

## Troubleshooting

### Form Submissions Not Arriving

**Check 1: Spam/Junk Folder**
- Web3Forms emails sometimes land in spam
- Add noreply@web3forms.com to contacts

**Check 2: Verify Email Address**
- Login to Web3Forms dashboard
- Check that email address is correct and verified

**Check 3: Check Web3Forms Dashboard**
- Go to: https://web3forms.com
- Login and view dashboard
- Check delivery status of recent submissions

**Check 4: Check Netlify Logs**
- Netlify Dashboard → Functions → contact-form
- Look for errors in recent invocations
- If you see "Access key not configured" - environment variable is missing

**Check 5: Test Access Key**
- Make sure `WEB3FORMS_ACCESS_KEY` is set in Netlify
- Trigger a redeploy after adding/updating
- Environment variables only load on deployment

### "Contact Form Not Configured" Error

This means the environment variable is missing:
1. Go to Netlify → Site configuration → Environment variables
2. Verify `WEB3FORMS_ACCESS_KEY` exists
3. If missing, add it (see "Create New Web3Forms Account" above)
4. Trigger redeploy

### Emails Going to Wrong Address

1. Login to Web3Forms dashboard
2. Check which email is associated with your access key
3. Update email address if needed
4. Verify new email address (check inbox for verification link)

### Form Submission Shows Error to User

1. Check Netlify function logs for detailed error
2. Common causes:
   - Missing environment variable
   - Invalid access key
   - Network issues (temporary)
3. Try redeploying site
4. Test with a fresh form submission

## Costs

**Free Tier (Current Plan):**
- ✅ Unlimited form submissions
- ✅ No monthly email limits
- ✅ No credit card required
- ✅ Spam filtering included
- ✅ No expiration

**Paid Plans:**
- Not needed for typical realtor website
- Only consider if you need advanced features (custom SMTP, file uploads, etc.)

## Alternative Email Services

If you ever want to switch from Web3Forms:

**Other Options:**
- **Formspree:** Similar to Web3Forms ($0-$10/month)
- **EmailJS:** Client-side email service (200 emails/month free)
- **SendGrid:** Developer-focused (100 emails/day free)
- **Custom SMTP:** Direct email server integration (requires coding)

**To Switch:**
Would require updating `netlify/functions/contact-form.js` to use new service's API.

## Important Files

| File | Purpose |
|------|---------|
| `netlify/functions/contact-form.js` | Serverless function that sends form data to Web3Forms |
| `index.html` | Contact form HTML (around line 242) |
| `js/main.js` | Form submission JavaScript (around line 169) |

## Web3Forms Dashboard

**URL:** https://web3forms.com
**Login:** Use email address that created the account
**Dashboard Shows:**
- Access key(s)
- Email destination
- Recent submission counts (not full logs)
- Account settings

## Support and Documentation

- **Web3Forms Docs:** https://docs.web3forms.com
- **Support Email:** support@web3forms.com
- **Response Time:** Usually 24-48 hours
- **Status Page:** Check service status if emails aren't sending

## Testing the Contact Form

1. **Visit Website:** https://imaginative-faun-5004e0.netlify.app/#contact
2. **Fill Out Form:**
   - Name: Test User
   - Email: Your email address
   - Phone: (optional)
   - Check any interest boxes
   - Message: "Testing contact form"
3. **Submit**
4. **Check Email:**
   - Should arrive within 1-2 minutes
   - Check spam folder if not in inbox
   - Email subject: "New Contact Form Submission from Realtor Website"

## Backup Plan

If Web3Forms ever stops working:

**Immediate Fallback:**
- Contact info (email, phone) is displayed on contact page
- Users can manually email jseligsonrealtor@gmail.com

**Long-term Solution:**
- Switch to alternative service (Formspree, EmailJS, etc.)
- Would require code changes in `netlify/functions/contact-form.js`

## Contact Information

**Current Setup:**
- Email Recipient: jseligsonrealtor@gmail.com
- Service: Web3Forms (free tier)
- Access Key: Stored in Netlify environment variables

**For Handoff Questions:**
Contact the developer who created this documentation.
