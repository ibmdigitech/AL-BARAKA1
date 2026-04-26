# ✅ GoDaddy cPanel Upload - Quick Steps

## 🎯 What You Need to Do

### Step 1: Download & Edit Files Locally

1. **Open your project folder:** `D:\antigravty skills\al barakah\`

2. **Edit these files with your info:**
   - `index.html` — Replace ALL placeholder text with your company details
   - `about.html` — Corporate profile content
   - `contact.html` — Update phone, email, address, map
   - `assets/images/` — Replace all images with your actual photos
   - `style.css` (lines 12-28) — Change brand colors if needed

3. **Save all files**

---

### Step 2: Create ZIP for Upload

**IMPORTANT:** For GoDaddy cPanel (shared hosting), **DO NOT** include:
- ❌ `server.js`
- ❌ `package.json`
- ❌ `package-lock.json`
- ❌ `node_modules/` folder
- ❌ `.env`
- ❌ `inquiries.log`
- ❌ `server-output.log`
- ❌ `.git/` folder

**Create ZIP with ONLY these files:**

```
📦 albaraka-website.zip
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
├── sitemap.xml
├── robots.txt
└── 📁 assets/ (entire folder with all images)
```

**How to ZIP in Windows:**
1. Select all files above (use Ctrl+click)
2. Right-click → "Send to" → "Compressed (zipped) folder"
3. Name it: `albaraka-website.zip`

---

### Step 3: Upload ZIP to GoDaddy cPanel

1. **Log into GoDaddy** → "My Products" → Find your hosting → **cPanel Admin**

2. In cPanel, search for **"File Manager"** and open it

3. Navigate to: `public_html/` (this is your website root)

4. Click **Upload** (top button) → Select `albaraka-website.zip`

5. Wait for upload → Click **"Extract"** to unzip

6. After extraction, you should see all files in `public_html/`

7. **Optional:** Delete the ZIP file to save space

---

### Step 4: Set Contact Form (IMPORTANT)

Since GoDaddy shared hosting **does NOT support Node.js**, you must use a form service.

#### **Easiest: Formspree (Free up to 50 submissions/month)**

**A. Sign up at [formspree.io](https://formspree.io/)**
- Create free account
- Click "New Form"
- Enter email where you want form submissions sent
- Copy the endpoint URL: `https://formspree.io/f/xxxxx`

**B. Edit `contact.html`**

Find this line (around line 151):
```html
<form id="contactForm">
```

Change it to:
```html
<form id="contactForm" action="https://formspree.io/f/YOUR-ENDPOINT-HERE" method="POST">
```

**C. Edit `contact.js`** (line ~50)

Find:
```javascript
// Old API call - COMMENT THIS OUT:
// .then(response => response.json())
```

Replace with:
```javascript
// Formspree - just show success message
console.log('Form submitted via Formspree');
```

**D. Upload `contact.html` and `contact.js`** to GoDaddy (replace old files)

**E. Test:**
1. Go to `http://yourdomain.com/contact.html`
2. Fill form → Submit
3. Check email for Formspree notification

---

### Step 5: Test Your Live Site

Visit your domain:
```
http://yourdomain.com
http://yourdomain.com/about.html
http://yourdomain.com/services.html
http://yourdomain.com/contact.html
```

**Checklist:**
- [ ] Home page loads with hero image
- [ ] All navigation links work
- [ ] All images display (no broken images)
- [ ] Contact form submits (test with your email)
- [ ] Mobile version works (resize browser)

---

## 🔥 **Quick Commands Summary**

### To Create ZIP (Windows File Explorer):
```
Select: index.html, about.html, services.html, projects.html, support.html, contact.html
        style.css, mobile.css, about.css, services.css, projects.css, support.css, contact.css
        script.js, home.js, about.js, services.js, projects.js, support.js, contact.js
        sitemap.xml, robots.txt
Add: assets/ folder (right-click → "Send to" → "Compressed (zipped) folder")
```

### To Upload (GoDaddy cPanel):
```
cPanel → File Manager → public_html/ → Upload ZIP → Extract
```

---

## 🆘 **Common Issues on GoDaddy**

### ❌ 404 Errors for CSS/JS
**Fix:** Ensure files are in `public_html/` root, not in a subfolder

### ❌ Contact Form Not Working
**Fix:** Use Formspree (see above). Node.js won't run on cPanel.

### ❌ Images Not Loading
**Fix:** 
1. Check `assets/` folder uploaded completely
2. Paths in HTML use relative paths: `src="assets/images/logo.png"`
3. No uppercase in folder names (GoDaddy Linux is case-sensitive: `Assets` ≠ `assets`)

### ❌ Styles Not Applied
**Fix:** Clear browser cache (Ctrl+Shift+R) or add version query string:
```html
<link rel="stylesheet" href="style.css?v=1">
```

---

## 📞 **Need Help?**

1. **GoDaddy Support:** 24/7 chat/phone — they can help with cPanel file upload
2. **README.md** — Full documentation
3. **GODADDY_DEPLOY.md** — Complete GoDaddy guide

---

## ✅ **Done!**

Your site is now live at **http://yourdomain.com**

**Next steps:**
1. Set up SSL certificate (free via GoDaddy)
2. Submit sitemap to Google Search Console
3. Test on mobile devices

Good luck! 🚀
