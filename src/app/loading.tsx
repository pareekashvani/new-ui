export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-surface-600 dark:text-surface-400">Loading AI Interface...</p>
      </div>
    </div>
  )
}
