# Hostinger Deployment Guide

## Migration from GitHub Pages to Hostinger

This guide covers deploying the Al Baraka Diyar website to Hostinger shared hosting.

---

## Prerequisites

1. **Hostinger Account** - Active hosting plan with access to hPanel
2. **Domain** - Your domain (e.g., albarakadiyar.com) pointing to Hostinger nameservers
3. **FTP Access** - Or use hPanel File Manager
4. **Node.js Support** - If using server-side features (contact form), ensure Node.js hosting or use static export

---

## Option 1: Static HTML Deployment (Recommended for Shared Hosting)

If you don't need server-side email processing, deploy the static HTML files from the `deployment-package/` folder.

### Steps:

1. **Download the deployment package**
   ```bash
   deployment-package/  # All static files ready
   ```

2. **Log into Hostinger hPanel**
   - Go to `hostinger.com` → Login → hPanel

3. **Upload files via File Manager**
   - Navigate to `public_html/` (root directory)
   - Click **File Manager** → Upload
   - Upload `deployment-package.zip` (create a zip of the folder)
   - Extract all files to `public_html/`

   **Alternative via FTP:**
   ```bash
   Host: ftp.yourdomain.com
   Username: your-ftp-username
   Password: your-ftp-password
   ```
   Upload all files from `deployment-package/` to `/public_html/`

4. **Set index page**
   - In hPanel → **Advanced** → **Directory Indexes**
   - Ensure `index.html` is set as default (usually automatic)

5. **SSL Certificate (HTTPS)**
   - In hPanel → **Security** → **SSL**
   - Enable **Free SSL Certificate** (Let's Encrypt)
   - Force HTTPS redirect (optional but recommended)

6. **Test the site**
   - Visit `https://albarakadiyar.com`
   - Verify all pages load correctly
   - Check mobile responsiveness
   - Verify images display properly

---

## Option 2: Node.js Backend Deployment (For Contact Form)

If you need server-side contact form handling, deploy as a Node.js app.

### Requirements:
- Hostinger Business or higher plan (supports Node.js)
- Or use a separate VPS/Cloud instance

### Steps:

1. **Upload all project files** (not just `deployment-package/`)
   - Upload entire project folder to your hosting directory

2. **Install dependencies**
   ```bash
   cd /home/username/albaraka
   npm install --production
   ```

3. **Configure environment variables**
   Create `.env` file in project root:
   ```env
   EMAIL_USER=your-email@albarakadiyar.com
   EMAIL_PASS=your-app-password
   CONTACT_RECEIVER=info.ab@albarakahuae.com
   ```

4. **Start the application**
   ```bash
   npm start
   ```
   Or with PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "albaraka-website"
   pm2 save
   pm2 startup
   ```

5. **Configure web server (Nginx/Apache)**
   - Proxy requests to Node.js on port 3000
   - Example Nginx config:
   ```nginx
   location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

6. **Renew SSL certificate**
   ```bash
   certbot --nginx -d albarakadiyar.com -d www.albarakadiyar.com
   ```

---

## DNS Configuration (GoDaddy → Hostinger Migration)

If your domain is registered with GoDaddy and hosting with Hostinger:

1. **At GoDaddy:**
   - Login → Domain Management → DNS
   - Update nameservers to Hostinger's:
     ```
     ns1.hostinger.com
     ns2.hostinger.com
     ```
   - Wait 24-48 hours for propagation

2. **At Hostinger:**
   - Add domain in hPanel → **Domains** → **Add Domain**
   - Point domain to your hosting account
   - SSL will auto-install (if enabled)

---

## Post-Deployment Checklist

- [ ] SSL certificate active (HTTPS)
- [ ] All pages load without 404 errors
- [ ] Contact form submits successfully (test with real email)
- [ ] Mobile menu works properly
- [ ] Carousel animations smooth on mobile
- [ ] Images optimized and loading quickly
- [ ] SEO meta tags present (canonical, OG, Twitter cards)
- [ ] Sitemap accessible at `sitemap.xml`
- [ ] robots.txt configured correctly

---

## Troubleshooting

**Images not loading:**
- Verify `assets/images/normalized/` folder uploaded completely
- Check file permissions (755 for folders, 644 for files)

**Contact form not working:**
- Verify Node.js server running: `pm2 status`
- Check `.env` configuration
- Review server logs: `pm2 logs albaraka-website`

**SSL not activating:**
- Ensure domain nameservers point to Hostinger
- Wait up to 24 hours after DNS change
- Manually trigger SSL install in hPanel

**Mobile carousel text overlap:**
- Clear browser cache
- Verify `mobile.css` loaded properly

---

## Rollback Plan

Keep the GitHub Pages deployment active as fallback:
- `https://ibmdigitech.github.io/AL-BARAKA1/`

If Hostinger issues arise, update DNS back to GitHub Pages nameservers.

---

## Support Resources

- Hostinger Documentation: https://www.hostinger.com/tutorials
- Hostinger 24/7 Live Chat: Available in hPanel
- Project README: `README.md`
- Deployment Summary: `FINAL_DEPLOYMENT_SUMMARY.md`

---

**Last Updated:** 2026-05-03  
**Version:** 1.0  
**Target Domain:** https://albarakadiyar.com (update references if different)
