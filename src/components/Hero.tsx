import { Link } from 'react-router-dom'
import Container from './ui/container'

export default function Hero() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <h1 className="mb-7 max-w-md">
          Daily Knowledge Snacks for{' '}
          <span className="highlight">Developers</span>.
        </h1>

        <p className="mb-14">
          Supercharge your skills with quick & easy tech tutorials, tips, and
          news.
        </p>

        <Link
          to="/posts"
          className="rounded bg-indigo-600 p-4 text-white transition hover:bg-opacity-85"
        >
          Explore our posts
        </Link>
      </Container>
    </section>
  )
}
