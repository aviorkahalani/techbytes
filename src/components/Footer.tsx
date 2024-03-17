import { Link } from 'react-router-dom'
import Container from './ui/container'

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-5">
      <Container className="divide-y divide-neutral-200">
        <div className="flex items-center justify-between py-5">
          <Link to="/" className="font-serif text-2xl">
            <span className="font-black italic text-indigo-600">tech</span>
            <span className="font-light">bites</span>
            <span>.</span>
          </Link>

          <p className="text-sm text-neutral-600">
            ©️ 2024 - All rights reserved.
          </p>
        </div>
        <div className="py-5">
          <p className="text-sm">Made by Avior Kahalani</p>
        </div>
      </Container>
    </footer>
  )
}
