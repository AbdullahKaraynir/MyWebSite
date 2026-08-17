# Abdullah Karaynir - Personal Portfolio with GitHub Automatic Sync

A modern, responsive personal portfolio built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**, featuring an **Automatic GitHub Project Synchronization Engine**.

---

## 🚀 How GitHub Automatic Synchronization Works

Whenever you create, update, or remove projects on GitHub, your portfolio website automatically updates itself—no manual code edits required!

### 1. Adding a Project to Portfolio
To make a GitHub repository appear on your website:
1. Open your repository on GitHub.
2. Under **About** (top right), click the settings gear icon.
3. Add the topic:
   ```text
   portfolio
   ```
4. Click **Save changes**.

Your project will automatically sync and display on the portfolio.

---

### 2. Marking a Project as Featured
To highlight a project or place it at the top of the Projects list:
1. Add both topics to the repository:
   ```text
   portfolio
   portfolio-featured
   ```

Featured projects appear first, followed by remaining projects sorted by `updated_at DESC`.

---

### 3. Removing a Project
Simply remove the `portfolio` topic from the GitHub repository settings. The project will automatically disappear from your website upon the next sync.

---

## ⚡ Technical Features

- **Topic-Based Filtering**: Only repositories containing the `portfolio` topic are displayed.
- **Automated Technology Detection**: Inspects `package.json`, `requirements.txt`, `pyproject.toml`, `.csproj`, `pubspec.yaml`, `Cargo.toml`, `pom.xml`, and GitHub language breakdown to auto-detect tech stack badges.
- **README Metadata Parsing**: Automatically parses project overview, key features, live demo links, and screenshot URLs from `README.md`.
- **Smart Image Detection**: Priority order:
  1. First meaningful screenshot in `README.md`
  2. Image in `/public` directory
  3. Image in `/assets` or `/docs`
  4. Root repository image
  5. Dynamically generated SVG fallback banner matching portfolio theme.
- **Resilient Caching & Rate-Limit Prevention**: Server-side JSON cache (`github-cache.json`) ensures sub-second page loads and zero crashes if GitHub API is temporarily unavailable.
- **Webhooks & Scheduled Sync**: Real-time push updates via GitHub Webhooks + fallback 30-minute Vercel Cron schedule.

---

## ⚙️ Environment Variables Setup

Copy `.env.example` to `.env.local`:

```env
GITHUB_USERNAME=AbdullahKaraynir
GITHUB_TOKEN=your_optional_github_personal_access_token
GITHUB_WEBHOOK_SECRET=your_webhook_secret
GITHUB_SYNC_SECRET=your_manual_sync_secret
```

---

## 🔔 GitHub Webhook Setup (Optional for Real-Time Updates)

To enable instant website updates whenever code is pushed:

1. Go to your GitHub Repository (or Organization) → **Settings** → **Webhooks** → **Add webhook**.
2. **Payload URL**: `https://YOUR-PORTFOLIO-DOMAIN.com/api/github/webhook`
3. **Content type**: `application/json`
4. **Secret**: Enter the exact secret string defined in `GITHUB_WEBHOOK_SECRET`.
5. **Events**: Select **Just the push event** and **Repositories**.
6. Click **Add webhook**.

---

## 🔄 Manual Synchronization Endpoint

Trigger an instant refresh of all portfolio projects programmatically:

```bash
curl -X POST https://YOUR-PORTFOLIO-DOMAIN.com/api/github/sync \
  -H "Authorization: Bearer YOUR_GITHUB_SYNC_SECRET"
```

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).
