# Backend Deployment

### Testing changes locally 

```bash
cd /Users/karan.aulakh/personal/ChessApp/backend

# Build & run Docker container
docker build -t chess-backend .
docker run -p 5001:5000 chess-backend

# In a new terminal, test your changes
curl http://localhost:5001/
curl http://localhost:5001/play
curl -X POST http://localhost:5001/new-game

```

### Pushing changes
- Simply push changes, railway auto-deploys
- https://railway.app/dashboard (might take 2-5 minutes to redeploy)
- Then you can test with actual server URL

```bash
# Replace with your actual Railway URL
curl https://your-app-name.up.railway.app/
curl -X POST https://your-app-name.up.railway.app/new-game
```