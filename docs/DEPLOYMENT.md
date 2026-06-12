# Deployment Guide

## Overview
This guide covers deploying the Carbon Footprint Awareness Platform to production.

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Build**
   ```bash
   npm run build
   ```

2. **Connect to Vercel**
   - Sign up at vercel.com
   - Connect your GitHub repository
   - Set environment variables:
     ```
     VITE_API_URL=https://api.carbonfootprint.com
     ```

3. **Deploy**
   - Push to main branch
   - Vercel auto-deploys

### Option 2: Netlify

1. **Connect Repository**
   - Sign up at netlify.com
   - Connect GitHub repo

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**
   - Automatic on git push

### Option 3: Self-Hosted (AWS S3 + CloudFront)

1. **Build**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name
   ```

3. **CloudFront**
   - Create distribution
   - Set origin to S3 bucket

## Backend Deployment

### Option 1: Heroku (Deprecated - Use Railway/Render)

### Option 2: Railway.app

1. **Prepare**
   - Ensure `Procfile` exists (optional)
   - Ensure `package.json` has `start` script

2. **Deploy**
   - Connect GitHub repo to Railway
   - Set environment variables
   - Railway auto-detects Node.js app

3. **Database**
   - Railway > Create > PostgreSQL
   - Copy DATABASE_URL
   - Add to app environment variables

### Option 3: Render.com

1. **Create Service**
   - New > Web Service
   - Connect GitHub repo

2. **Configure**
   - Build: `npm install`
   - Start: `npm start`
   - Set environment variables

3. **Database**
   - Create PostgreSQL database
   - Add connection string to env

### Option 4: DigitalOcean App Platform

1. **Connect Repository**
   - DigitalOcean > App Platform > Create App
   - Connect GitHub

2. **Configure**
   - Set environment variables
   - Set build command
   - Set run command

3. **Deploy**
   - Connect PostgreSQL database
   - Deploy

### Option 5: Docker + Self-Hosted

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

2. **Build Image**
   ```bash
   docker build -t carbon-footprint-api .
   ```

3. **Push to Registry**
   ```bash
   docker tag carbon-footprint-api:latest yourregistry/carbon-footprint-api:latest
   docker push yourregistry/carbon-footprint-api:latest
   ```

4. **Deploy**
   - Use Docker Compose or Kubernetes
   - Configure environment variables
   - Set up reverse proxy (nginx)

## Environment Variables

### Production Backend
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=generate-strong-random-secret
JWT_EXPIRE=7d
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=info
```

### Production Frontend
```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Carbon Track
```

## Database Migration

### Initial Setup
1. Database is created automatically
2. Schema is initialized via init.sql
3. Verify tables exist:
   ```bash
   psql -c "\dt"
   ```

### Backup & Recovery
```bash
# Backup
pg_dump carbon_footprint > backup.sql

# Restore
psql carbon_footprint < backup.sql
```

## SSL/HTTPS

### Automatic (Let's Encrypt)
- Railway/Render/Vercel: Automatic
- AWS: Use ACM
- Self-hosted: Use Certbot

### Manual
```bash
# Using certbot
sudo certbot certonly --standalone -d yourdomain.com
```

## CDN Configuration

### CloudFlare
1. Add domain to Cloudflare
2. Set up DNS records
3. Enable caching for static assets
4. Configure cache rules

### CloudFront (AWS)
1. Create distribution
2. Set origin domain
3. Configure cache behaviors
4. Create invalidation after deploy

## Monitoring

### Application Monitoring
- Sentry for error tracking
- DataDog for performance
- CloudWatch logs

### Database Monitoring
- Connection pooling
- Query performance
- Backup verification

## Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy Frontend
        run: npm run build
      - name: Deploy Backend
        run: npm run test
```

## Security Checklist

- [ ] Environment variables secure
- [ ] Database credentials encrypted
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Security headers set
- [ ] Dependencies updated
- [ ] Regular backups scheduled

## Performance Optimization

### Frontend
- Enable gzip compression
- Minify CSS/JS
- Optimize images
- Cache assets

### Backend
- Enable query caching
- Use connection pooling
- Implement rate limiting
- Add API response caching

## Rollback Plan

1. **Before Deployment**
   - Backup database
   - Tag release version
   - Test in staging

2. **If Issues Occur**
   - Revert to previous commit
   - Restore database backup
   - Check logs for errors

## Troubleshooting

### 502 Bad Gateway
- Check backend service logs
- Verify database connection
- Check environment variables

### Database Connection Failed
- Verify DATABASE_URL
- Check network access
- Verify database is running

### High Response Time
- Check database query performance
- Monitor server resources
- Verify CDN configuration

## Support & Resources

- Railway: railway.app/support
- Render: render.com/docs
- Vercel: vercel.com/docs
- PostgreSQL: postgresql.org/docs

---

**Need help?** Check logs or open an issue on GitHub.
