import '../src/assets/tailwind.css'
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from './pages/login/page'
import WizardPage from './pages/wizard/page'
import { useUserContext } from './lib/context/UserContext'
import DashboardPage from './pages/dashboard/page'
import ROUTES from './lib/consts/routes'

export default function Router() {
    const { user } = useUserContext()
    return (
        <HashRouter>
            <Routes>
                <Route path={ROUTES.DASHBOARD} element={user != null ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />}>
                    <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                </Route>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.WIZARD} element={<WizardPage />} />
            </Routes>
        </HashRouter>
    )
}
