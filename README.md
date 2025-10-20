# Linktine

Linktine is a modern **link management platform** that helps you organize, tag, share, and access your links efficiently. It provides both a **REST API** backend and a **Next.js frontend** with a clean UI for managing collections and favorites.

---

## ✨ Features

- 📚 **Collections**
  - Create, update, and delete collections
  - Nested collections support
  - Assign colors for better organization

- 🔗 **Links**
  - Add, edit, and remove links
  - Metadata fetching (titles, previews, etc.)
  - Organize links under collections

- 🏷️ **Tags**
  - Create and assign tags to links
  - Color-coded tags for clarity

- 📊 **Dashboard**
  - Quick overview of your collections and links

- 🤝 **Sharing**
  - Share collections or individual links securely
  - Public/Private share modes

- ⭐ **Favorites**
  - Mark links or collections as favorites for quick access

---

## 🛠 Tech Stack

### Backend (API)
- **Node.js + Express**
- **Prisma** ORM with PostgreSQL (or other SQL databases)
- **TypeScript**
- **JWT Authentication**

### Frontend (Web)
- **Next.js 13+ (App Router, Turbopack)**
- **TypeScript**
- **Zustand** for state management
- **Ky** as HTTP client

---

## 📂 Project Structure

```
linktine/
├── api                 # Backend (Express + Prisma)
│   ├── prisma          # Database schema & migrations
│   ├── src             # Main API source code
│   │   ├── config      # Config parser
│   │   ├── controllers # Request handlers
│   │   ├── db          # Db loader
│   │   ├── middlewares # Auth, error handling, validation
│   │   ├── routes      # Express routes
│   │   ├── services    # Business logic
│   │   ├── utils       # Utility (jwt)
│   │   └── validators  # Input validation schemas
│   └── bruno           # API collection for testing (Bruno client)
├── web                 # Frontend (Next.js)
│   ├── src
│   │   ├── app         # App Router pages
│   │   ├── components  # Reusable UI components
│   │   ├── hooks       # React hooks
│   │   ├── models      # Models
│   │   ├── services    # Api services
│   │   ├── stores      # Zustand stores
│   │   └── utils       # Helpers (HTTP client, color utils)
│   └── middleware.ts   # Auth middleware
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bernagit/linktine.git
cd linktine
```

---

### 2. Backend Setup (`api/`)

#### Install dependencies
```bash
cd api
npm install
```

#### Environment variables
Create a `.env` file inside `api/`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/linktine"
JWT_SECRET="your-secret-key"
PORT=4000
JWT_EXPIRES_IN=36000
NODE_ENV=development
BASE_URL=http://localhost:4000
DISABLE_SIGNUP=false
```

#### Run migrations & seed database
```bash
npm run prisma:migrate
npm run seed
```

#### Start development server
```bash
npm run dev
```

Backend runs on **http://localhost:4000**

---

### 3. Frontend Setup (`web/`)

#### Install dependencies
```bash
cd ../web
npm install
```

#### Environment variables
Create a `.env.local` file inside `web/`:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

#### Start development server
```bash
npm run dev
```

Frontend runs on **http://localhost:3000**

---

## 📌 Useful Scripts

### Backend
- `npm run dev` → Start dev server with hot reload
- `npm run build` → Compile TypeScript
- `npm start` → Run compiled server
- `npm run prisma:migrate` → Run Prisma migrations
- `npm run prisma:studio` → Open Prisma Studio
- `npm run seed` → Seed database

### Frontend
- `npm run dev` → Start Next.js with Turbopack
- `npm run build` → Build for production
- `npm start` → Start production server
- `npm run lint` → Run ESLint
- `npm run format` → Format codebase with Prettier

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "add feature"`)
4. Push to branch (`git push origin feature-name`)
5. Open a Pull Request
