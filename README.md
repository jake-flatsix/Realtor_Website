# Jeffrey Seligson - Realtor Website

A modern, responsive website for Jeffrey Seligson, a Sonoma County realtor specializing in green construction, rural properties, and well/septic systems.

## 🌟 Features

- **Clean, Modern Design**: Earth-tone color palette emphasizing sustainability
- **Fully Responsive**: Mobile-first design optimized for all devices
- **IDX-Ready**: Structure prepared for BAREIS MLS integration
- **Fast & Lightweight**: Pure HTML/CSS/JavaScript with no framework dependencies
- **Accessibility**: WCAG AA compliant with semantic HTML
- **GitHub Pages Hosting**: Free, reliable hosting directly from this repository

## 🎨 Design Philosophy

The website reflects Jeffrey's expertise in:
- 🌱 **Green Building** - EcoBroker certified
- 🏡 **Rural Properties** - Deep knowledge of Sonoma County's West County
- 💧 **Well & Septic Systems** - Specialized technical expertise
- 🗺️ **Local Knowledge** - 24+ years in Sebastopol

## 📁 Project Structure

```
Realtor_Website/
├── index.html              # Main website file
├── css/
│   └── styles.css         # Earth tone responsive styles
├── js/
│   ├── main.js            # Navigation and interactions
│   └── idx-integration.js # BAREIS MLS integration placeholder
├── images/
│   ├── jeffrey-headshot.jpg
│   ├── background-landscape.jpg
│   └── horizontal-logo.png
├── assets/                # Excluded from git (old website files)
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/jake-flatsix/Realtor_Website.git
   cd Realtor_Website
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html  # macOS
   # or just double-click index.html
   ```

3. Make changes to HTML, CSS, or JS files and refresh to see updates

### Deployment

The site is automatically deployed via GitHub Pages.

**Live URL**: `https://jake-flatsix.github.io/Realtor_Website/`

To update the live site:
```bash
git add .
git commit -m "Update website"
git push origin main
```

Changes will be live within 1-2 minutes.

## 🎯 Key Sections

### 1. Hero Section
- Full-screen background image
- Jeffrey's name and tagline
- Call-to-action button

### 2. About Section
- Professional biography
- Credentials and awards
- Expertise badges
- Professional headshot

### 3. Listings Section
- **Current Listings**: Placeholder for active properties (IDX-ready)
- **Past Sales**: Showcase of sold properties
- Responsive grid layout

### 4. Contact Section
- Email and phone contact information
- Form structure prepared for email service integration
- DRE license display

## 📧 Future Enhancements

### Phase 1: Email Service Integration (Next Step)

Add working contact form using:
- **Formspree** (easiest): https://formspree.io
- **EmailJS** (free tier): https://www.emailjs.com
- **Netlify Forms** (if moved to Netlify)

**Implementation**:
1. Sign up for service
2. Get form endpoint or API key
3. Update `index.html` form action or `main.js` handler
4. Unhide form fields (remove `style="display: none;"`)
5. Test submissions

### Phase 2: BAREIS MLS / IDX Integration

**Steps to enable live property listings:**

1. **Apply for BAREIS IDX Access**
   - Contact: (707) 575-8000
   - Website: https://bareis.com/my-bareis/idx-and-website.html
   - Complete IDX forms and compliance review

2. **Choose an Approved Vendor**
   - **IDX Broker** (recommended): https://idxbroker.com
   - **SimplyRETS**: https://simplyrets.com
   - **Other BAREIS-approved vendors**: Check BAREIS website

3. **Configure Integration**
   - Get API credentials from vendor
   - Update `js/idx-integration.js`:
     ```javascript
     const IDX_CONFIG = {
         enabled: true,
         provider: 'IDX Broker',
         apiKey: 'your-api-key-here',
         agentId: 'your-agent-id',
         endpoint: 'https://api.idxbroker.com/...'
     };
     ```

4. **Test Listings**
   - Implement `fetchListings()` function per vendor API docs
   - Test with staging data first
   - Verify listing display on all device sizes

5. **Go Live**
   - Submit site for BAREIS compliance review
   - Once approved, enable production API
   - Monitor for issues

### Phase 3: Additional Features (Optional)

- **Testimonials Section**: Client reviews and success stories
- **Blog**: Real estate tips and local market insights
- **Property Search**: Advanced filtering for listings
- **Mortgage Calculator**: Help buyers estimate payments
- **Virtual Tours**: 3D walkthrough integration (Matterport)
- **Market Statistics**: Sonoma County housing data visualization

## 🎨 Color Palette

```css
/* Earth Tones */
--forest-green: #2d5016    /* Primary color */
--sage-green: #9caf88      /* Accents */
--warm-brown: #8b6f47      /* Buttons & highlights */
--dark-olive: #4a5d23      /* Hover states */
--light-sage: #c8d5b9      /* Backgrounds */
--cream: #f5f1e8          /* Page background */
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px (1 column)
- **Tablet**: 768px - 1023px (2 columns)
- **Desktop**: 1024px+ (3 columns)

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Custom Properties
- **JavaScript (ES6+)**: Modern vanilla JS
- **GitHub Pages**: Static site hosting

## 📄 License & Contact

**Realtor**: Jeffrey Seligson
**DRE License**: #01338922
**Email**: jeff@jeffreyseligsonrealtor.com
**Phone**: (707) 824-6333

**Website Development**: 2026

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths in `index.html` and `css/styles.css`
- Ensure images are in `/images/` folder
- Verify file names match (case-sensitive)

### GitHub Pages Not Updating
- Wait 2-3 minutes after pushing changes
- Check GitHub repository Settings → Pages → Source is set to `main` branch
- Clear browser cache (Cmd+Shift+R on Mac)

### Mobile Menu Not Working
- Check console for JavaScript errors
- Verify `main.js` is loaded in `index.html`
- Test in different browsers

### IDX Integration Issues
- Verify BAREIS approval is complete
- Check API credentials in `idx-integration.js`
- Review vendor API documentation
- Test API calls in browser console
- Contact vendor support

## 📞 Support

For website issues or updates, contact the site administrator.

For real estate inquiries, contact Jeffrey Seligson directly.

---

**Built with care for Sonoma County's West County community**
