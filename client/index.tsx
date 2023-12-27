import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './components/App.tsx'
import AdminForm from './components/AdminForm.tsx'
import { routes } from './routes.tsx'
const queryClient = new QueryClient()
const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(
    <Auth0Provider
      domain="roa-2023-ton.au.auth0.com"
      clientId="XZ3lLtyt3ZZnxZKUKtZRQIJZio6woXRT"
      redirectUri={window.location.origin}
      audience="https://products/api"
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>
  )

