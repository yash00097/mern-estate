# Vercel Deployment Guide for MERN Estate App

## Prerequisites
- Vercel account (sign up at vercel.com)
- GitHub repository with your code
- Environment variables ready

## Step 1: Prepare Your Repository
1. Push all your code to GitHub including the new files:
   - `vercel.json`
   - `package.json` (root level)
   - `.vercelignore`
   - Updated `api/index.js`
   - Updated `client/package.json`
   - Updated `client/vite.config.js`

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it as a Node.js project
5. Configure the following settings:
   - **Framework Preset**: Other
   - **Root Directory**: Leave empty (uses root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project root
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: (your-project-name)
# - Directory: ./
```

## Step 3: Configure Environment Variables
In your Vercel dashboard, go to your project settings and add these environment variables:

### Required Environment Variables:
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `EMAIL_USER`: Your email for nodemailer
- `EMAIL_PASS`: Your email app password
- `CLOUDINARY_URL`: Your Cloudinary URL

### Client Environment Variables (if needed):
- `VITE_FIREBASE_API_KEY`: Your Firebase API key
- `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `VITE_CLOUDINARY_UPLOAD_PRESET`: Your Cloudinary upload preset

## Step 4: Domain Configuration
1. In Vercel dashboard, go to your project
2. Go to "Settings" > "Domains"
3. Add your custom domain (optional)
4. Vercel provides a free `.vercel.app` domain by default

## Step 5: Test Your Deployment
1. Visit your Vercel URL
2. Test all functionality:
   - User registration/login
   - Creating listings
   - Image uploads
   - Database operations
   - Email functionality

## Important Notes:

### API Routes
- All API routes will be available at `https://your-app.vercel.app/api/*`
- The frontend will automatically proxy API calls in production

### Database Connection
- Make sure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges
- Vercel functions are serverless, so database connections should be handled properly

### File Uploads
- Since you're using Cloudinary, file uploads should work seamlessly
- Vercel has a 50MB limit for serverless functions

### Environment Variables Security
- Never commit `.env` files to your repository
- Use Vercel's environment variable system for production secrets
- Client-side environment variables must be prefixed with `VITE_`

## Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Errors
- Check function logs in Vercel dashboard
- Verify environment variables are set correctly
- Ensure database connection string is correct

### CORS Issues
- Your API should already handle CORS with the `cors` package
- If issues persist, check the CORS configuration in your API

## Automatic Deployments
- Vercel automatically deploys when you push to your main branch
- You can configure deployment branches in project settings
- Preview deployments are created for pull requests

## Performance Optimization
- Vercel automatically optimizes your static assets
- Consider implementing caching strategies for API responses
- Use Vercel Analytics to monitor performance

## Support
- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions