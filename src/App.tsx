import '../src/assets/tailwind.css'
import Providers from './providers'
import Router from './router'

export default function App() {
    return (
        <html lang="en">
            <body className="dark size-[600px] text-base">
                <Providers>
                    <Router />
                </Providers>
            </body>
        </html>
    )
}
