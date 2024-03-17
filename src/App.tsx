import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </main>
  )
}

export default App
