# 🚀 ChessApp Backend - Quick Deployment Guide

## 📋 Setup Status
✅ **Everything is configured!** Your backend is ready to deploy.

---

## 🔄 Regular Deployment Workflow

After making code changes to your backend, follow these steps:

### 1️⃣ Test Locally (Optional but Recommended)

```bash
cd /Users/karan.aulakh/personal/ChessApp/backend

# Build & run Docker container
docker build -t chess-backend .
docker run -p 5001:5000 chess-backend

# In a new terminal, test your changes
curl http://localhost:5001/
curl -X POST http://localhost:5001/new-game

# Stop container when done: Ctrl+C or docker stop $(docker ps -q)
```

### 2️⃣ Commit & Push to GitHub

```bash
cd /Users/karan.aulakh/personal/ChessApp

# Check what changed
git status

# Add your changes
git add backend/
git add frontend/  # if you changed frontend too

# Commit with a descriptive message
git commit -m "Your commit message here"

# Push to GitHub
git push origin main
```

### 3️⃣ Railway Auto-Deploys ✨

**That's it!** Railway automatically:
- Detects your push to GitHub
- Rebuilds your Docker image
- Deploys the new version
- Takes ~2-5 minutes

**Monitor deployment:**
1. Go to https://railway.app/dashboard
2. Click your project
3. Watch the "Deployments" tab
4. Wait for green "Success" status

### 4️⃣ Test Your Deployed Backend

```bash
# Replace with your actual Railway URL
curl https://your-app-name.up.railway.app/
curl -X POST https://your-app-name.up.railway.app/new-game
```

---

## ⚡ Quick Commands Reference

### Test Locally
```bash
cd backend
docker build -t chess-backend . && docker run -p 5001:5000 chess-backend
```

### Deploy
```bash
git add .
git commit -m "Your changes"
git push origin main
```

### View Railway Logs
```bash
railway logs --follow
```

---

## 🔧 Common Scenarios

### Made Backend Changes Only
```bash
cd /Users/karan.aulakh/personal/ChessApp
git add backend/
git commit -m "Update backend logic"
git push origin main
# Railway redeploys automatically
```

### Made Frontend Changes Only
```bash
cd /Users/karan.aulakh/personal/ChessApp
git add frontend/
git commit -m "Update frontend UI"
git push origin main
# Redeploy your frontend (Vercel/Netlify auto-deploys too)
```

### Made Changes to Both
```bash
cd /Users/karan.aulakh/personal/ChessApp
git add .
git commit -m "Update backend API and frontend"
git push origin main
# Both Railway and frontend host redeploy
```

---

## 🐛 Quick Troubleshooting

### Port 5000 Already in Use (Local Testing)
```bash
# Use port 5001 instead
docker run -p 5001:5000 chess-backend
# Test at http://localhost:5001/
```

### Railway Deployment Failed
1. Check Railway logs in dashboard
2. Look for errors in build or deploy phase
3. Common fixes:
   - Verify `backend/Dockerfile` exists
   - Check "Root Directory" is set to `backend` in Railway settings
   - Ensure `requirements.txt` has all dependencies

### Container Won't Start Locally
```bash
# Check for running containers
docker ps

# Stop all containers
docker stop $(docker ps -q)

# Remove old images if needed
docker image prune
```

### Frontend Can't Connect to Backend
- Verify backend is running: `curl https://your-railway-url/`
- Check CORS settings in `backend/src/main.py`
- Verify frontend `.env.production` has correct Railway URL

---

## 📝 Your API Endpoints

- `GET /` - Home page
- `GET /play` - Play page  
- `POST /new-game` - Start new game
- `GET /get-possible-moves?square=<square>` - Get legal moves
- `POST /make-move` - Make a move (body: `{"start": "e2", "end": "e4"}`)
- `GET /get-piece-positions` - Get board state

---

## 🎯 Your Backend Files

```
backend/
├── Dockerfile              ✅ Production-ready
├── .dockerignore          ✅ Optimized builds
├── requirements.txt       ✅ Has Flask, Flask-Cors, gunicorn
└── src/
    ├── main.py            ✅ Uses PORT env variable
    └── gameplay/          ✅ Chess logic
```

---

## 🔗 Important URLs

- **Railway Dashboard:** https://railway.app/dashboard
- **Your Backend:** `https://your-app-name.up.railway.app`
- **Frontend API Config:** `frontend/src/utils/apiService.js`

---

## 💡 Pro Tips

### Skip Local Testing (Faster)
If you're confident in your changes:
```bash
git add . && git commit -m "Quick fix" && git push
# Railway deploys in ~2-5 minutes
```

### Test Backend with Frontend Locally
```bash
# Terminal 1: Run backend in Docker
cd backend && docker run -p 5001:5000 chess-backend

# Terminal 2: Run frontend (update apiService.js to localhost:5001)
cd frontend && npm run serve

# Play chess at http://localhost:8080
```

### View Railway Logs
Install Railway CLI:
```bash
npm i -g @railway/cli
railway login
cd backend
railway logs
```

### Roll Back a Deployment
In Railway dashboard:
1. Go to "Deployments" tab
2. Find the previous working deployment
3. Click "..." menu → "Redeploy"

---

## 🔐 Production CORS Settings

Once your frontend is deployed, update `backend/src/main.py`:

```python
CORS(app, resources={r"/*":{
    'origins': [
        'http://localhost:8080',           # Local dev
        'https://your-frontend.vercel.app' # Production frontend
    ]
}}, supports_credentials=True)
```

Then commit and push to redeploy.

---

## ✅ Deployment Checklist (First Time Only)

Only need to do this once:

```
✅ Docker installed and running
✅ Backend code pushed to GitHub  
✅ Railway project created
✅ Railway connected to GitHub repo
✅ Root directory set to 'backend' in Railway
✅ Railway domain generated
✅ Frontend .env.production has Railway URL
```

---

## 🆘 Need Help?

- **Railway logs:** Check dashboard → Deployments → Click deployment → View logs
- **Railway docs:** https://docs.railway.app
- **Docker issues:** Make sure Docker Desktop is running

---

**That's it! Your deployment workflow is:**
1. Make changes
2. `git push`
3. Railway auto-deploys
4. Done! 🎉

---

*Simplified guide - Updated Nov 23, 2025*
