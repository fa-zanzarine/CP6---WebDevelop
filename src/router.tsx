import { lazy } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import RouteErrorPage from '@/pages/RouteErrorPage'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

// Divisão por rota: cada página (e o dashboard inteiro) vira um chunk separado
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projetos', element: <ProjectsPage /> },
      { path: 'projetos/:name', element: <ProjectDetailPage /> },
      { path: 'contato', element: <ContactPage /> },
      { path: 'login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: 'dashboard', element: <DashboardPage /> }],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const createRouter = () => createBrowserRouter(routes)
