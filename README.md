# Kamlesh Lovewanshi — Portfolio

A modern, responsive, and accessible portfolio built with plain HTML, CSS, and JavaScript.

## Structure
- `index.html` — main page
- `styles.css` — site styles (dark/light theme)
- `script.js` — interactions (theme toggle, mobile menu, reveal-on-scroll)

## Local preview
Open `index.html` in your browser, or serve the folder with any static server.

## Deploy to GitHub Pages
There are two ways to deploy:

### Option A — Project site (recommended)
1. Create a new GitHub repository (e.g., `personal-website`).
2. Push this folder to the repo's `main` branch.
3. In GitHub: Settings → Pages → Build and deployment → Source: `Deploy from a branch`.
4. Select Branch: `main` and Folder: `/ (root)` → Save.
5. Your site will be available at: `https://<your-username>.github.io/personal-website/`.

### Option B — User site (root domain)
1. Create a repo named exactly: `<your-username>.github.io`.
2. Push this folder to `main`.
3. GitHub Pages will publish at `https://<your-username>.github.io/` automatically.

## Commands (example)
```bash
# Initialize git (run inside the project folder)
git init -b main

git add .
git commit -m "feat: initial portfolio website"

# Add your GitHub remote (replace with your repo URL)
# Example: git remote add origin https://github.com/<username>/personal-website.git
git remote add origin <YOUR_REPO_URL>

git push -u origin main
```

Then enable Pages in repository Settings as described above.

## Customization
- Update social links, contact info, and project URLs in `index.html`.
- To add a resume, place your PDF in the root (e.g., `resume.pdf`) and link it in the Hero or Header.

## Notes
- `.nojekyll` is included so GitHub Pages serves assets without Jekyll processing.
- Works without any build step.
