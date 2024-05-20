import '../src/assets/tailwind.css'
import Providers from './providers'
import Router from './router'

export default function App() {
    return (
        <div className="size-[600px] text-base">
            <Providers>
                <Router />
            </Providers>
        </div>
    )
}
