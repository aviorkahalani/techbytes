import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  )
}
