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

    // Prepare the data for Web3Forms
    const web3formsData = {
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        message: formData.message,
        subject: 'New Contact Form Submission from Realtor Website',
        from_name: 'Jeffrey Seligson Website'
    };

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

    // Submit to Web3Forms
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(web3formsData)
        });

        const result = await response.json();

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
