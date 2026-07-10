# Al Baraka Diyar - Industrial Project Support Website

A modern, responsive website for **Al Baraka Diyar Project Support FZE LLC** — UAE's trusted industrial project support partner. Features equipment rental, heavy transport, manpower supply, porta cabins, and material trading across UAE, Qatar, and KSA.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** (v14 or higher) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation & Running

```bash
# 1. Navigate to project folder
cd "D:\antigravty skills\al barakah"

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The website will be live at: **http://localhost:3000**

---

## ☁️ Deployment to Domain / Hosting

### Option A: Traditional Web Hosting (cPanel, Plesk, etc.)

1. **Upload Files**
   - Upload ALL files and folders to your domain's `public_html` (or `htdocs`) directory:
     ```
     ├── index.html
     ├── about.html
     ├── services.html
     ├── projects.html
     ├── support.html
     ├── contact.html
     ├── style.css
     ├── mobile.css
     ├── about.css
     ├── services.css
     ├── projects.css
     ├── support.css
     ├── contact.css
     ├── script.js
     ├── home.js
     ├── about.js
     ├── services.js
     ├── projects.js
     ├── support.js
     ├── contact.js
     ├── assets/          (entire folder with images)
     ├── server.js        (Node.js server - NOT needed on traditional hosting)
     ├── package.json     (NOT needed on traditional hosting)
     └── inquiries.log    (will be created automatically)
     ```

2. **No Server.js on Shared Hosting**
   - Traditional hosting (cPanel) uses Apache/Nginx — **delete or ignore** `server.js` and `package.json`
   - The site is static HTML/CSS/JS — just upload the files and it works

3. **Set Domain Root**
   - Ensure your domain points to the folder where `index.html` is located

---

### Option B: VPS / Cloud Server (Ubuntu, DigitalOcean, AWS, etc.)

#### 1. Server Setup (Ubuntu/Debian)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js & npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x or higher
npm --version
```

#### 2. Deploy Your Website

```bash
# Create app directory
sudo mkdir -p /var/www/albaraka
cd /var/www/albaraka

# Upload your files (via SFTP, SCP, or git clone)
# Example using SCP from your local machine:
scp -r "D:\antigravty skills\al barakah\*" user@your-server-ip:/var/www/albaraka/

# Or use git:
# git clone <your-repo-url> .
```

#### 3. Install Dependencies & Configure

```bash
# Install npm packages
sudo npm install

# Create environment file
sudo nano .env
```

#### 4. **EDIT `.env` File** (Important!)

Create `.env` in `/var/www/albaraka/` with your actual email settings:

```env
# Server
PORT=3000

# Email Configuration (for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password  # Use App Password for Gmail
EMAIL_SERVICE=gmail
CONTACT_RECEIVER=info.ab@albarakahuae.com

# Optional: Nodemailer SMTP settings (if not using Gmail)
# EMAIL_SERVICE=smtp
# EMAIL_HOST=smtp.your-provider.com
# EMAIL_PORT=587
# EMAIL_SECURE=false
```

**⚠️ Gmail Setup:**
- Enable 2-Factor Authentication
- Generate an **App Password** (not your regular password)
- Use that app password in `EMAIL_PASS`

#### 5. Configure PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the app
cd /var/www/albaraka
pm2 start server.js --name "albaraka-website"

# Save PM2 config to auto-start on reboot
pm2 startup
pm2 save
```

#### 6. Configure Nginx as Reverse Proxy

```bash
# Install Nginx
sudo apt install -y nginx

# Create site config
sudo nano /etc/nginx/sites-available/albaraka
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Root directory (where index.html is)
    root /var/www/albaraka;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # API proxy to Node.js
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Main site
    location / {
        try_files $uri $uri/ =404;
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
    }
}
```

Enable the site:

```bash
# Link to sites-enabled
sudo ln -s /etc/nginx/sites-available/albaraka /etc/nginx/sites-enabled/

# Remove default site (if needed)
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### 7. SSL Certificate (HTTPS)

```bash
# Install Certbot for Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is automatically set up
```

---

## 📁 File Structure & What to Edit

```
project-root/
│
├── 📄 index.html              ← **HOME PAGE** - Main landing page
│   ├── Hero section (lines 164-199)
│   ├── About section (lines 203-236)
│   ├── Why Choose Us (lines 238-297) - Cards with images
│   ├── Services (lines 299-340)
│   ├── Heavy Equipment (lines 342-440) - Image sources
│   ├── Partners/Clients (lines 654-680) - Logo wall (text only currently)
│   └── Contact form (lines 682-750)
│
├── 📄 about.html              ← **CORPORATE PROFILE** - About us page
│   ├── Hero (lines 34-43)
│   ├── Who We Are (lines 45-111)
│   ├── Vision/Mission (lines 113-133)
│   ├── Core Values (lines 135-160)
│   └── Stats (lines 162-216)
│
├── 📄 services.html           ← **SERVICES** - All services list
│   ├── Hero (lines 34-43)
│   ├── Service Cards (lines 73-115)
│   └── Process Steps (lines 120-160)
│
├── 📄 projects.html           ← **PROJECTS** - Portfolio/grid
│   ├── Hero (lines 34-43)
│   ├── Stats Banner (lines 45-54)
│   └── Project Grid (lines 56-180)
│
├── 📄 support.html            ← **SUPPORT** - Project support details
│   ├── Hero (lines 34-43)
│   ├── Manpower (lines 45-69)
│   └── Support Cards (lines 71-160)
│
├── 📄 contact.html            ← **CONTACT** - Form & map
│   ├── Hero (lines 34-43)
│   ├── Contact Form (lines 104-163)
│   └── Map embed (lines 73-101)
│
├── 🎨 style.css               ← **MAIN STYLES** - All global styles
│   ├── CSS Variables (lines 12-28) - Colors, fonts
│   ├── Preloader (lines 58-88)
│   ├── Navigation (lines 178-275)
│   ├── Cards (.premium-card, .glass-card) - Hover effects
│   └── Partners logo wall (lines 758-797)
│
├── 🎨 mobile.css              ← **RESPONSIVE** - Tablet/mobile styles
│   └── Media queries for all pages
│
├── 📄 about.css               ← Corporate page specific styles
├── 📄 services.css            ← Services page specific styles
├── 📄 support.css             ← Support page specific styles
├── 📄 contact.css             ← Contact page specific styles
├── 📄 projects.css            ← Projects page specific styles
│
├── 📄 script.js               ← **MAIN JAVASCRIPT** - All interactive features
│   ├── Preloader logic (lines 3-18)
│   ├── Custom cursor (lines 20-67)
│   ├── Navbar scroll (lines 69-84)
│   ├── Intersection Observer (lines 86-132)
│   ├── Smooth scroll (lines 134-139)
│   ├── Form validation (lines 141-170)
│   ├── Contact form submit (lines 172-230)
│   └── Mobile menu toggle (lines 256-280)
│
├── 📄 server.js               ← **NODE SERVER** - API & file serving
│   └── Contact form API endpoint (lines 28-103)
│
├── 📄 package.json            ← Node dependencies
│   └── Scripts: "start": "node server.js"
│
├── 📝 .env                    ← **CREATE THIS** - Environment variables (see below)
├── 📝 .env.example            ← Example environment file
├── 📝 inquiries.log           ← Auto-created when contact form submits
│
└── 📁 assets/
    └── 📁 images/
        ├── logo_final.png     ← **COMPANY LOGO** - Replace with your logo
        ├── hero.png           ← Homepage hero background
        ├── team.png           ← About page image
        ├── safety.png         ← Core values icon
        ├── materials.png      ← Services image
        ├── transport.png      ← Heavy equipment image
        ├── excavator.png      ← Equipment image
        ├── bulldozer.png      ← Equipment image
        ├── wheel loader.jpg   ← Equipment image
        ├── backhoe loader.png ← Equipment image
        ├── porta_cabin.jpg    ← Image
        ├── generator.png      ← Image
        ├── safety.jpg         ← Image
        ├── value.jpg          ← Image
        └── ... (other images)
```

---

## 🔧 Configuration Files to Edit

### 1. **`index.html`** — Main Content Edits

**Location of key sections:**

| Section | Lines | What to Edit |
|---------|-------|-------------|
| **Page Title** | 6 | `<title>` tag for SEO |
| **Meta Description** | 7 | `<meta name="description">` |
| **Hero Heading** | 173 | `<h1>` main headline |
| **Hero Paragraph** | 174-176 | Introduction text |
| **Counter Numbers** | 187, 191, 195 | `data-target` values (projects, clients, fleet) |
| **About Section** | 216-221 | "About the Corporate" text |
| **Vision/Mission** | 224-231 | Vision & Mission cards |
| **Why Choose Us** | 247-295 | 6 feature cards with icons & text |
| **Services Grid** | 308-337 | 5 service cards (Equipment, Transport, etc.) |
| **Heavy Equipment** | 425-453 | Equipment images & names |
| **Partners Section** | 654-680 | **Currently text only** — see "Add Partner Logos" below |
| **Contact Info** | 690-720 | Address, email, phone |

---

### 2. **`about.html`** — Corporate Profile Page

| Section | Lines | What to Edit |
|---------|-------|-------------|
| **Hero Title** | 39 | `<div class="tagline">` |
| **Hero Heading** | 40 | `<h1>` |
| **Hero Paragraph** | 41 | Description |
| **Who We Are** | 50-55 | Company introduction |
| **Vision/Mission** | 112-133 | Cards content |
| **Core Values** | 135-160 | 4 value boxes (icons & text) |
| **Stats** | 162-216 | Numbers (190, 150, 500, 13) |

---

### 3. **`services.html`** — Services Page

| Section | Lines | What to Edit |
|---------|-------|-------------|
| **Hero** | 36-42 | Title & description |
| **Service Cards** | 75-115 | 5 services with icons |
| **Process Steps** | 120-160 | 4-step process |

---

### 4. **`support.html`** — Support Page

| Section | Lines | What to Edit |
|---------|-------|-------------|
| **Hero** | 35-42 | Title & description |
| **Manpower Skills** | 53-60 | Skill tags (crane operators, welders, etc.) |
| **Support Cards** | 79-160 | 3 support services (Civil, Mech-Elec, Labour) |

---

### 5. **`contact.html`** — Contact Page

| Section | Lines | What to Edit |
|---------|-------|-------------|
| **Hero** | 35-42 | Title & description |
| **Contact Form** | 104-163 | Already configured — emails go to `CONTACT_RECEIVER` |
| **Office Addresses** | 71-101 | 3 office locations (UAE, Qatar, KSA) |
| **Embedded Map** | Line 92 | `<iframe>` Google Maps embed — **UPDATE with your location** |

---

### 6. **`style.css`** — Styling & Colors

**Color Variables** (lines 12-28) — Change brand colors:

```css
:root {
    --primary: #0F243E;           /* Main navy blue */
    --primary-alt: #75B4E3;       /* Light blue accent */
    --accent-gold: #C5A059;       /* GOLD - your brand color */
    --bg-dark: #050C17;           /* Dark background */
    --text-white: #FFFFFF;        /* Light text */
    --text-dim: #94A3B8;          /* Muted text */
}
```

**To change:**
- Replace `#C5A059` with your brand gold color
- Replace `#050C17` with your preferred dark background

---

### 7. **`server.js`** — Backend API (if using Node.js hosting)

**Lines 29-103:** Contact form email configuration

**Do NOT edit** unless you need to:
- Change email provider (Gmail → Outlook/SMTP)
- Modify email subject/format
- Add database storage

---

### 8. **`.env`** — Environment Variables (CREATE THIS FILE)

**Location:** Project root (same folder as `server.js`)

**Content:**

```env
# Server Port
PORT=3000

# Email Settings (REQUIRED for contact form to work)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_SERVICE=gmail
CONTACT_RECEIVER=info.ab@albarakahuae.com  # Where form submissions go

# Optional: Use custom SMTP instead of Gmail
# EMAIL_SERVICE=smtp
# EMAIL_HOST=smtp.your-host.com
# EMAIL_PORT=587
# EMAIL_SECURE=false
```

**⚠️ Important:**
- Without this file, contact form won't send emails (but still logs to `inquiries.log`)
- On shared hosting, you may need to use the hosting provider's SMTP settings

---

## 🔄 How to Update Content

### Change Company Info
1. Open `index.html`
2. Find text by searching: `Al Baraka Diyar`
3. Replace with your company details

### Change Images
1. Go to `assets/images/` folder
2. Upload your images (PNG, JPG recommended)
3. Update `src` attributes in HTML files:
   ```html
   <img src="assets/images/your-image.png" alt="Description">
   ```

### Update Services
1. Edit `index.html` lines 308-337 (Main Services)
2. Edit `services.html` lines 75-115 (Detailed Services)

### Update Contact Details
1. Open `contact.html` lines 71-101
2. Change addresses, phones, emails
3. Update Google Maps iframe (line 92) with your location embed code

---

## 🤝 Add Partner/Client Logos (Important!)

**Currently:** Partners section (lines 654-680 in `index.html`) shows **text only** (ADNOC, EMAAR, etc.)

**To add real logos:**

1. **Upload logo images** to `assets/images/partners/` folder
   - Recommended format: PNG with transparent background
   - Size: 200x100px (max width 300px)
   - Filenames: `adnoc.png`, `emaar.png`, `nakheel.png`, etc.

2. **Edit `index.html`** lines 660-678:
   ```html
   <!-- BEFORE (text only): -->
   <span class="client-item">ADNOC</span>

   <!-- AFTER (with image): -->
   <img class="client-item" src="assets/images/partners/adnoc.png" alt="ADNOC">
   ```

3. **Edit `style.css`** line 775-786 to support images:
   ```css
   .client-item {
       font-size: 2.2rem;
       font-weight: 900;
       color: #fff;
       opacity: 0.15;
       text-transform: uppercase;
       letter-spacing: 4px;
       transition: var(--transition);
       cursor: default;
       user-select: none;
       white-space: nowrap;
   }

   /* ADD THIS for images: */
   .client-item img {
       height: 60px;
       width: auto;
       display: block;
       filter: grayscale(100%) brightness(200%);
       transition: filter 0.3s;
   }

   .client-item:hover img {
       filter: grayscale(0%) brightness(100%);
   }
   ```

4. **Update HTML** to use `<img>` tags instead of text spans

---

## 📧 Contact Form Setup

The form on `contact.html` sends emails via Node.js API at `/api/contact`.

**Flow:**
1. User fills form → Clicks "SEND MESSAGE"
2. JavaScript validates → POST to `/api/contact`
3. Server.js receives → sends email via Nodemailer
4. Also logs to `inquiries.log` file

**To receive emails:**
1. Edit `.env` file with your email credentials (see above)
2. For Gmail: Enable 2FA → Generate App Password
3. Restart server: `pm2 restart albaraka-website` or `npm start`

**Test:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@test.com","mobile":"1234567890","service":"Equipment Rental","location":"Abu Dhabi","duration":"1 month","message":"Test"}'
```

Check response: `{"success":true,"message":"Inquiry received successfully!"}`

---

## 🐛 Troubleshooting

### "Cannot GET /about" error
**Cause:** Server not running or routing issue  
**Fix:** 
```bash
# Ensure server is running
npm start

# Access pages correctly:
http://localhost:3000/about.html   (with .html)
# OR with redirect routes:
http://localhost:3000/about        (without .html)
```

### Images not loading
**Cause:** Wrong paths or missing files  
**Fix:** 
1. Check all images exist in `assets/images/`
2. Paths in HTML are relative: `src="assets/images/logo_final.png"`
3. On traditional hosting, paths work as-is

### Contact form not sending email
**Cause:** `.env` file missing or credentials wrong  
**Fix:**
1. Create `.env` file (copy from `.env.example`)
2. Fill in `EMAIL_USER` and `EMAIL_PASS`
3. Check `inquiries.log` for errors
4. Ensure `PORT=3000` is not blocked by firewall

### "Blank white page" or "JavaScript error"
**Cause:** Browser cache or JS error  
**Fix:**
1. Hard refresh: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
2. Open DevTools (F12) → Console tab → check errors
3. Clear browser cache completely

### 404 errors for CSS/JS files
**Cause:** Files not uploaded or wrong paths  
**Fix:** Ensure these files exist in root:
- `style.css`
- `mobile.css`
- `about.css`, `services.css`, `support.css`, `contact.css`, `projects.css`
- `script.js`, `home.js`, `about.js`, `services.js`, `support.js`, `contact.js`, `projects.js`

---

## 📞 Support & Contact

**Company:** Al Baraka Diyar Project Support FZE LLC  
**Email:** info.ab@albarakahuae.com  
**Phone:** +971 2 555 9000  
**Address:** Musaffah Industrial Zone, Abu Dhabi, UAE

---

## 📄 License

Copyright © 2026 Al Baraka Diyar Project Support FZE LLC. All rights reserved.

---

## ✅ Deployment Checklist

Before going live:

- [ ] Replace `logo_final.png` with your actual company logo
- [ ] Update all text content (company name, phone, email, address)
- [ ] Replace all images in `assets/images/` with your actual photos
- [ ] Update Google Maps iframe in `contact.html` with your location
- [ ] Fill in `.env` with real email credentials
- [ ] Test contact form submission
- [ ] Check all navigation links work
- [ ] Test on mobile devices
- [ ] Set up SSL certificate (HTTPS) via Let's Encrypt
- [ ] Configure domain DNS to point to server IP
- [ ] Submit sitemap to Google Search Console
- [ ] Verify all meta tags (Open Graph, Twitter Cards) have correct URLs

---

**Need Help?** Contact your developer or email: [info.ab@albarakahuae.com](mailto:info.ab@albarakahuae.com)
