# Netlify Hosting Service

## What is Netlify?

Netlify is the hosting platform for this website. It provides:
- **Web Hosting:** Serves the website at https://imaginative-faun-5004e0.netlify.app
- **Automatic Deployment:** Deploys updates automatically when code is pushed to GitHub
- **Serverless Functions:** Runs the secure contact form backend
- **SSL Certificate:** Free HTTPS encryption
- **CDN:** Fast global content delivery

## Current Configuration

### Account Information
- **Current Account:** gilbertjmasters (or whoever set up the account)
- **Site Name:** imaginative-faun-5004e0
- **Live URL:** https://imaginative-faun-5004e0.netlify.app
- **GitHub Repo:** https://github.com/jake-flatsix/Realtor_Website

### Deployment Settings
- **Source:** GitHub repository (jake-flatsix/Realtor_Website)
- **Branch:** main
- **Build Command:** None (static site)
- **Publish Directory:** `.` (root directory)
- **Functions Directory:** `netlify/functions`

### Environment Variables (Secrets)
The following environment variable is configured:

| Variable Name | Purpose | Type |
|--------------|---------|------|
| `WEB3FORMS_ACCESS_KEY` | Web3Forms API key for contact form | Secret |

**IMPORTANT:** This variable must be configured for the contact form to work.

## Transferring Ownership

### Option 1: Transfer the Netlify Site (Recommended)

1. **New owner creates Netlify account:**
   - Go to https://www.netlify.com
   - Sign up with the email address that should own the site (jseligsonrealtor@gmail.com)
   - Verify email

2. **Current owner transfers site:**
   - Login to Netlify
   - Go to: Site settings → General → Transfer site
   - Enter new owner's email address
   - Click "Transfer site"

3. **New owner accepts transfer:**
   - Check email for transfer notification
   - Click "Accept transfer"
   - Site now appears in new owner's Netlify dashboard

4. **New owner reconnects GitHub:**
   - May need to authorize GitHub access
   - Settings → Build & deploy → Link repository
   - Select the GitHub repository

5. **Re-add environment variables:**
   - Go to: Site configuration → Environment variables
   - Add `WEB3FORMS_ACCESS_KEY` (see WEB3FORMS_SERVICE.md for value)
   - Mark as "Secret value"
   - Trigger a new deploy

### Option 2: Create New Netlify Site from Scratch

If transfer isn't possible, new owner can create a fresh site:

1. **Sign up for Netlify:** https://www.netlify.com (free tier is sufficient)

2. **Import from GitHub:**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select the repository: `Realtor_Website`
   - Branch: `main`
   - Build settings:
     - Build command: (leave blank)
     - Publish directory: `.`
     - Functions directory: `netlify/functions`
   - Click "Deploy site"

3. **Add environment variables:**
   - Go to: Site configuration → Environment variables
   - Click "Add a variable"
   - Name: `WEB3FORMS_ACCESS_KEY`
   - Value: [Get from Web3Forms dashboard]
   - Check "Contains secret values"
   - Scopes: All
   - Click "Create variable"

4. **Trigger redeploy:**
   - Go to: Deploys tab
   - Click "Trigger deploy" → "Deploy site"

5. **Update custom domain (if applicable):**
   - See "Custom Domain Setup" section below

## Custom Domain Setup

If Jeffrey wants to use his own domain (e.g., jeffreyseligson.com):

1. **Add custom domain in Netlify:**
   - Go to: Site configuration → Domain management
   - Click "Add domain"
   - Enter domain name
   - Follow DNS configuration instructions

2. **Update DNS records:**
   - Add CNAME or A records as Netlify instructs
   - SSL certificate will be provisioned automatically (may take 24 hours)

3. **Update references in code:**
   - Edit `netlify/functions/contact-form.js`
   - Update the Origin and Referer headers to use new domain:
     ```javascript
     'Origin': 'https://yournewincdomain.com',
     'Referer': 'https://yournewdomain.com/'
     ```
   - Commit and push changes

## Monitoring and Maintenance

### Check Deployment Status
- **Dashboard:** https://app.netlify.com
- **Deploys Tab:** Shows all deployments and their status
- **Functions Tab:** Shows serverless function invocations and logs

### View Function Logs
1. Go to Netlify Dashboard
2. Click "Functions" in sidebar
3. Click "contact-form"
4. View recent invocations and error messages

### Troubleshooting Deployments

**Issue: Build fails**
- Check: Deploys tab → Failed deploy → View logs
- Common causes: Missing files, syntax errors in code

**Issue: Contact form not working**
- Check: Functions → contact-form → Recent logs
- Verify: Environment variable `WEB3FORMS_ACCESS_KEY` is set
- Test: Try submitting form and check function logs

**Issue: Site not updating**
- Check: Deploys tab for recent deployments
- Verify: GitHub repository has latest changes
- Try: Manually trigger deploy (Trigger deploy → Deploy site)

## Costs

- **Free Tier Includes:**
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Unlimited sites
  - Serverless functions (125k requests/month)
  - SSL certificates
  - Basic DDoS protection

- **Current Usage:** Well within free tier limits

- **If Upgraded Needed:**
  - Pro: $19/month (more bandwidth, build minutes, team features)
  - Rarely needed for single realtor website

## Support and Documentation

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Support:** https://www.netlify.com/support
- **Community Forum:** https://answers.netlify.com
- **Status Page:** https://www.netlifystatus.com

## Important Files for Netlify

| File | Purpose |
|------|---------|
| `netlify.toml` | Netlify configuration (build settings, functions directory) |
| `netlify/functions/contact-form.js` | Contact form serverless function |
| `netlify/functions/get-listings.js` | Placeholder for future BAREIS integration |

## Backup and Recovery

**To backup the site:**
1. GitHub repository already serves as backup
2. Netlify keeps deployment history for rollbacks

**To rollback to previous version:**
1. Go to: Deploys tab
2. Find the working deployment
3. Click "..." → "Publish deploy"

**To migrate away from Netlify:**
- Site is static HTML/CSS/JS
- Can be hosted on any web server or service
- Contact form would need alternative solution (serverless function is Netlify-specific)

## Contact Information

**Current Setup:**
- Netlify Account: [Current owner's email]
- GitHub Repository: jake-flatsix/Realtor_Website
- Site URL: https://imaginative-faun-5004e0.netlify.app

**For Handoff Questions:**
Contact the developer who created this documentation.
