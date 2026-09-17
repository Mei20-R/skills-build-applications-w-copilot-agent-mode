# OctoFit Tracker frontend

The presentation tier runs on Vite port `5173` and uses the Node API on port `8000`.

## API environment

When running in GitHub Codespaces, define `VITE_CODESPACE_NAME` in `.env.local` with the Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes this value through `import.meta.env.VITE_CODESPACE_NAME`. The frontend builds its API URL as `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`. When the variable is unset, it safely falls back to `http://localhost:8000/api` for local development.

Restart the Vite dev server after changing `.env.local`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
