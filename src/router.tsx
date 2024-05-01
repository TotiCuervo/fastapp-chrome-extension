import '../src/assets/tailwind.css'
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Root from './pages/root'
import LoginPage from './pages/login/page'
import { useUserContext } from './lib/context/UserContext'

export default function Router() {
    const { user } = useUserContext()

    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={user != null ? <Outlet /> : <Navigate to="/login" />}
                >
                    <Route
                        path="/"
                        element={<Root />}
                    />
                </Route>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
            </Routes>
        </HashRouter>
    )
}
