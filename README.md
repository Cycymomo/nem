# nem

Kickstart your project with Next.js, Express and MySQL

## TODO

- in both `backend` + `frontend` directories: create `.env` file (based on `.env.example` file) and update with your infos
- delete `.env.example` file
- create your database using the query suggested in `database.js` file
- change the favicos in `frontend/public` directory
- replace "TOFIX" in the code base with your infos

## Develop

Use `nvm` to easy change the right Node.js version

First time:

- nvm install
- in `backend` + `frontend` directories: `npm install`

Each time:

- open `backend` directory
- launch `nvm use` and `npm run dev`
- open `frontend` directory
- launch `nvm use` and `npm run dev`

- go to localhost:3000 to see your welcome page

## Release

You can use nginx + pm2

### Configure your backend

- Use nginx to reverse proxy
- `localhost:3000` (the frontend) to your-domain.fr
- `localhost:3001` (the backend API) to your-domain.fr/api
- TODO (add doc here)

### Release backend

- in `backend` directory
- replace `.env` infos
- pm2 stop `your-project-back`
- git pull
- pm2 start `your-project-back`

### Release frontend

- in `frontend` directory
- replace `.env` infos
- pm2 stop `your-project-front`
- git pull
- cd frontend
- npm run build
- pm2 start `your-project-front`
