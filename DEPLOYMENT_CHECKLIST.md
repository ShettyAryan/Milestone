# Deployment Checklist

Use this checklist to ensure everything is set up correctly before and after deployment.

## Pre-Deployment

### Code Preparation
- [ ] Code is pushed to GitHub repository
- [ ] All local changes are committed
- [ ] `.env` files are NOT committed (check `.gitignore`)
- [ ] `service-account.json` is NOT committed (check `.gitignore`)

### Testing
- [ ] Frontend builds successfully: `cd frontend && npm run build`
- [ ] Backend starts successfully: `cd server && npm start`
- [ ] Local testing works (booking flow, calendar, sheets)
- [ ] All environment variables are documented

### Google Services
- [ ] Service account JSON file is ready
- [ ] Service account has access to Google Calendar
- [ ] Service account has access to Google Sheets
- [ ] Calendar ID is noted
- [ ] Sheet ID is noted
- [ ] EmailJS is configured (if using)

---

## Frontend Deployment (Vercel)

### Setup
- [ ] Created Vercel account
- [ ] Connected GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Set build command to `npm run build`
- [ ] Set output directory to `dist`

### Environment Variables
- [ ] `VITE_API_BASE_URL` (will update after backend is deployed)
- [ ] `VITE_EMAILJS_SERVICE_ID`
- [ ] `VITE_EMAILJS_TEMPLATE_ID`
- [ ] `VITE_EMAILJS_PUBLIC_KEY`

### Post-Deployment
- [ ] Frontend URL is accessible
- [ ] Frontend loads without errors
- [ ] Navigation works
- [ ] All pages are accessible

---

## Backend Deployment (Railway/Render)

### Setup
- [ ] Created Railway/Render account
- [ ] Connected GitHub repository
- [ ] Set root directory to `server`
- [ ] Set start command to `npm start`

### Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `PORT` (usually auto-set by platform)
- [ ] `FRONTEND_URL` (your Vercel URL)
- [ ] `GOOGLE_SERVICE_ACCOUNT_JSON` (entire JSON as single line)
- [ ] `GOOGLE_CALENDAR_ID`
- [ ] `GOOGLE_SHEET_ID`

### Post-Deployment
- [ ] Backend URL is accessible
- [ ] Health check works: `https://your-backend-url/health`
- [ ] Backend logs show no errors
- [ ] CORS is configured correctly

---

## Integration Testing

### Frontend-Backend Connection
- [ ] Updated `VITE_API_BASE_URL` in Vercel with backend URL
- [ ] Redeployed frontend after updating env vars
- [ ] Frontend can reach backend API
- [ ] No CORS errors in browser console

### Booking Flow
- [ ] Can access `/book-appointment` page
- [ ] Form validation works
- [ ] Date picker works
- [ ] Time slot selector works
- [ ] Can submit booking
- [ ] Booking confirmation page displays

### Google Services
- [ ] Calendar event is created successfully
- [ ] Event appears in Google Calendar
- [ ] Data is appended to Google Sheets
- [ ] Sheet headers are correct
- [ ] All columns are populated

### Email (if configured)
- [ ] Confirmation email is sent
- [ ] Email template displays correctly
- [ ] Email contains all booking details

---

## Post-Deployment

### Monitoring
- [ ] Check Vercel deployment logs (no errors)
- [ ] Check Railway/Render deployment logs (no errors)
- [ ] Monitor error rates
- [ ] Check API response times

### Security
- [ ] All environment variables are set (not hardcoded)
- [ ] Service account JSON is secure
- [ ] CORS is limited to frontend domain
- [ ] Rate limiting is active
- [ ] HTTPS is enabled (automatic with Vercel/Railway)

### Documentation
- [ ] Documented all environment variables
- [ ] Noted all URLs (frontend, backend)
- [ ] Saved service account email for reference
- [ ] Documented any custom configurations

---

## Troubleshooting Checklist

If something doesn't work:

### Backend Issues
- [ ] Check Railway/Render logs
- [ ] Verify all environment variables are set
- [ ] Test health endpoint manually
- [ ] Check service account JSON format (single line)
- [ ] Verify Calendar/Sheet IDs are correct
- [ ] Check service account permissions

### Frontend Issues
- [ ] Check Vercel deployment logs
- [ ] Verify environment variables start with `VITE_`
- [ ] Check browser console for errors
- [ ] Verify `VITE_API_BASE_URL` is correct
- [ ] Ensure frontend was redeployed after env var changes

### Integration Issues
- [ ] Check CORS configuration
- [ ] Verify `FRONTEND_URL` matches Vercel URL exactly
- [ ] Test API endpoints directly (using Postman/curl)
- [ ] Check network tab in browser DevTools
- [ ] Verify backend is running (check health endpoint)

---

## Success Criteria

Your deployment is successful when:
- ✅ Frontend is accessible and loads correctly
- ✅ Backend health check returns success
- ✅ Can complete full booking flow
- ✅ Calendar events are created
- ✅ Data is saved to Google Sheets
- ✅ No console errors
- ✅ No CORS errors
- ✅ All pages are accessible

---

## Quick Reference

### Frontend URL
```
https://your-app.vercel.app
```

### Backend URL
```
https://your-app.railway.app
```

### Health Check
```
https://your-app.railway.app/health
```

### Booking Page
```
https://your-app.vercel.app/book-appointment
```

---

**Last Updated:** After deployment
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

