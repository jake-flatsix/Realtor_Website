/**
 * Netlify Serverless Function: Get BAREIS MLS Listings
 *
 * This function securely proxies requests to the BAREIS MLS API
 * Credentials are stored as environment variables in Netlify dashboard
 *
 * Environment Variables Required:
 * - BAREIS_USERNAME: Your BAREIS MLS username
 * - BAREIS_PASSWORD: Your BAREIS MLS password
 * - BAREIS_API_ENDPOINT: BAREIS API endpoint URL
 */

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get credentials from environment variables (set in Netlify dashboard)
  const {
    BAREIS_USERNAME,
    BAREIS_PASSWORD,
    BAREIS_API_ENDPOINT
  } = process.env;

  // Verify credentials are configured
  if (!BAREIS_USERNAME || !BAREIS_PASSWORD || !BAREIS_API_ENDPOINT) {
    console.error('Missing BAREIS credentials in environment variables');
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Server configuration error',
        message: 'BAREIS credentials not configured'
      })
    };
  }

  try {
    // Parse query parameters
    const queryParams = event.queryStringParameters || {};
    const {
      status = 'Active',  // Active, Sold, Pending
      limit = '50',
      offset = '0'
    } = queryParams;

    console.log(`Fetching listings: status=${status}, limit=${limit}, offset=${offset}`);

    // Make request to BAREIS API
    // Note: You'll need to adjust this based on actual BAREIS API specs
    const apiUrl = new URL(BAREIS_API_ENDPOINT);
    apiUrl.searchParams.append('status', status);
    apiUrl.searchParams.append('limit', limit);
    apiUrl.searchParams.append('offset', offset);

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${BAREIS_USERNAME}:${BAREIS_PASSWORD}`).toString('base64')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`BAREIS API error: ${response.status} ${response.statusText}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: 'BAREIS API error',
          message: `API returned ${response.status}`
        })
      };
    }

    const data = await response.json();

    // Return successful response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      },
      body: JSON.stringify({
        success: true,
        listings: data,
        count: data.length || 0
      })
    };

  } catch (error) {
    console.error('Error fetching BAREIS listings:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch listings',
        message: error.message
      })
    };
  }
};

/**
 * TODO: Update this function based on actual BAREIS API documentation
 *
 * Common API patterns to check:
 * 1. Authentication method (Basic Auth, API Key, OAuth)
 * 2. Endpoint structure (/listings, /properties, etc.)
 * 3. Query parameters (agent_id, status, location, etc.)
 * 4. Response format (JSON structure)
 * 5. Rate limiting considerations
 *
 * You may need to:
 * - Add agent ID to filter listings
 * - Adjust authentication method
 * - Add pagination handling
 * - Transform response data to match your frontend needs
 */
