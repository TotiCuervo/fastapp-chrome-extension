import '../src/assets/tailwind.css'
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from './pages/login/page'
import WizardPage from './pages/wizard/page'
import { useUserContext } from './lib/context/UserContext'
import DashboardPage from './pages/dashboard/page'

export default function Router() {
    const { user } = useUserContext()
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={user != null ? <Outlet /> : <Navigate to="/login" />}>
                    <Route path="/" element={<DashboardPage />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/wizard" element={<WizardPage />} />
            </Routes>
        </HashRouter>
    )
}
