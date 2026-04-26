# 🚀 GoDaddy Hosting Deployment Guide

## 📋 Pre-Upload Checklist

Before uploading to GoDaddy, make sure you've:

1. ✅ **Edited all HTML files** with your real company info
2. ✅ **Replaced images** in `assets/images/` folder
3. ✅ **Updated contact details** in `contact.html` (phone, email, address)
4. ✅ **Hard refreshed** locally: `http://localhost:3000` works perfectly
5. ✅ **Tested contact form** (if using Node.js VPS, skip if using shared hosting)
6. ✅ **Read this entire guide** before starting

---

## 🏢 **GoDaddy Hosting Type Decision**

GoDaddy offers multiple hosting types. **Which one do you have?**

| Hosting Type | What You Get | Contact Form Solution |
|--------------|--------------|----------------------|
| **cPanel Shared Hosting** (Most common, ~$5-10/month) | Apache server, no Node.js | Use **Formspree** (free) |
| **VPS / Cloud Servers** (~$10-40/month) | Full root access, Node.js OK | Use built-in Node.js server |
| **WordPress Hosting** | WordPress only | Not suitable for this HTML site |

**Not sure?** Log into GoDaddy → "My Products" → Check hosting name:
- "cPanel Hosting" or "Web Hosting" → **Shared Hosting**
- "VPS" or "Cloud Server" → **VPS**
- "Managed WordPress" → **Not compatible** (need cPanel)

---

## 📦 **Option 1: cPanel Shared Hosting** (MOST COMMON)

### Step 1: Prepare Files for Upload

**Create a ZIP file** with ONLY these files (exclude backend):

```
albaraka-website.zip
│
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
├── assets/ (entire folder with all images)
├── sitemap.xml
├── robots.txt
└── README.md (optional)
```

**DO NOT include:** `server.js`, `package.json`, `node_modules/`, `.env`, `inquiries.log`

### Step 2: Upload to GoDaddy cPanel

1. **Log into GoDaddy** → "My Products" →Find your hosting → "cPanel Admin"

2. **In cPanel**, search for **"File Manager"**

3. **Navigate to:** `public_html/` folder (this is your website root)

4. **Upload ZIP:**
   - Click "Upload" button (top menu)
   - Select your `albaraka-website.zip`
   - Wait for upload to complete

5. **Extract ZIP:**
   - Right-click the ZIP → "Extract"
   - All files will unpack into `public_html/`

6. **Set Default Page:**
   - In cPanel, search for "**Domains**" → "Manage Domains"
   - Find your domain → Click "Settings" (gear icon)
   - Set "Document Root" to `public_html`
   - Or in File Manager: right-click `index.html` → "Set as Default Page"

7. **Test your site:**
   ```
   http://yourdomain.com
   http://yourdomain.com/about.html
   http://yourdomain.com/contact.html
   ```

### Step 3: Contact Form Setup (NO NODE.JS ON SHARED HOSTING)

Since GoDaddy shared hosting doesn't support Node.js, replace the contact form with **Formspree**:

#### **Method A: Formspree (Recommended - Free tier available)**

1. **Go to** [Formspree.io](https://formspree.io/) → Sign up (free)

2. **Create New Form:**
   - Click "New Form"
   - Name: "Al Baraka Contact"
   - Email: `your-email@yourcompany.com` (where you want submissions)
   - Copy the endpoint URL: `https://formspree.io/f/xxxxxx`

3. **Edit `contact.html`** (line ~151):

   **FIND:**
   ```html
   <form id="contactForm">
   ```

   **REPLACE WITH:**
   ```html
   <form id="contactForm" action="https://formspree.io/f/xxxxxx" method="POST">
   ```

4. **Remove/uncomment the JavaScript form handler** in `contact.js`:
   - Open `contact.js`
   - Comment out or delete the `fetch` call (lines that send to `/api/contact`)
   - Keep only validation
   - OR just leave it — the form will submit to Formspree directly

5. **Add hidden field for reply-to** (optional):
   ```html
   <input type="hidden" name="_replyto" value="email">
   ```

6. **Upload `contact.html`** (replace old file)

7. **Test:** Fill form → Submit → Check your email for Formspree notification

---

#### **Method B: GoDaddy's Email Forwarding (Simple, no 3rd party)**

If you don't want Formspree, use GoDaddy's built-in email:

1. **Create email account** in GoDaddy cPanel:
   - Email: `info@yourdomain.com` (or use existing)

2. **Edit `contact.html`** to use `mailto:`:
   ```html
   <form action="mailto:info@yourdomain.com" method="post" enctype="text/plain">
   ```
   **⚠️ This is less reliable** — user's email client must be configured.

3. **Better:** Use GoDaddy's **Form Generator** (cPanel → "Email" → "Form Mailer")

---

## 🖥️ **Option 2: GoDaddy VPS / Cloud Server** (Node.js)

If you have a **GoDaddy VPS** (not shared hosting):

### Step 1: Access Your VPS

```bash
# Via SSH (using PuTTY or Terminal)
ssh root@your-server-ip
# OR if you have cPanel VPS: ssh username@your-server-ip
```

### Step 2: Upload Files

**Option A: SFTP (FileZilla/WinSCP)**
- Host: `your-server-ip`
- Username: (your SSH username)
- Password: (your SSH password)
- Upload ALL files to `/var/www/yourdomain.com/`

**Option B: Git Clone** (if repo is on GitHub/GitLab)
```bash
cd /var/www
git clone <your-repo-url> yourdomain.com
cd yourdomain.com
```

### Step 3: Install Node.js & PM2

```bash
# Update server
apt update && apt upgrade -y

# Install Node.js (v18 LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verify
node --version  # should show v18.x
npm --version
```

### Step 4: Install Dependencies

```bash
cd /var/www/yourdomain.com
npm install
```

### Step 5: Create `.env` File

```bash
nano .env
```

Paste:
```env
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_SERVICE=gmail
CONTACT_RECEIVER=info@yourdomain.com
```

Save (`Ctrl+X`, `Y`, `Enter`).

### Step 6: Start Server with PM2 (Keeps running 24/7)

```bash
# Install PM2
npm install -g pm2

# Start your app
pm2 start server.js --name "albaraka-website"

# Check it's running
pm2 status

# Set to auto-start on reboot
pm2 startup
pm2 save
```

### Step 7: Configure Nginx (Reverse Proxy)

```bash
# Install Nginx
apt install -y nginx

# Create config
nano /etc/nginx/sites-available/albaraka
```

Paste this config (replace `yourdomain.com` with your actual domain):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/yourdomain.com;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Serve HTML pages
    location / {
        try_files $uri $uri/ =404;
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

    # Deny access to sensitive files
    location ~ /\.(env|git) {
        deny all;
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/albaraka /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default  # remove default site
nginx -t  # test config
systemctl reload nginx
```

### Step 8: Point Domain to VPS IP

1. **Go to GoDaddy** → "My Products" → Domains → "DNS" (for your domain)
2. **Add/Edit A Record:**
   - Type: `A`
   - Host: `@` (or `yourdomain.com`)
   - Value: `your-server-ip` (e.g., `123.45.67.89`)
   - TTL: `3600` (1 hour)
3. **Save** → Wait 10-30 minutes for DNS

### Step 9: SSL Certificate (HTTPS) — FREE!

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
```

Your site will be live at: **https://yourdomain.com**

---

## 🔄 **How to Keep Server Running 24/7**

### For Shared Hosting (cPanel):
- **No action needed** — server always on
- Just upload files → site is live

### For VPS with PM2:
```bash
# Check status anytime
pm2 status

# View logs
pm2 logs albaraka-website

# Restart if needed
pm2 restart albaraka-website

# PM2 runs in background even after you close SSH
# To stop: pm2 stop albaraka-website
# To delete: pm2 delete albaraka-website
```

---

## 📋 **GoDaddy Upload Summary Table**

| What to Upload | Where to Upload | How |
|----------------|----------------|-----|
| **HTML/CSS/JS files** | `public_html/` (cPanel) or `/var/www/` (VPS) | File Manager or SFTP |
| **Images folder** | Same as above | Upload entire `assets/` folder |
| **Server files** | VPS: `/var/www/yourdomain.com/` | SFTP/SSH |
| **.env** | VPS: Same folder as `server.js` | Create via SSH: `nano .env` |

---

## 🐛 **Troubleshooting GoDaddy**

### "Internal Server Error 500"
- **Cause:** `.htaccess` issue or permissions
- **Fix:** In cPanel File Manager, ensure file permissions are `644` for files, `755` for folders

### "404 Not Found" for CSS/JS
- **Cause:** Wrong paths
- **Fix:** Ensure CSS/JS files are in `public_html/` root, not subfolder

### Contact form not working
- **Shared hosting:** You MUST use Formspree (Node.js won't run)
- **VPS:** Check `.env` file, PM2 logs: `pm2 logs`

### "Cannot GET /about" error
- **Cause:** Typing `yourdomain.com/about` instead of `yourdomain.com/about.html`
- **Fix:** Either use `.html` extension or configure .htaccess redirect (see below)

### `.htaccess` redirect for extensionless URLs (Optional)

If you want `yourdomain.com/about` to work (without `.html`):

Create `.htaccess` file in `public_html/`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ $1.html [L,QSA]
```

**Note:** cPanel shared hosting may already have `.htaccess` — append these lines.

---

## 🔐 **Security Checklist for GoDaddy**

1. **Never upload `.env` file** (contains email passwords)
2. **Change default cPanel password** → use strong password
3. **Disable PHP errors** in cPanel (if not using PHP)
4. **Set file permissions:**
   - Folders: `755`
   - Files: `644`
   - `inquiries.log`: `644` (if using Node.js VPS)
5. **Install SSL** (free via GoDaddy or Let's Encrypt on VPS)
6. **Keep Node.js updated** (VPS only): `npm update -g`

---

## 📞 **GoDaddy Support Contacts**

- **cPanel Hosting Support:** 24/7 chat/phone via GoDaddy account
- **VPS Support:** GoDaddy VPS team
- **Domain DNS issues:** GoDaddy Domains team

---

## ✅ **Final GoDaddy Upload Quick Steps**

### For cPanel Shared Hosting:
```
1. ZIP these files (NO server.js, package.json):
   - All .html, .css, .js files
   - assets/ folder
   - sitemap.xml, robots.txt

2. cPanel → File Manager → public_html/ → Upload ZIP → Extract

3. Contact form: Replace with Formspree code (see above)

4. Test: http://yourdomain.com
```

### For GoDaddy VPS:
```
1. Upload ALL files via SFTP to /var/www/yourdomain.com/

2. SSH into VPS:
   cd /var/www/yourdomain.com
   npm install
   nano .env  (add email credentials)

3. pm2 start server.js --name albaraka
   pm2 startup && pm2 save

4. Configure Nginx (see full config above)

5. Point domain DNS to VPS IP in GoDaddy DNS settings

6. Test: http://yourdomain.com (then add SSL)
```

---

## 📝 **Files to EXCLUDE on GoDaddy Shared Hosting**

When uploading to GoDaddy cPanel (shared hosting), **DO NOT upload**:

```
❌ server.js
❌ package.json
❌ package-lock.json
❌ node_modules/
❌ .env
❌ .git/
❌ .kilo/
❌ inquiries.log
❌ server-output.log
❌ *.log files
❌ .gitignore (safe to keep but not needed)
❌ README.md (optional - can keep for reference)
```

---

## 🎯 **After Uploading — Test Everything**

1. **Home page:** `http://yourdomain.com` → Should load
2. **All pages:** Click every nav link (about, services, projects, support, contact)
3. **Images:** All images should display (no broken images)
4. **Contact form:** Submit test message → Check inbox
5. **Mobile:** Test on phone/tablet
6. **SSL:** Install free SSL via GoDaddy (cPanel) or Certbot (VPS)

---

## 📞 **Need Help?**

If you get stuck:
1. Screenshot the error
2. Check browser DevTools (F12) → Console tab
3. Contact GoDaddy support with details

**Still need help?** Reply with:
- Which GoDaddy hosting you have (cPanel or VPS?)
- The exact error message
- Screenshot if possible

Good luck with your deployment! 🚀
