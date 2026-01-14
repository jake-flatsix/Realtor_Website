/**
 * Jeffrey Seligson Realtor Website
 * BAREIS MLS / IDX Integration Placeholder
 *
 * This file is prepared for future integration with BAREIS MLS
 * listing data via an approved IDX vendor or direct API access.
 *
 * Integration Options:
 * 1. IDX Broker (https://idxbroker.com/mls/bay-area-real-estate-info-services-bareis)
 * 2. Direct BAREIS API (requires approval)
 * 3. RETS/Web API feed from approved vendor
 *
 * Requirements before activation:
 * - BAREIS IDX access approval
 * - API credentials from approved vendor
 * - Compliance review completed
 *
 * Contact BAREIS: 707-575-8000 or visit https://bareis.com/my-bareis/idx-and-website.html
 */

// ==========================================
// IDX Configuration (to be filled in)
// ==========================================
const IDX_CONFIG = {
    enabled: false,  // Set to true when IDX is configured
    provider: '',    // e.g., 'IDX Broker', 'SimplyRETS', etc.
    apiKey: '',      // Your API key
    agentId: '',     // Your agent/realtor ID
    endpoint: ''     // API endpoint URL
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
// Fetch Listings from MLS
// ==========================================
async function fetchListings() {
    /**
     * This function will fetch listing data from BAREIS MLS
     * via your chosen IDX provider's API
     *
     * Example implementation structure:
     */

    try {
        // Example API call structure (update with actual endpoint)
        // const response = await fetch(`${IDX_CONFIG.endpoint}/listings`, {
        //     headers: {
        //         'Authorization': `Bearer ${IDX_CONFIG.apiKey}`,
        //         'Content-Type': 'application/json'
        //     }
        // });

        // const data = await response.json();
        // const listings = data.listings || [];

        // Process and display listings
        // displayCurrentListings(listings.filter(l => l.status === 'Active'));
        // displayPastSales(listings.filter(l => l.status === 'Sold'));

        console.log('Listings fetched successfully');
    } catch (error) {
        console.error('Error fetching listings:', error);
        displayError('Unable to load listings. Please try again later.');
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
