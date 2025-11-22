# Vodič za Ažuriranje Vercel Aplikacije sa MongoDB

## 📋 Preduvjeti

1. Ažurirani kod sa MongoDB integracijom
2. MongoDB baza podataka (MongoDB Atlas ili lokalna)
3. Vercel account i pristup projektu

## 🔧 Korak 1: Postavite MongoDB Connection String

### Ako koristite MongoDB Atlas:

1. Idite na [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Kreirajte novi cluster ili koristite postojeći
3. Kliknite na "Connect" → "Connect your application"
4. Kopirajte connection string (izgleda ovako: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)

### Ako koristite lokalnu MongoDB:

Connection string će biti: `mongodb://localhost:27017/deltatools`

## 🚀 Korak 2: Ažurirajte Environment Variables na Vercel

1. **Idite na Vercel Dashboard:**

   - Otvorite [vercel.com](https://vercel.com)
   - Prijavite se i odaberite vaš projekt

2. **Dodajte/Update Environment Variables:**

   - Kliknite na **Settings** → **Environment Variables**
   - Dodajte ili ažurirajte sljedeće varijable:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/deltatools?retryWrites=true&w=majority
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_secure_password
   NODE_ENV=production
   ```

   **⚠️ VAŽNO:**

   - Zamijenite `username`, `password`, i `cluster` sa vašim stvarnim MongoDB podacima
   - Koristite jaku lozinku za `ADMIN_PASSWORD`
   - `MONGODB_URI` mora biti potpuna connection string sa bazom podataka

3. **Primijenite promjene:**
   - Nakon dodavanja varijabli, kliknite **Save**
   - Vercel će automatski pokrenuti novi deployment

## 📦 Korak 3: Ažurirajte vercel.json (ako je potrebno)

Provjerite da vaš `vercel.json` ima ispravnu konfiguraciju:

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "dist",
  "installCommand": "cd backend && npm install && cd ../frontend && npm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🔄 Korak 4: Deploy Ažuriranog Koda

### Opcija A: Preko GitHub (Preporučeno)

1. **Commit i push promjene:**

   ```bash
   git add .
   git commit -m "Add MongoDB integration and delete category functionality"
   git push origin main
   ```

2. **Vercel će automatski:**

   - Detektovati promjene
   - Pokrenuti novi build
   - Deploy-ati novu verziju

3. **Provjerite deployment:**
   - Idite na Vercel Dashboard → **Deployments**
   - Čekajte da se build završi (obično 2-5 minuta)
   - Kliknite na deployment da vidite logove

### Opcija B: Preko Vercel CLI

1. **Instaliraj Vercel CLI (ako već nije instaliran):**

   ```bash
   npm i -g vercel
   ```

2. **Login:**

   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

## ✅ Korak 5: Provjera da li sve radi

1. **Provjerite da li je aplikacija dostupna:**

   - Otvorite URL vaše Vercel aplikacije
   - Provjerite da li se stranica učitava

2. **Testirajte MongoDB konekciju:**

   - Prijavite se na admin dashboard
   - Pokušajte dodati novi proizvod
   - Pokušajte dodati novu kategoriju
   - Provjerite da li se podaci spremaju u MongoDB

3. **Provjerite logove:**
   - U Vercel Dashboard → **Deployments** → kliknite na najnoviji deployment
   - Kliknite na **Functions** tab
   - Provjerite da li vidite "✅ MongoDB connected successfully" u logovima

## 🐛 Troubleshooting

### Problem: "MongoDB connection error"

**Rješenje:**

- Provjerite da li je `MONGODB_URI` ispravno postavljen u Environment Variables
- Provjerite da li MongoDB Atlas dozvoljava konekcije sa svih IP adresa (Network Access)
- Provjerite da li su username i password ispravni

### Problem: "Internal server error" pri dodavanju proizvoda

**Rješenje:**

- Provjerite logove u Vercel Dashboard
- Provjerite da li su sve environment variables postavljene
- Provjerite da li MongoDB baza ima ispravnu strukturu

### Problem: Build ne uspijeva

**Rješenje:**

- Provjerite da li su sve dependencies instalirane
- Provjerite `package.json` fajlove u `backend/` i `frontend/` folderima
- Provjerite build logove u Vercel Dashboard

## 📝 Napomene

- **Prvi deployment** može potrajati duže (5-10 minuta) jer Vercel instalira sve dependencies
- **Environment Variables** se primjenjuju samo na novi deployment, tako da možda trebate ručno pokrenuti redeploy
- **MongoDB Atlas** ima besplatni tier (M0) koji je dovoljan za početak
- **Sigurnost**: Nikada ne commit-ujte `.env` fajlove ili connection stringove u Git

## 🔐 Sigurnosne Preporuke

1. Koristite jaku lozinku za MongoDB
2. Koristite jaku lozinku za admin panel
3. Ograničite MongoDB Network Access samo na Vercel IP adrese (ako je moguće)
4. Redovno ažurirajte dependencies
5. Koristite MongoDB Atlas za production (ne lokalnu MongoDB)

## 📞 Dodatna Pomoć

Ako imate problema:

1. Provjerite Vercel logove
2. Provjerite MongoDB Atlas logove
3. Provjerite da li su svi environment variables postavljeni
4. Provjerite da li je kod ispravno commit-ovan i push-ovan
