# Web3Forms Contact Form Setup (Secure Method)

Your contact form uses a **secure Netlify serverless function** to keep your Web3Forms access key private. The key is stored in Netlify environment variables and never exposed in your public HTML.

## Step 1: Get Your Access Key

1. **Visit:** https://web3forms.com
2. **Click "Get Started Free"**
3. **Enter your email:** jseligsonrealtor@gmail.com
4. **Click "Create Access Key"**
5. **Copy your Access Key** (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

## Step 2: Add Access Key to Netlify (Securely)

1. **Go to Netlify Dashboard:** https://app.netlify.com
2. **Select your site:** "Realtor_Website" (imaginative-faun-5004e0)
3. **Navigate to:** Site configuration → Environment variables
4. **Click "Add a variable"**
5. **Add this variable:**
   - **Key:** `WEB3FORMS_ACCESS_KEY`
   - **Value:** [Paste your access key from Step 1]
   - **Scopes:** All (default)
6. **Click "Create variable"**

## Step 3: Trigger a Redeploy

The environment variable won't be active until the next deployment. You have two options:

**Option A: Trigger redeploy via dashboard (easiest)**
1. In Netlify, go to: **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**

**Option B: Push a commit**
```bash
git commit --allow-empty -m "Trigger redeploy for environment variables"
git push origin main
```

Netlify will redeploy in ~30 seconds.

## Step 4: Test

1. Visit your site: https://imaginative-faun-5004e0.netlify.app
2. Scroll to the Contact section
3. Fill out the form and submit
4. You should receive an email at: jseligsonrealtor@gmail.com

## Features Included

✅ **Spam Protection:** Honeypot field to catch bots
✅ **Required Fields:** Name, Email, and Message are required
✅ **Success Message:** Shows confirmation after submission
✅ **Error Handling:** Displays helpful error if submission fails
✅ **Loading State:** Button shows "Sending..." during submission
✅ **Form Reset:** Clears form after successful submission
✅ **Email Subject:** "New Contact Form Submission from Realtor Website"

## What You'll Receive

When someone submits the form, you'll get an email with:
- **Name:** Their name
- **Email:** Their email (you can reply directly)
- **Phone:** Their phone number (if provided)
- **Message:** Their message

## Free Tier Limits

Web3Forms free tier includes:
- **Unlimited** form submissions
- **No** monthly limits
- **No** credit card required
- **Spam filtering** included

## Security Features

✅ **Access Key Hidden:** Never exposed in public HTML or browser
✅ **Netlify Environment Variables:** Key stored securely on server-side
✅ **Honeypot Protection:** Catches automated spam bots
✅ **Required Fields:** Validates name, email, and message
✅ **Rate Limiting:** Web3Forms prevents abuse automatically

## Customization (Optional)

### Change Email Subject
Edit `netlify/functions/contact-form.js`, find line ~60:
```javascript
subject: 'New Contact Form Submission from Realtor Website',
```
Change to whatever you want.

### Add CC/BCC
In `netlify/functions/contact-form.js`, add to the `web3formsData` object:
```javascript
cc: 'another@email.com',
bcc: 'backup@email.com',
```

### Custom "From" Name
Already set to "Jeffrey Seligson Website" in the serverless function.

## Troubleshooting

### Form submissions not arriving?
1. **Check spam/junk folder**
2. **Verify environment variable is set:**
   - Netlify Dashboard → Site configuration → Environment variables
   - Look for `WEB3FORMS_ACCESS_KEY`
3. **Check if redeploy happened after adding variable:**
   - Netlify Dashboard → Deploys tab
   - Make sure there's a deployment after you added the variable
4. **Check Netlify function logs:**
   - Netlify Dashboard → Functions tab → contact-form
   - Look for any error messages
5. **Verify Web3Forms dashboard** for delivery status

### "Error sending message" appears?
1. **Check browser console** for errors (F12 → Console tab)
2. **Check Netlify function logs** (Dashboard → Functions → contact-form)
3. **Verify environment variable** is set correctly
4. **Try test submission** with your own email

### "Contact form not configured" error?
This means the `WEB3FORMS_ACCESS_KEY` environment variable is missing or misspelled:
1. Go to Netlify Dashboard → Environment variables
2. Make sure variable name is exactly: `WEB3FORMS_ACCESS_KEY`
3. Trigger a redeploy after adding it

### Want to change where emails go?
1. Log into Web3Forms dashboard
2. Update your email address there
3. Verify the new email address
4. No code changes needed!

## Support

- Web3Forms Docs: https://docs.web3forms.com
- Web3Forms Support: support@web3forms.com

---

That's it! Once you add your access key, your contact form will be fully functional.
