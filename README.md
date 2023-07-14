To run

Start the frontend
```
cd frontend
yarn
yarn run dev
```

Start the backend 
```
cd backend
yarn
yarn run dev
```

# Reproduction

To reproduce issue where after a timeout without connecting to backend for a specific document, the hocuspocus provider ends up in a bad state.
1. Visit http://localhost:3000/other.  Must be directly, don't visit / first.
2. Wait 3 seconds (the backend has been configured with timeout 3000).
3. Click the in page "Nav" link.
4. Websocket should now be in a bad state, any data entered won't be persisted.
