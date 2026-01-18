import { Link } from 'react-router-dom'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">😿</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          No cats here yet!
        </h2>
        <p className="text-gray-600 mb-8">
          Your gallery is empty. Upload your first cat image to get started.
        </p>
        <Link
          to="/upload"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
        >
          Upload Your First Cat
        </Link>
      </div>
    </div>
  )
}

export default EmptyState