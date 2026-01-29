# Web3Forms Contact Form Setup

Your contact form is now ready to use! Just follow these simple steps to activate it.

## Step 1: Get Your Access Key

1. **Visit:** https://web3forms.com
2. **Click "Get Started Free"**
3. **Enter your email:** jseligsonrealtor@gmail.com
4. **Click "Create Access Key"**
5. **Copy your Access Key** (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

## Step 2: Add Access Key to Website

1. **Open file:** `index.html`
2. **Find line ~244** (in the contact form section):
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE">
   ```
3. **Replace** `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual access key
4. **Save the file**

## Step 3: Deploy

```bash
git add index.html WEB3FORMS_SETUP.md
git commit -m "Add Web3Forms access key"
git push origin main
```

Netlify will automatically deploy in ~30 seconds.

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

## Customization (Optional)

### Change Email Subject
In `index.html`, find:
```html
<input type="hidden" name="subject" value="New Contact Form Submission from Realtor Website">
```
Change the value to whatever you want.

### Add CC/BCC
Add these lines after the access_key input:
```html
<input type="hidden" name="cc" value="another@email.com">
<input type="hidden" name="bcc" value="backup@email.com">
```

### Custom "From" Name
Add this line:
```html
<input type="hidden" name="from_name" value="Jeffrey Seligson Website">
```

## Troubleshooting

### Form submissions not arriving?
1. Check spam/junk folder
2. Verify access key is correct in index.html
3. Check Web3Forms dashboard for delivery status

### "Error sending message" appears?
1. Check browser console for errors (F12)
2. Verify you have internet connection
3. Try with a different email address

### Want to change where emails go?
1. Log into Web3Forms dashboard
2. Update your email address there
3. Verify the new email address

## Support

- Web3Forms Docs: https://docs.web3forms.com
- Web3Forms Support: support@web3forms.com

---

That's it! Once you add your access key, your contact form will be fully functional.
