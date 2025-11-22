# Delta Tools - Web Aplikacija

Kompletna web aplikacija za Delta Tools sa admin panelom za upravljanje proizvodima.

## 📁 Struktura Projekta

```
deltatools2/
├── backend/          # Node.js/Express backend server
│   ├── server.js     # Glavni server fajl
│   ├── package.json  # Backend dependencies
│   └── gradjevinski_alat.json  # Baza podataka proizvoda
├── frontend/         # Vue 3 frontend aplikacija
│   ├── src/          # Vue komponente i logika
│   ├── package.json  # Frontend dependencies
│   └── vite.config.js # Vite konfiguracija
├── dist/             # Build output (generiše se pri build-u)
├── .gitignore        # Git ignore fajl
├── vercel.json       # Vercel deployment konfiguracija
└── README.md         # Ovaj fajl
```

## 🚀 Lokalni Development

### Preduvjeti

- Node.js (v16 ili noviji)
- npm ili yarn

### Instalacija

1. **Instaliraj backend dependencies:**

```bash
cd backend
npm install
```

2. **Kreiraj `.env` fajl u `backend/` folderu:**

```env
ADMIN_USERNAME=deltaadmin
ADMIN_PASSWORD=nimdaatled123!
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/deltatools
```

**Za MongoDB Atlas:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/deltatools?retryWrites=true&w=majority
```

3. **Instaliraj frontend dependencies:**

```bash
cd ../frontend
npm install
```

### Pokretanje

1. **Pokreni backend server:**

```bash
cd backend
npm run dev
```

Backend će raditi na `http://localhost:3000`

2. **Pokreni frontend development server (u novom terminalu):**

```bash
cd frontend
npm run dev
```

Frontend će raditi na `http://localhost:5173`

## 🏗️ Build za Production

### Frontend Build

```bash
cd frontend
npm run build
```

Build će kreirati `dist/` folder u root direktoriju projekta.

### Backend Production

```bash
cd backend
npm start
```

## 📦 Deployment na Vercel

### Preko Vercel CLI

1. **Instaliraj Vercel CLI:**

```bash
npm i -g vercel
```

2. **Login u Vercel:**

```bash
vercel login
```

3. **Deploy:**

```bash
vercel
```

### Preko GitHub

1. **Push kod na GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Poveži GitHub repo sa Vercel:**
   - Idi na [vercel.com](https://vercel.com)
   - Klikni "New Project"
   - Importuj GitHub repo
   - Vercel će automatski detektovati konfiguraciju iz `vercel.json`

### Environment Variables na Vercel

Nakon deployment-a, dodaj environment variables u Vercel dashboard:

1. Idi na Project Settings → Environment Variables
2. Dodaj sledeće varijable:
   - `MONGODB_URI` - MongoDB connection string (npr. `mongodb+srv://username:password@cluster.mongodb.net/deltatools?retryWrites=true&w=majority`)
   - `ADMIN_USERNAME` - Admin korisničko ime (npr. `deltaadmin`)
   - `ADMIN_PASSWORD` - Admin lozinka (koristi jaku lozinku!)
   - `NODE_ENV` - `production`
   - `PORT` - (opciono, Vercel automatski postavlja)

**Detaljne upute za deployment:** Pogledajte `VERCEL_DEPLOYMENT.md`

**⚠️ VAŽNO:** Promijenite admin credentials prije deployment-a!

## 🔧 Konfiguracija

### Backend API Endpoints

- `GET /api/products` - Dohvati sve proizvode (javno)
- `GET /api/admin/products` - Dohvati sve proizvode (zahtijeva autentifikaciju)
- `POST /api/products` - Dodaj novi proizvod (zahtijeva autentifikaciju)
- `DELETE /api/products/:type/:productId` - Obriši proizvod (zahtijeva autentifikaciju)
- `POST /api/categories/main` - Dodaj glavnu kategoriju (zahtijeva autentifikaciju)
- `DELETE /api/categories/main/:categoryKey` - Obriši glavnu kategoriju (zahtijeva autentifikaciju)
- `POST /api/categories/alati` - Dodaj podkategoriju (zahtijeva autentifikaciju)
- `DELETE /api/categories/alati/:mainCategoryKey/:categoryIndex` - Obriši podkategoriju (zahtijeva autentifikaciju)
- `POST /api/login` - Admin login
- `POST /api/logout` - Admin logout
- `GET /api/health` - Health check

### Frontend Routes

- `/` - Početna stranica
- `/products` - Stranica sa alatima
- `/premazi` - Stranica sa premazima
- `/login` - Admin login stranica
- `/dashboard` - Admin dashboard (zahtijeva autentifikaciju)

## 🛠️ Tehnologije

### Frontend

- Vue 3
- Vue Router
- Pinia (state management)
- Tailwind CSS
- Vite
- Axios

### Backend

- Node.js
- Express
- MongoDB / Mongoose
- CORS
- bcrypt (za hash lozinki)
- express-rate-limit (za zaštitu od brute force napada)

## 📝 Napomene

- **Sigurnost**: Promijenite admin credentials prije deployment-a!
- **Environment Variables**: Nikada ne commit-ujte `.env` fajlove!
- **Build Output**: `dist/` folder se generiše pri build-u i ne treba ga commit-ovati.

## 📄 License

MIT
