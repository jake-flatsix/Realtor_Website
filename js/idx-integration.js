/**
 * Jeffrey Seligson Realtor Website
 * BAREIS MLS / IDX Integration via Netlify Serverless Functions
 *
 * This file connects to BAREIS MLS through a secure Netlify serverless function
 * Credentials are stored securely in Netlify environment variables
 *
 * Setup Instructions:
 * 1. Set environment variables in Netlify dashboard:
 *    - BAREIS_USERNAME
 *    - BAREIS_PASSWORD
 *    - BAREIS_API_ENDPOINT
 * 2. Set IDX_CONFIG.enabled = true
 * 3. Update agentId if needed to filter listings
 *
 * Contact BAREIS: 707-575-8000 or visit https://bareis.com/my-bareis/idx-and-website.html
 */

// ==========================================
// IDX Configuration
// ==========================================
const IDX_CONFIG = {
    enabled: false,  // Set to true when Netlify environment variables are configured
    agentId: '',     // Jeffrey's agent ID (if needed for filtering)
    // Credentials are stored in Netlify environment variables, not here!
    functionEndpoint: '/.netlify/functions/get-listings'
};

// ==========================================
// IDX Initialization
// ==========================================
function initializeIDX() {
    if (!IDX_CONFIG.enabled) {
        console.log('%c📋 IDX Integration Not Yet Configured', 'color: #8b6f47; font-weight: bold;');
        console.log('To enable BAREIS MLS listings:');
        console.log('1. Apply for BAREIS IDX access at https://bareis.com');
        console.log('2. Choose an approved vendor (e.g., IDX Broker)');
        console.log('3. Update IDX_CONFIG in js/idx-integration.js');
        console.log('4. Implement fetchListings() function below');
        return;
    }

    // When IDX is enabled, initialize the integration
    console.log('Initializing IDX integration...');
    fetchListings();
}

// ==========================================
// Fetch Listings from MLS via Netlify Function
// ==========================================
async function fetchListings() {
    /**
     * Calls the Netlify serverless function which securely
     * connects to BAREIS API with credentials from environment variables
     */

    try {
        console.log('Fetching listings from BAREIS MLS...');

        // Fetch active listings
        const activeResponse = await fetch(`${IDX_CONFIG.functionEndpoint}?status=Active&limit=50`);

        if (!activeResponse.ok) {
            throw new Error(`HTTP error! status: ${activeResponse.status}`);
        }

        const activeData = await activeResponse.json();

        if (activeData.success && activeData.listings) {
            displayCurrentListings(activeData.listings);
            console.log(`✅ Loaded ${activeData.count} active listings`);
        }

        // Fetch sold listings for past sales section
        const soldResponse = await fetch(`${IDX_CONFIG.functionEndpoint}?status=Sold&limit=20`);

        if (soldResponse.ok) {
            const soldData = await soldResponse.json();
            if (soldData.success && soldData.listings) {
                displayPastSales(soldData.listings);
                console.log(`✅ Loaded ${soldData.count} sold listings`);
            }
        }

    } catch (error) {
        console.error('Error fetching listings:', error);
        displayError('Unable to load listings from BAREIS MLS. Please try again later.');
    }
}

// ==========================================
// Display Current Listings
// ==========================================
function displayCurrentListings(listings) {
    /**
     * Inject active listings into the #current-listings grid
     *
     * @param {Array} listings - Array of listing objects from MLS
     */

    const listingsContainer = document.getElementById('current-listings');

    if (!listingsContainer || !listings || listings.length === 0) {
        return;
    }

    // Clear placeholder
    listingsContainer.innerHTML = '';

    // Create listing cards
    listings.forEach(listing => {
        const card = createListingCard(listing, 'active');
        listingsContainer.appendChild(card);
    });
}

// ==========================================
// Display Past Sales
// ==========================================
function displayPastSales(sales) {
    /**
     * Inject sold listings into the #past-sales grid
     *
     * @param {Array} sales - Array of sold listing objects
     */

    const salesContainer = document.getElementById('past-sales');

    if (!salesContainer || !sales || sales.length === 0) {
        return;
    }

    // Create up to 6 sold property cards
    const recentSales = sales.slice(0, 6);

    recentSales.forEach(sale => {
        const card = createListingCard(sale, 'sold');
        salesContainer.appendChild(card);
    });
}

// ==========================================
// Create Listing Card Element
// ==========================================
function createListingCard(listing, type) {
    /**
     * Create a property card DOM element
     *
     * @param {Object} listing - Listing data object
     * @param {String} type - 'active' or 'sold'
     * @returns {HTMLElement} - Listing card element
     */

    const card = document.createElement('div');
    card.className = 'listing-card';
    card.setAttribute('data-mls-id', listing.mlsId || '');
    card.setAttribute('data-listing-type', type);

    // Example structure - adjust based on actual MLS data format
    card.innerHTML = `
        <div class="listing-badge ${type === 'sold' ? 'sold-badge' : 'active-badge'}">${type.toUpperCase()}</div>
        <div class="listing-image">
            <img src="${listing.photos?.[0] || 'images/placeholder.jpg'}"
                 alt="${listing.address || 'Property'}"
                 loading="lazy">
        </div>
        <div class="listing-details">
            <h4 class="listing-address">${listing.address || 'Address not available'}</h4>
            <p class="listing-price">${formatPrice(listing.price)}</p>
            <p class="listing-features">
                ${listing.bedrooms || 0} bed •
                ${listing.bathrooms || 0} bath •
                ${listing.sqft ? listing.sqft.toLocaleString() + ' sqft' : 'N/A'}
            </p>
            ${listing.description ? `<p class="listing-description">${truncate(listing.description, 100)}</p>` : ''}
        </div>
    `;

    return card;
}

// ==========================================
// Utility Functions
// ==========================================

/**
 * Format price with currency
 */
function formatPrice(price) {
    if (!price) return 'Price upon request';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(price);
}

/**
 * Truncate text to specified length
 */
function truncate(text, length) {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
}

/**
 * Display error message
 */
function displayError(message) {
    const listingsContainer = document.getElementById('current-listings');
    if (listingsContainer) {
        listingsContainer.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
            </div>
        `;
    }
}

// ==========================================
// Auto-refresh Listings (optional)
// ==========================================
function setupAutoRefresh(intervalMinutes = 15) {
    /**
     * Automatically refresh listings every X minutes
     * to keep data current without page reload
     */

    if (!IDX_CONFIG.enabled) return;

    setInterval(() => {
        console.log('Auto-refreshing listings...');
        fetchListings();
    }, intervalMinutes * 60 * 1000);
}

// ==========================================
// Initialize on Page Load
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeIDX();

    // If IDX is enabled, set up auto-refresh
    if (IDX_CONFIG.enabled) {
        setupAutoRefresh(15); // Refresh every 15 minutes
    }
});

// ==========================================
// Export for Testing (optional)
// ==========================================
// Uncomment if you need to test functions in console
// window.IDX = {
//     config: IDX_CONFIG,
//     fetch: fetchListings,
//     displayCurrentListings,
//     displayPastSales
// };
