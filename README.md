# LinkGhosta

Production-ready MERN scaffold for the LinkGhosta website and admin application.

## Technology Stack

- Frontend: React, Vite, JavaScript, Tailwind CSS, React Router DOM, Axios, Lucide React, React Hot Toast
- Backend: Node.js, Express.js, MongoDB, Mongoose, JSON Web Token, bcryptjs, Cloudinary, Multer, Resend, dotenv, cors, cookie-parser, express-rate-limit, helmet, morgan

## Folder Structure

```text
linkghosta/
├── frontend/
├── backend/
├── .gitignore
├── package.json
└── README.md
```

## Installation

```bash
npm install
npm run install-all
```

## Environment Setup

Create local environment files from the examples:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Configure the backend values before using database, authentication, media, or email features.

## Development Commands

```bash
npm run dev
npm run client
npm run server
npm run build
npm start
```

## Local URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API health check: http://localhost:5000/api/health
