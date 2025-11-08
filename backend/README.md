# Backend Setup

## Environment Variables

Kreirajte `.env` fajl u ovom folderu sa sledećim sadržajem:

```env
# Admin Credentials - PROMENITE OVE VREDNOSTI!
ADMIN_USERNAME=deltaadmin
ADMIN_PASSWORD=nimdaatled123!

# Server Configuration
PORT=3000
NODE_ENV=production

# Session Secret (generišite random string - minimum 32 karaktera)
SESSION_SECRET=your-random-secret-key-here-minimum-32-characters
```

**⚠️ VAŽNO:**

- Promenite `ADMIN_USERNAME` i `ADMIN_PASSWORD` na sigurne vrednosti
- Generišite random `SESSION_SECRET` (možete koristiti: https://randomkeygen.com/)
- **NIKADA** ne commit-ujte `.env` fajl u Git!

## Instalacija

```bash
npm install
```

## Pokretanje

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## Generisanje Password Hash-a

Za još bolju sigurnost, možete generisati bcrypt hash za lozinku:

```bash
node generate-password-hash.js "your-password"
```

ili

```bash
node generate-password-hash.js
# Unesite lozinku kada se zatraži
```
