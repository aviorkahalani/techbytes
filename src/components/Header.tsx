import { Link, NavLink } from 'react-router-dom'
import Container from './ui/container'

export default function Header() {
  return (
    <header className="bg-slate-50 py-5">
      <Container className="flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl">
          <span className="font-black italic text-indigo-600">tech</span>
          <span className="font-light">bites.</span>
        </Link>

        <nav className="space-x-5">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Blog</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </Container>
    </header>
  )
}
