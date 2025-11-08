# Delta Tools Vue Website

A complete Vue 3 website for Delta Tools with admin panel for product management.

## Features

- **Public Website**: Home page, Products (Alati), Premazi pages
- **Admin Panel**: Secure login and product management
- **Responsive Design**: Works on all devices
- **Theme Toggle**: Dark/Light mode
- **Product Management**: Add, edit, delete products for both Alati and Premazi

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Backend Server

First, install backend dependencies:

```bash
cd backend
npm install
```

Then start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### 3. Start the Vue Development Server

In a new terminal:

```bash
npm run dev
```

The Vue app will run on `http://localhost:5173`

## Accessing the Website

### Public Pages

- **Home**: `http://localhost:5173/`
- **Products (Alati)**: `http://localhost:5173/products`
- **Premazi**: `http://localhost:5173/premazi`

### Admin Panel

- **Admin Login**: `http://localhost:5173/admin/login`
- **Admin Dashboard**: `http://localhost:5173/admin/dashboard`

### Admin Credentials

- **Username**: `deltaadmin`
- **Password**: `nimdaatled123!`

## Project Structure

```
src/
├── views/
│   ├── Home.vue          # Main website homepage
│   ├── Products.vue      # Alati products page
│   ├── Premazi.vue       # Premazi products page
│   ├── Login.vue         # Admin login
│   └── Dashboard.vue     # Admin dashboard
├── stores/
│   ├── auth.js          # Authentication state
│   └── products.js      # Products state management
├── services/
│   └── api.js           # API service
├── router/
│   └── index.js         # Vue Router configuration
└── App.vue              # Main app component
```

## API Endpoints

The backend provides these endpoints:

- `GET /api/products` - Get all products
- `POST /api/products` - Add new product
- `DELETE /api/products/:type/:id` - Delete product
- `POST /api/login` - Admin login
- `POST /api/logout` - Admin logout

## Development

- **Frontend**: Vue 3 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios

## Building for Production

```bash
npm run build
```

This will create a `dist` folder with the production-ready files.
