import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
      <p className="font-medium text-sky-400">404</p>
      <h1 className="mt-2 text-4xl font-bold text-white">Page not found</h1>
      <p className="mt-4">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-8 rounded-lg bg-sky-500 px-6 py-3 font-semibold text-slate-950 hover:bg-sky-400">
        Back to home
      </Link>
    </section>
  )
}
