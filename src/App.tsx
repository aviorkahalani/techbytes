import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}

export default App
