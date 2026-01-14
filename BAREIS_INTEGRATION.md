# BAREIS MLS Integration Guide

This document explains how to enable BAREIS MLS listings on your website once you obtain API access.

## Current Status

✅ **Infrastructure Ready**: Netlify serverless functions are configured and deployed
⏸️ **Waiting for API Access**: Need BAREIS API endpoint and credentials

## Prerequisites

Before you can display live MLS listings, you need:

1. **IDX Access from BAREIS**
   - Contact: (707) 575-8000
   - Website: https://bareis.com/my-bareis/idx-and-website.html
   - Ask about: "IDX access for my personal realtor website"

2. **API Credentials**
   - API endpoint URL
   - Authentication method (may differ from website login)
   - Any additional API keys or tokens

## Step-by-Step Integration Process

### Step 1: Contact BAREIS for IDX Access

**Email or call BAREIS and ask:**
- "I want to display MLS listings on my website - how do I get IDX access?"
- "What is the API endpoint URL for retrieving listings?"
- "Do I use my existing username/password or are there separate API credentials?"
- "Is there API documentation available?"

**Possible outcomes:**

**Option A: Direct API Access (Ideal)**
- They provide you with an API endpoint URL
- You can use the Netlify serverless function setup (already complete!)
- Free integration

**Option B: Approved Vendor Required**
- BAREIS requires using an approved IDX vendor (IDX Broker, etc.)
- Typically costs $40-60/month
- We'd integrate their widget/iframe instead

### Step 2: Add Environment Variables (If Direct API Access)

Once you have the API details from BAREIS:

1. **Go to Netlify Dashboard**
   - Login: https://app.netlify.com
   - Select your "Realtor_Website" site
   - Go to: **Site configuration** → **Environment variables**

2. **Add These Variables** (click "Add a variable" for each):

   **Variable 1:**
   - Key: `BAREIS_USERNAME`
   - Value: [Your BAREIS API username]
   - Scopes: All (default)

   **Variable 2:**
   - Key: `BAREIS_PASSWORD`
   - Value: [Your BAREIS API password]
   - Scopes: All (default)

   **Variable 3:**
   - Key: `BAREIS_API_ENDPOINT`
   - Value: [BAREIS API URL - e.g., https://api.bareis.com/v1/listings]
   - Scopes: All (default)

3. **Save** all variables

### Step 3: Enable IDX Integration

1. **Edit the file:** `js/idx-integration.js`

2. **Find this line** (near the top):
   ```javascript
   enabled: false,  // Set to true when Netlify environment variables are configured
   ```

3. **Change to:**
   ```javascript
   enabled: true,  // BAREIS credentials configured in Netlify
   ```

4. **Save the file**

### Step 4: Deploy Changes

```bash
git add js/idx-integration.js
git commit -m "Enable BAREIS IDX integration"
git push origin main
```

Netlify will automatically deploy in ~30 seconds.

### Step 5: Test the Integration

1. **Visit your Netlify site:** https://imaginative-faun-5004e0.netlify.app
2. **Open browser console** (F12 or right-click → Inspect → Console)
3. **Refresh the page**
4. **Look for messages:**
   - ✅ "Fetching listings from BAREIS MLS..."
   - ✅ "Loaded X active listings"
   - ❌ If errors appear, check Netlify function logs

### Step 6: Verify Listings Display

**On the site:**
- **Current Listings section** should show active properties
- **Past Sales section** should show sold properties
- Each card should display:
  - Property photo
  - Address
  - Price
  - Bedrooms/Bathrooms/Sqft
  - Status badge (ACTIVE/SOLD)

## Troubleshooting

### Problem: "Unable to load listings" error

**Check Netlify Function Logs:**
1. Go to Netlify Dashboard
2. Click your site → **Functions** tab
3. Click **get-listings** function
4. View logs for error messages

**Common issues:**
- Wrong API endpoint URL
- Incorrect credentials
- BAREIS API requires different authentication
- API rate limiting

### Problem: Listings show but no images

**Solution:** Check if BAREIS API returns image URLs in the response. You may need to adjust the `createListingCard()` function in `js/idx-integration.js` to match the actual API response format.

### Problem: Authentication fails

**Verify:**
- Environment variables are spelled correctly (case-sensitive!)
- Credentials are correct
- API endpoint URL is complete (include https://)
- BAREIS account has API access enabled

## Updating the Serverless Function

If BAREIS uses a different API format than expected, you may need to update:

**File:** `netlify/functions/get-listings.js`

**You might need to adjust:**
- Authentication method (currently uses Basic Auth)
- Request headers
- Query parameters
- Response parsing

**After editing:**
```bash
git add netlify/functions/get-listings.js
git commit -m "Update BAREIS API integration"
git push origin main
```

## Alternative: IDX Vendor Integration

If BAREIS requires using an approved vendor (like IDX Broker):

### IDX Broker Setup

1. **Sign up:** https://idxbroker.com
2. **Connect to BAREIS MLS**
3. **Get embed code** for listings widget
4. **Add to website:**
   - Edit `index.html`
   - Replace placeholder in listings section with IDX Broker embed code
   - Commit and push

**Benefits:**
- BAREIS-compliant (pre-approved)
- Automatic MLS updates
- Professional widgets

**Downside:**
- Costs ~$40-60/month
- Less design control

## Testing Without Live API

To test the listing display without real API data:

1. **Edit:** `netlify/functions/get-listings.js`
2. **Add mock data** at the top of `exports.handler`:
   ```javascript
   // Temporary mock data for testing
   return {
     statusCode: 200,
     body: JSON.stringify({
       success: true,
       listings: [
         {
           mlsId: 'TEST123',
           address: '123 Main St, Sebastopol',
           price: 750000,
           bedrooms: 3,
           bathrooms: 2,
           sqft: 1800,
           photos: ['https://via.placeholder.com/400x300'],
           description: 'Beautiful rural property'
         }
       ],
       count: 1
     })
   };
   ```
3. Set `enabled: true` in `idx-integration.js`
4. Deploy and test

**Remember to remove mock data** when you add real API integration!

## Contact Information

**BAREIS MLS:**
- Phone: (707) 575-8000
- Website: https://bareis.com
- IDX Info: https://bareis.com/my-bareis/idx-and-website.html

**Netlify Site:**
- Dashboard: https://app.netlify.com
- Site URL: https://imaginative-faun-5004e0.netlify.app
- Functions URL: https://imaginative-faun-5004e0.netlify.app/.netlify/functions/get-listings

**GitHub Repository:**
- https://github.com/jake-flatsix/Realtor_Website

## Summary

Your site is **ready for BAREIS integration** - all the infrastructure is in place. Once you get API access from BAREIS, it's just:

1. Add 3 environment variables in Netlify
2. Change one line (`enabled: false` → `enabled: true`)
3. Push to GitHub
4. Done! ✅

The serverless function handles all authentication securely, so your credentials are never exposed in the browser.
