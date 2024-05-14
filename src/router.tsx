import '../src/assets/tailwind.css'
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from './pages/login/page'
import { useUserContext } from './lib/context/UserContext'
import DashboardPage from './pages/dashboard/page'

export default function Router() {
    const { user } = useUserContext()
    console.log('hit!')
    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/"
                    element={<DashboardPage />}
                />
            </Routes>
        </HashRouter>
    )
}
