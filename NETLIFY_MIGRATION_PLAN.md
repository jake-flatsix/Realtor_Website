# Netlify Account Migration & Custom Domain Setup Plan

This guide covers the complete process of migrating the Jeffrey Seligson Realtor website to a new Netlify account and setting up a custom domain from GoDaddy.

---

## Overview

**Current Setup:**
- Netlify Account: gilbertjmasters (or current owner)
- Site Name: imaginative-faun-5004e0
- Current URL: https://imaginative-faun-5004e0.netlify.app
- GitHub Repo: jake-flatsix/Realtor_Website

**Migration Goals:**
1. Create new Netlify account (likely for Jeffrey)
2. Transfer website to new account
3. Connect custom domain from GoDaddy
4. Maintain all functionality (contact form, serverless functions)

**Estimated Time:** 30-60 minutes

---

## Phase 1: Create New Netlify Account

### Step 1.1: Sign Up for Netlify

**Who does this:** Jeffrey (or new website owner)

1. **Go to:** https://www.netlify.com
2. **Click:** "Sign up" (top right)
3. **Choose sign-up method:**
   - **Option A (Recommended):** Sign up with GitHub
     - Click "GitHub"
     - Authorize Netlify to access GitHub
     - Benefits: Easy deployment, automatic integration
   - **Option B:** Sign up with email
     - Enter email (e.g., jseligsonrealtor@gmail.com)
     - Create password
     - Verify email
4. **Complete profile:**
   - Full name: Jeffrey Seligson
   - Team name: (optional, can skip)
5. **Verify email** (check inbox for verification link)

**Result:** New Netlify account is ready

---

## Phase 2: Transfer Website to New Account

You have **two options** for transferring:

### Option A: Direct Site Transfer (Easiest - If Available)

**Requirements:**
- Both accounts must exist
- Current owner must initiate transfer
- New owner must accept

**Steps:**

**Current Owner (gilbertjmasters):**
1. Login to Netlify: https://app.netlify.com
2. Select site: "imaginative-faun-5004e0"
3. Go to: **Site settings** → **General**
4. Scroll to: **Transfer site ownership**
5. Click: **Transfer site**
6. Enter: New owner's email (jseligsonrealtor@gmail.com)
7. Click: **Transfer site**

**New Owner (Jeffrey):**
1. Check email for transfer notification
2. Click: **Accept transfer** link in email
3. Confirm transfer
4. Site now appears in new Netlify dashboard

**Advantages:**
- ✅ Keeps all settings, environment variables, deployment history
- ✅ No reconfiguration needed
- ✅ Fastest method

**After Transfer:**
- Verify environment variable `WEB3FORMS_ACCESS_KEY` is still present
- Test contact form submission
- If everything works, you're done!

---

### Option B: Create Fresh Deployment (Alternative)

**Use this if:**
- Direct transfer isn't available
- You want a clean start
- You're comfortable reconfiguring

**Steps:**

**New Owner (Jeffrey):**

1. **Login to Netlify** with new account

2. **Import from GitHub:**
   - Click: **Add new site** → **Import an existing project**
   - Choose: **Deploy with GitHub**
   - Authorize: GitHub access (if not done during sign-up)
   - Select repository: **Realtor_Website**
   - Choose branch: **main**

3. **Configure build settings:**
   - **Branch to deploy:** main
   - **Build command:** (leave blank)
   - **Publish directory:** `.` (period/dot)
   - **Functions directory:** `netlify/functions`
   - Click: **Deploy site**

4. **Wait for deployment** (~30 seconds)
   - Site will get a random URL like: https://random-name-123456.netlify.app

5. **Add environment variable:**
   - Go to: **Site configuration** → **Environment variables**
   - Click: **Add a variable**
   - **Key:** `WEB3FORMS_ACCESS_KEY`
   - **Value:** [Get from Web3Forms dashboard - see WEB3FORMS_SERVICE.md]
   - Check: **Contains secret values**
   - **Scopes:** All
   - Click: **Create variable**

6. **Trigger redeploy:**
   - Go to: **Deploys** tab
   - Click: **Trigger deploy** → **Deploy site**
   - Wait ~30 seconds

7. **Test contact form:**
   - Visit new site URL
   - Submit test contact form
   - Verify email arrives

**Advantages:**
- ✅ Fresh start with new account
- ✅ Clean deployment history
- ✅ Learn the deployment process

**Disadvantages:**
- ❌ Must reconfigure environment variables
- ❌ Loses deployment history
- ❌ More steps

---

## Phase 3: Connect Custom Domain from GoDaddy

**Assumptions:**
- Jeffrey owns a domain at GoDaddy (e.g., jeffreyseligson.com)
- Domain is registered and active
- Jeffrey has GoDaddy login credentials

### Step 3.1: Add Custom Domain in Netlify

**In Netlify Dashboard:**

1. **Go to:** Site configuration → **Domain management**
2. **Click:** "Add domain"
3. **Enter domain name:**
   - Example: `jeffreyseligson.com`
   - Or: `www.jeffreyseligson.com`
4. **Click:** "Add domain"
5. **Netlify will verify** you own the domain

**Netlify provides DNS configuration instructions** - note these down!

### Step 3.2: Configure DNS in GoDaddy

**Two options for DNS:**

#### Option A: Use Netlify DNS (Recommended - Easiest)

**Advantages:**
- Automatic SSL certificate
- Faster propagation
- Managed by Netlify
- Better performance

**Steps:**

**In Netlify:**
1. Domain settings → Click: **Set up Netlify DNS**
2. Netlify provides nameservers (4 addresses like):
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - `dns3.p01.nsone.net`
   - `dns4.p01.nsone.net`
3. **Copy these nameservers**

**In GoDaddy:**
1. Login to GoDaddy: https://dcc.godaddy.com/domains
2. Click on your domain (e.g., jeffreyseligson.com)
3. Scroll to: **Additional Settings** → **Manage DNS**
4. Scroll to: **Nameservers** section
5. Click: **Change**
6. Select: **I'll use my own nameservers**
7. **Paste Netlify nameservers** (all 4)
8. Click: **Save**

**Wait for DNS propagation:** 24-48 hours (usually much faster)

---

#### Option B: Use GoDaddy DNS (Alternative)

**Use this if you want to keep GoDaddy DNS management**

**Steps:**

**In Netlify - Get DNS Records:**
1. Domain settings → Shows required DNS records:
   - **A Record:** Points to Netlify IP (e.g., 75.2.60.5)
   - **CNAME Record:** www → [your-site].netlify.app

**In GoDaddy - Add DNS Records:**

1. Login to GoDaddy
2. Domain → **Manage DNS**
3. **Add A Record:**
   - Type: **A**
   - Name: **@** (represents root domain)
   - Value: [Netlify IP address from step 1]
   - TTL: 600 seconds (default)
   - Click: **Save**

4. **Add CNAME Record (for www):**
   - Type: **CNAME**
   - Name: **www**
   - Value: `[your-site-name].netlify.app` (e.g., imaginative-faun-5004e0.netlify.app)
   - TTL: 1 Hour
   - Click: **Save**

5. **Remove conflicting records:**
   - Delete any existing A records for @
   - Delete any existing CNAME for www
   - Delete GoDaddy parking page records

**Wait for DNS propagation:** 1-4 hours

---

### Step 3.3: Enable HTTPS/SSL

**In Netlify:**

1. **Wait for DNS to propagate** (can take up to 48 hours)
2. **Check DNS status:**
   - Site configuration → Domain management
   - Domain should show: "Netlify DNS" or "External DNS"
3. **Verify SSL certificate:**
   - Netlify automatically provisions SSL certificate via Let's Encrypt
   - Status will change from "Pending" to "Active"
   - Usually takes 1-24 hours after DNS propagates

4. **Enable HTTPS redirect:**
   - Site configuration → Domain management → HTTPS
   - Toggle: **Force HTTPS** (ON)
   - All HTTP requests will redirect to HTTPS

---

### Step 3.4: Set Primary Domain

**In Netlify:**

1. **Domain management** → Shows all domains
2. **Choose primary domain:**
   - Option A: `jeffreyseligson.com` (non-www)
   - Option B: `www.jeffreyseligson.com` (www version)
3. **Click:** "Set as primary domain"
4. **Result:** Other domain will redirect to primary

**Recommended:** Use non-www (jeffreyseligson.com) as primary
- Shorter, cleaner URL
- Common modern practice

---

## Phase 4: Update References in Code

After domain is set up, update these files:

### File 1: `netlify/functions/contact-form.js`

**Find (around line 92):**
```javascript
'Origin': 'https://imaginative-faun-5004e0.netlify.app',
'Referer': 'https://imaginative-faun-5004e0.netlify.app/'
```

**Change to:**
```javascript
'Origin': 'https://jeffreyseligson.com',
'Referer': 'https://jeffreyseligson.com/'
```

### File 2: Update Documentation

**Files to update:**
- `README.md` - Update live site URL
- `NETLIFY_SERVICE.md` - Update site URL references
- `WEB3FORMS_SERVICE.md` - Update site URL references

**Commit and push changes:**
```bash
git add netlify/functions/contact-form.js README.md NETLIFY_SERVICE.md WEB3FORMS_SERVICE.md
git commit -m "Update URLs to custom domain"
git push origin main
```

---

## Phase 5: Testing & Verification

### Test Checklist

After migration and domain setup:

- [ ] **Site loads on custom domain** (e.g., https://jeffreyseligson.com)
- [ ] **HTTPS works** (green padlock in browser)
- [ ] **HTTP redirects to HTTPS** (try http://jeffreyseligson.com)
- [ ] **www redirects to non-www** (or vice versa, depending on primary)
- [ ] **Old Netlify URL redirects** (https://imaginative-faun-5004e0.netlify.app → custom domain)
- [ ] **Contact form works** (submit test message)
- [ ] **Email arrives** at jseligsonrealtor@gmail.com
- [ ] **All images load** correctly
- [ ] **Mobile responsive** (test on phone)
- [ ] **All navigation links work**
- [ ] **Review links work** (Google, Yelp)

### Testing Tools

**DNS Propagation:**
- https://dnschecker.org
- Enter your domain, check DNS propagation worldwide

**SSL Certificate:**
- https://www.ssllabs.com/ssltest/
- Enter your domain, verify SSL configuration

**Performance:**
- https://pagespeed.web.dev
- Check site speed and performance

---

## Troubleshooting

### Domain Not Resolving

**Problem:** Domain doesn't load, shows error

**Solutions:**
1. **Wait longer:** DNS can take up to 48 hours
2. **Check DNS propagation:** https://dnschecker.org
3. **Verify nameservers:** Ensure GoDaddy shows Netlify nameservers
4. **Clear browser cache:** Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
5. **Try incognito mode:** Rules out browser cache issues

### SSL Certificate Not Provisioning

**Problem:** Site shows "Not Secure" or SSL error

**Solutions:**
1. **Wait:** SSL can take 24 hours after DNS propagates
2. **Verify DNS:** Domain must fully propagate first
3. **Check Netlify status:** Site configuration → Domain management
4. **Renew certificate:** Domain settings → HTTPS → Renew certificate
5. **Contact Netlify support:** If still not working after 48 hours

### Contact Form Not Working

**Problem:** Form submissions fail or don't arrive

**Solutions:**
1. **Check environment variable:** `WEB3FORMS_ACCESS_KEY` must be set
2. **Verify it's a secret:** Should be marked "Contains secret values"
3. **Check function logs:** Netlify → Functions → contact-form
4. **Trigger redeploy:** Deploys → Trigger deploy
5. **Test Web3Forms:** Login to https://web3forms.com, check status

### Old Netlify URL Still Showing

**Problem:** Old URL doesn't redirect to custom domain

**Solutions:**
1. **Set primary domain:** Domain management → Set as primary domain
2. **Wait for propagation:** Can take 30-60 minutes
3. **Clear browser cache**
4. **Check Netlify settings:** Ensure custom domain is primary

---

## Rollback Plan

If migration fails or causes issues:

### Option 1: Revert to Old Netlify Account

**If site transfer was used:**
1. Contact Netlify support
2. Request transfer back to original account
3. Provide both email addresses

**If fresh deployment was used:**
1. Old site still exists on old account
2. Change GoDaddy DNS back to old Netlify site
3. Or delete new site and keep old one active

### Option 2: Keep Both Sites Running

- Old Netlify site remains active
- New site can coexist during testing
- Switch DNS between them as needed
- No data loss

---

## Post-Migration Cleanup

After successful migration:

### Optional: Delete Old Netlify Site

**Only do this after:**
- Custom domain working perfectly
- Contact form tested
- All functionality verified
- At least 1 week of stability

**Steps:**
1. Login to old Netlify account
2. Site settings → General → Delete site
3. Type site name to confirm
4. Click: Delete

### Update Google/Yelp Links (If Needed)

If you used custom domain in review platform links:
- Update Google Business Profile with new URL
- Update Yelp business listing URL
- Update any other business directories

---

## Timeline Summary

**Day 1:**
- Hour 1: Create new Netlify account
- Hour 1-2: Transfer site OR create fresh deployment
- Hour 2-3: Add custom domain, configure DNS in GoDaddy

**Day 1-2:**
- Wait for DNS propagation (1-48 hours, usually 2-6 hours)

**Day 2-3:**
- SSL certificate provisions automatically (1-24 hours after DNS)
- Test all functionality
- Update code references to new domain

**Day 3+:**
- Monitor for issues
- Verify contact form emails arrive
- Check analytics/traffic

**Total: 1-3 days** from start to fully functional

---

## Support Resources

**Netlify:**
- Docs: https://docs.netlify.com
- Support: https://www.netlify.com/support
- Community: https://answers.netlify.com

**GoDaddy:**
- DNS Help: https://www.godaddy.com/help/manage-dns-680
- Support: https://www.godaddy.com/contact-us

**This Project:**
- NETLIFY_SERVICE.md - Netlify configuration guide
- WEB3FORMS_SERVICE.md - Contact form setup
- README.md - General website documentation

---

## Quick Reference Commands

### Check DNS Propagation
```bash
# Check A record
dig jeffreyseligson.com

# Check CNAME
dig www.jeffreyseligson.com

# Check nameservers
dig NS jeffreyseligson.com
```

### Test Contact Form Locally
```bash
# Start local server
python3 -m http.server 8000

# Visit: http://localhost:8000
# Test contact form before deploying
```

### Deploy Code Updates
```bash
git add .
git commit -m "Update to custom domain"
git push origin main
# Netlify auto-deploys in ~30 seconds
```

---

## Questions to Answer Before Starting

1. **What custom domain will you use?**
   - Example: jeffreyseligson.com
   - Must own domain at GoDaddy

2. **Who will own the new Netlify account?**
   - Email address: jseligsonrealtor@gmail.com (or other)

3. **Do you have GoDaddy login credentials?**
   - Username/password to access domain settings

4. **Do you want www or non-www as primary?**
   - Recommended: non-www (jeffreyseligson.com)

5. **When do you want to migrate?**
   - Plan for 1-3 days for full completion
   - Avoid migrating right before important events

---

**Ready to begin? Start with Phase 1: Create New Netlify Account**
