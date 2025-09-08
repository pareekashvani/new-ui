import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-surface-600 dark:text-surface-400 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="btn-primary"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
