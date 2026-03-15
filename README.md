# CSharpTek Website

AI-First software development company website built with Next.js 14.

## 🚀 Deploy to Vercel (3 steps)

### Option A — Vercel CLI (fastest)
```bash
npm i -g vercel
cd csharptek
npm install
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Vercel auto-detects Next.js — click Deploy
4. Done ✅ Live in ~60 seconds

### Option C — Drag & Drop
1. Run `npm run build` locally
2. Drag the `.next` folder to vercel.com/new

---

## 🖥️ Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## 📁 Project Structure
```
csharptek/
├── pages/
│   ├── _app.js          # App wrapper + global CSS import
│   ├── _document.js     # HTML head, meta tags, SEO
│   └── index.js         # Homepage — all sections assembled
├── components/
│   ├── Nav.js            # Sticky nav with mobile hamburger
│   ├── Nav.module.css
│   ├── Hero.js           # Particle canvas, typewriter, stat counters
│   ├── Hero.module.css
│   ├── Chatbot.js        # AI chat widget (Tek)
│   └── Chatbot.module.css
├── styles/
│   └── globals.css       # CSS variables, reset, shared styles, keyframes
├── public/
│   └── (add logo.png, favicon.ico here)
├── next.config.js
├── vercel.json
└── package.json
```

---

## 🎨 Adding Your Logo
In `components/Nav.js`, find this comment:
```jsx
{/* LOGO — swap the span block for <img src="/logo.png" ... /> when ready */}
```
Replace the two `<span>` elements with:
```jsx
<img src="/logo.png" alt="CSharpTek" style={{height:42,width:'auto',objectFit:'contain'}} />
```
Then drop `logo.png` into the `/public` folder.

---

## 🎨 Changing Colours
All colours are CSS variables in `styles/globals.css`:
```css
:root {
  --navy:     #0A1628;
  --ocean:    #1565A8;
  --sky:      #2E9ED6;
  --cloud:    #7EC8E3;
  --orange:   #FF6B2B;   /* ← CTA / accent colour */
}
```

---

## 📧 Update Contact Info
Search for `hello@csharptek.com` in `pages/index.js` and replace with your real email.

---

## 🗺️ Pages Roadmap
| Page         | Status      | File                    |
|--------------|-------------|-------------------------|
| Homepage     | ✅ Complete  | pages/index.js          |
| About Us     | 🔜 Next     | pages/about.js          |
| Services     | 🔜 Next     | pages/services/index.js |
| Industries   | 🔜 Next     | pages/industries/[slug].js |
| Portfolio    | 🔜 Next     | pages/portfolio/index.js |
| Blog         | 🔜 Next     | pages/blog/index.js     |
| Careers      | 🔜 Next     | pages/careers.js        |
| Contact      | 🔜 Next     | pages/contact.js        |

---

Built with ❤️ by CSharpTek · www.csharptek.com
