# Prescripto (Frontend)

Web client for **Prescripto**, a doctor discovery and appointment booking experience. This app talks to a backend API, supports authenticated areas (profile, appointments), and loads Razorpay checkout for payments.

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vite.dev/) for dev server and production builds
- [React Router 7](https://reactrouter.com/) for routing
- [Tailwind CSS 3](https://tailwindcss.com/) for styling
- [Axios](https://axios-http.com/) for HTTP, [Zod](https://zod.dev/) for environment validation, [react-toastify](https://fkhadra.github.io/react-toastify/) for notifications

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended; includes npm)

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Create a `.env` file in the project root (same folder as `package.json`). All app variables use the `VITE_APP_` prefix so Vite exposes them to the client.

   ```env
   VITE_APP_API_URL=https://your-api.example.com
   VITE_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

   - `VITE_APP_API_URL` — Base URL of the Prescripto backend (no trailing slash required; the client uses it as Axios `baseURL`).
   - `VITE_APP_RAZORPAY_KEY_ID` — Razorpay key used with the checkout script loaded from `index.html`.

   If either value is missing or invalid, the app throws at startup when reading `src/config/env.ts`.

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start Vite dev server with hot reload            |
| `npm run build`   | Typecheck (`tsc -b`) then production build       |
| `npm run preview` | Serve the production build locally               |
| `npm run lint`    | Run ESLint on the project                        |

## App routes (overview)

| Path                    | Notes                                      |
| ----------------------- | ------------------------------------------ |
| `/`                     | Home                                       |
| `/about`, `/contact`    | Static pages                               |
| `/login`                | Authentication                             |
| `/doctors`              | Doctor listing                             |
| `/doctors/:specialty`   | Doctors filtered by specialty              |
| `/appointment/:docId`   | Book an appointment for a doctor           |
| `/my-profile`           | Protected — user profile                   |
| `/my-appointments`      | Protected — user’s appointments            |

Protected routes use `src/components/ProtectedRoute.tsx` and expect a JWT in `localStorage` under the key `userToken` (sent as `Authorization: Bearer` via `src/lib/api-client.ts`).

## Project layout

```
src/
  components/     # UI pieces (Navbar, Footer, banners, etc.)
  config/         # Typed env (`env.ts`)
  context/        # React context (e.g. app-wide state)
  lib/            # API client (Axios instance + interceptors)
  pages/          # Route-level screens
  assets/         # Static asset references
```

## Production build

```bash
npm run build
```

Output is written to `dist/`. Serve that folder with any static host or reverse proxy, ensuring the same environment variables are available at **build time** for Vite (they are inlined into the bundle).

## License

This project is licensed under the [MIT License](LICENSE). You may use, copy, modify, and distribute the code with minimal restrictions; see the license file for the full text.

The copyright line in `LICENSE` uses the project name; replace it with your legal name or organization if you prefer.
