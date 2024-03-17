import { useBoundStore } from '../store'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const login = useBoundStore((state) => state.login)
  let navigate = useNavigate()
  const [email, setEmail] = useState('admin@admin.com')
  const [password, setPassword] = useState('adminuser')

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    login(email, password).then(() => {
      navigate('/admin')
    })
  }

  return (
    <main className="px-2 py-20">
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-5">
        <div>
          <h1 className="font-serif text-2xl font-medium">Login</h1>
          <p className="font-light leading-relaxed text-neutral-600">
            Login as admin in order to see the dashboard
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm uppercase tracking-wider">
            email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="w-full rounded border p-4 font-light outline-none transition focus:border-indigo-600"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm uppercase tracking-wider"
          >
            password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="w-full rounded border p-4 font-light outline-none transition focus:border-indigo-600"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-indigo-600 p-4 font-medium text-white transition hover:bg-opacity-85"
        >
          Login
        </button>
      </form>
    </main>
  )
}
