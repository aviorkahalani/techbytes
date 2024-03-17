import Hero from '../components/Hero'
import LatestPosts from '../components/LatestPosts'

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <LatestPosts />
    </main>
  )
}
