# Apeiron — Frontend

This is the frontend repository for the **Apeiron** project — an application that helps build eco-awareness in children by teaching them about recycling and the responsible use of secondary raw materials. Through an interactive and kid-friendly interface, Apeiron makes sorting waste, learning about reusable materials, and adopting sustainable habits engaging and accessible for young users.

## Tech Stack

- **[Angular](https://angular.dev/) 21** — main framework
- **TypeScript 5.9** — primary language
- **SCSS** — styling
- **[NgRx](https://ngrx.io/)** — state management (Store, Effects, Entity, Router Store)
- **[@ngx-translate](https://github.com/ngx-translate/core)** — internationalization (i18n)
- **[ngx-toastr](https://github.com/scttcper/ngx-toastr)** — toast notifications
- **RxJS** — reactive programming
- **Angular Service Worker** — PWA support
- **Vitest** — unit testing
- **Docker / Nginx** — containerization and serving in production

## What We Did

We built the user-facing part of Apeiron, including:

- A modular Angular architecture with feature-based structure
- Centralized state management using NgRx (store, effects, entity, router-store)
- Multi-language support via `@ngx-translate`
- A PWA-ready setup with the Angular service worker
- Integration with the Apeiron backend (NestJS + Gemini API) for AI-powered educational content
- Production-ready Docker and Nginx configuration for deployment

## Getting Started

### Prerequisites

- **Node.js** (LTS version recommended)
- **npm** 10.9.3 or compatible

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Infomatrix-Apeiron/INFOMATRIX2026.git
cd INFOMATRIX2026
npm install
```

### Run the Development Server

```bash
npm start
```

The app will be available at `http://localhost:4200/` and will automatically reload on file changes.

To expose the dev server on your local network:

```bash
npm run startLocalhost
```

### Build

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Run Tests

```bash
npm test
```

### Run with Docker

The project includes a `Dockerfile` and `docker-compose.yml`. To run the app in a container:

```bash
docker-compose up --build
```
