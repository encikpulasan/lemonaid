# Deployment

Deploy Fresh Lemonaid to production with Deno Deploy.

## Deno Deploy (Recommended)

Deno Deploy is the recommended platform for Fresh applications.

### Prerequisites

1. **Deno Deploy Account** - Sign up at [deno.com/deploy](https://deno.com/deploy)
2. **GitHub Repository** - Your code should be in a GitHub repository

### Deployment Steps

#### Option 1: GitHub Integration (Recommended)

1. **Connect Repository**:
   - Go to [deno.com/deploy](https://deno.com/deploy)
   - Click "New Project"
   - Select "Import from GitHub"
   - Choose your repository
   - Select the branch (usually `main` or `master`)

2. **Configure Project**:
   - **Project Name**: Your project name
   - **Root Directory**: `/` (root of repository)
   - **Entrypoint**: `main.ts`
   - **Environment**: Production

3. **Set Environment Variables**:
   - Go to Settings > Environment Variables
   - Add all variables from `.env.example`:
     ```
     ENV=production
     PORT=8000
     HOST=0.0.0.0
     API_KEY=your_production_api_key
     CORS_ORIGIN=https://yourdomain.com
     CORS_ENABLED=true
     FRESH_PUBLIC_API_URL=https://api.yourdomain.com
     ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.deno.dev`

#### Option 2: Deploy CLI

```bash
# Install Deno Deploy CLI
deno install -A -n deployctl https://deno.land/x/deploy/deployctl.ts

# Login
deployctl auth login

# Deploy
deployctl deploy --project=your-project-name main.ts
```

### Environment Variables

Set environment variables in the Deno Deploy dashboard:

1. Go to your project
2. Click "Settings"
3. Go to "Environment Variables"
4. Add each variable from `.env.example`

**Important Variables for Production**:

```env
ENV=production
API_KEY=your_secure_api_key_here
CORS_ORIGIN=https://yourdomain.com
CORS_ENABLED=true
```

### Custom Domain

1. Go to project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

### Production Checklist

Before deploying to production:

- [ ] Set `ENV=production` in environment variables
- [ ] Set secure `API_KEY` for API routes
- [ ] Configure `CORS_ORIGIN` to your domain (not `*`)
- [ ] Set `CORS_ENABLED=true`
- [ ] Configure `FRESH_PUBLIC_*` variables if needed
- [ ] Test API key authentication
- [ ] Test CORS headers
- [ ] Verify logging works correctly
- [ ] Test error handling
- [ ] Set up custom domain (optional)

### Monitoring

Deno Deploy provides:

- **Logs**: View real-time logs in the dashboard
- **Analytics**: Request metrics and performance
- **Alerts**: Set up alerts for errors

## Other Deployment Options

### Docker

```dockerfile
FROM denoland/deno:latest

WORKDIR /app
COPY . .
RUN deno task build

EXPOSE 8000
CMD ["deno", "task", "start"]
```

Build and run:

```bash
docker build -t fresh-lemonaid .
docker run -p 8000:8000 fresh-lemonaid
```

### Self-Hosted

```bash
# Build
deno task build

# Run
deno run -A main.ts
```

### CI/CD

Deno Deploy automatically deploys on:
- Push to connected branch
- Manual deployment trigger

For custom CI/CD:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: denoland/setup-deno@v1
      - run: deployctl deploy --project=your-project main.ts
        env:
          DENO_DEPLOY_TOKEN: ${{ secrets.DENO_DEPLOY_TOKEN }}
```

## Troubleshooting

### Build Fails

- Check that all dependencies are in `deno.json`
- Verify `main.ts` is the correct entrypoint
- Check build logs in Deno Deploy dashboard

### Environment Variables Not Working

- Ensure variables are set in Deno Deploy dashboard
- Use `getConfig()` from `utils/config.ts` to access variables
- Check variable names match exactly

### CORS Issues

- Verify `CORS_ORIGIN` is set correctly
- Check that `CORS_ENABLED=true`
- Ensure origin matches exactly (no trailing slashes)

### API Key Not Working

- Verify `API_KEY` is set in environment variables
- Check that requests include `x-api-key` header
- Verify API key matches exactly (case-sensitive)

## Security Best Practices

1. **Never commit `.env` files**
2. **Use strong API keys** (generate with `openssl rand -hex 32`)
3. **Set `CORS_ORIGIN` to specific domains** (not `*` in production)
4. **Enable API key validation** for all API routes
5. **Use HTTPS** (automatic on Deno Deploy)
6. **Set `ENV=production`** in production

## Local Testing

Test production build locally:

```bash
# Build
deno task build

# Start production server
deno task start
```

## Resources

- [Deno Deploy Documentation](https://deno.com/deploy/docs)
- [Fresh Deployment Guide](https://fresh.deno.dev/docs/deployment)
- [Deno Deploy Dashboard](https://dash.deno.com)

---

**Ready to deploy? Follow the steps above and your app will be live in minutes! 🚀**

