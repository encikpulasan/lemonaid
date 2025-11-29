# Fresh Lemonaid Wiki

This directory contains all the wiki pages for Fresh Lemonaid documentation.

## How to Push to GitHub Wiki

### Step 1: Enable Wiki in Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Features** section
4. Check **Wikis**
5. Click **Save**

### Step 2: Clone the Wiki Repository

GitHub Wikis are stored in a separate Git repository:

```bash
# Clone the wiki repository
git clone https://github.com/your-username/fresh-lemonaid.wiki.git
cd fresh-lemonaid.wiki
```

### Step 3: Copy Wiki Files

Copy all files from this `wiki/` directory to the cloned wiki repository:

```bash
# From the project root
cp wiki/*.md fresh-lemonaid.wiki/
```

### Step 4: Commit and Push

```bash
cd fresh-lemonaid.wiki
git add .
git commit -m "Add Fresh Lemonaid documentation"
git push origin master
```

## Wiki Pages

- **Home.md** - Main landing page
- **Getting-Started.md** - Setup and installation guide
- **Architecture.md** - Project structure and patterns
- **Examples.md** - Code examples and patterns
- **API-Reference.md** - Complete API documentation
- **Deployment.md** - Deployment guide for Deno Deploy
- **Vibe-Coding.md** - Guide for AI-assisted development
- **Contributing.md** - Contribution guidelines
- **_Sidebar.md** - Navigation sidebar (auto-generated)
- **_Footer.md** - Footer content (auto-generated)

## Updating Wiki

To update the wiki:

1. Make changes to files in this `wiki/` directory
2. Clone the wiki repository (if not already cloned)
3. Copy updated files
4. Commit and push changes

## Notes

- GitHub automatically converts markdown files to HTML
- The `_Sidebar.md` and `_Footer.md` files are special and will appear on all pages
- Page names with dashes (e.g., `Getting-Started`) will appear as "Getting Started" in the wiki
- Links between pages use the filename: `[Getting Started](Getting-Started)`

