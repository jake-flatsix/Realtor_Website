/**
 * Netlify Serverless Function - Contact Form Submission
 *
 * This function acts as a secure proxy between the contact form and Web3Forms.
 * The Web3Forms access key is stored in Netlify environment variables,
 * never exposed in client-side code.
 *
 * Setup:
 * 1. Get your Web3Forms access key from https://web3forms.com
 * 2. Add to Netlify: Site Settings → Environment Variables
 *    Variable: WEB3FORMS_ACCESS_KEY
 *    Value: your-access-key-here
 */

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({
                success: false,
                message: 'Method Not Allowed'
            })
        };
    }

    // Parse the form data
    let formData;
    try {
        formData = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                success: false,
                message: 'Invalid request body'
            })
        };
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                success: false,
                message: 'Name, email, and message are required'
            })
        };
    }

    // Get access key from environment variables
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
        console.error('WEB3FORMS_ACCESS_KEY not configured in environment variables');
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Contact form not configured. Please try again later.'
            })
        };
    }

    // Log that we have the key (without exposing it)
    console.log('Access key found, length:', accessKey.length);
    console.log('Access key format check:', accessKey.includes('-') ? 'UUID format' : 'other format');

    // Collect interests from checkboxes
    const interests = [];
    if (formData.interest_buying === 'yes') interests.push('Buying in Sonoma County');
    if (formData.interest_selling === 'yes') interests.push('Selling property');
    if (formData.interest_green === 'yes') interests.push('Green building / Sustainable properties');
    if (formData.interest_rural === 'yes') interests.push('Rural properties with well/septic');

    // Build enhanced message with interests
    let enhancedMessage = formData.message;
    if (interests.length > 0) {
        enhancedMessage += '\n\n--- Interests ---\n' + interests.map(i => '• ' + i).join('\n');
    }

    // Prepare the data for Web3Forms
    const web3formsData = {
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        message: enhancedMessage,
        subject: 'New Contact Form Submission from Realtor Website',
        from_name: 'Jeffrey Seligson Website'
    };

    // Log payload structure (without sensitive data)
    console.log('Sending to Web3Forms with fields:', Object.keys(web3formsData));
    console.log('Interests selected:', interests.length > 0 ? interests : 'None');

    // Basic spam protection - check for honeypot
    if (formData.botcheck) {
        console.log('Spam detected via honeypot');
        // Return success to fool the bot, but don't actually send
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Form submitted successfully'
            })
        };
    }

    // Submit to Web3Forms using FormData (works better with Cloudflare)
    try {
        // Convert to FormData format
        const formBody = Object.keys(web3formsData)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(web3formsData[key]))
            .join('&');

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (compatible; Netlify-Function/1.0)',
                'Origin': 'https://imaginative-faun-5004e0.netlify.app',
                'Referer': 'https://imaginative-faun-5004e0.netlify.app/'
            },
            body: formBody
        });

        // Log response for debugging
        console.log('Web3Forms response status:', response.status);

        // Check if response is JSON before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Web3Forms returned non-JSON response:', text.substring(0, 200));
            throw new Error('Web3Forms API returned invalid response');
        }

        const result = await response.json();
        console.log('Web3Forms result:', result);

        if (result.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'Message sent successfully!'
                })
            };
        } else {
            console.error('Web3Forms error:', result);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    success: false,
                    message: result.message || 'Failed to send message'
                })
            };
        }

    } catch (error) {
        console.error('Error submitting to Web3Forms:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Server error. Please try again later.'
            })
        };
    }
};
