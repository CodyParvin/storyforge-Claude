
# AI StoryForge Deployment Guide

This guide will help you deploy your AI StoryForge application to various platforms.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository connected (recommended)

## Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your environment variables in `.env.local`

## Build Process

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

The build output will be in the `dist/` directory.

## Deployment Platforms

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables in Netlify dashboard

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use GitHub Actions for automatic deployment
3. Set base URL in vite.config.ts if needed

### Docker Deployment
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Variables by Platform

### Production Environment Variables
- `VITE_APP_URL`: Your production domain
- `VITE_API_URL`: Your production API endpoint
- `VITE_ENVIRONMENT`: "production"
- `NODE_ENV`: "production"
- `VITE_ENABLE_ANALYTICS`: "true"
- `VITE_ENABLE_ERROR_REPORTING`: "true"

### Staging Environment Variables
- `VITE_APP_URL`: Your staging domain
- `VITE_API_URL`: Your staging API endpoint
- `VITE_ENVIRONMENT`: "staging"
- `NODE_ENV`: "production"
- `VITE_ENABLE_ERROR_REPORTING`: "true"

## Performance Optimization

### Bundle Analysis
```bash
npm run build -- --analyze
```

### Build Optimization Tips
1. Enable gzip compression
2. Set proper cache headers
3. Use CDN for static assets
4. Enable PWA features if needed

## Security Considerations

1. Never commit `.env.local` or `.env.production`
2. Use environment variables for all sensitive data
3. Enable HTTPS in production
4. Set proper CORS headers
5. Implement Content Security Policy (CSP)

## Monitoring

### Error Reporting
Configure error reporting service in production:
- Sentry
- Bugsnag
- LogRocket

### Analytics
Set up analytics tracking:
- Google Analytics
- Mixpanel
- Plausible

## Troubleshooting

### Build Issues
- Check Node.js version compatibility
- Clear node_modules and reinstall
- Verify environment variables

### Runtime Issues
- Check browser console for errors
- Verify API endpoints are accessible
- Check network requests in DevTools

## Custom Domain Setup

### Vercel
1. Add domain in Vercel dashboard
2. Configure DNS records
3. SSL certificates are automatic

### Netlify
1. Add domain in Netlify dashboard
2. Configure DNS records
3. Enable HTTPS

## Rollback Strategy

1. Keep previous build artifacts
2. Use feature flags for gradual rollouts
3. Monitor application metrics
4. Have quick rollback procedure ready

## Support

For deployment issues:
1. Check the deployment logs
2. Verify environment variables
3. Test locally with production build
4. Check platform-specific documentation
