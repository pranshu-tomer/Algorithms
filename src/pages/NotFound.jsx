import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container-md py-12 flex flex-col items-center justify-center">
      <div className="text-primary-500 text-6xl font-bold mb-4">404</div>
      <h1 className="text-2xl font-semibold mb-4">Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="btn btn-primary flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound