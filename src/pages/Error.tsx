import { Link } from 'react-router-dom'
import Container from '../components/ui/container'

export default function Error() {
  const imageUrl = new URL('../assets/images/404.svg', import.meta.url).href

  return (
    <main>
      <Container className="mx-auto flex max-w-md flex-col items-center gap-7 text-center">
        <img src={imageUrl} />
        <h1 className="text-2xl text-indigo-600">
          Whoops! Looks Like We Got Lost.
        </h1>
        <p className="text-lg font-light leading-relaxed text-neutral-600">
          The page you requested is currently unavailable. Don't worry, these
          things happen sometimes!
        </p>
        <Link
          to="/"
          className="rounded border p-4 transition hover:bg-slate-50"
        >
          Go Back Home
        </Link>
      </Container>
    </main>
  )
}
