import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 sm:p-16">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            תודה רבה! 💝
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
            הברכה שלך נשמרה בהצלחה
          </p>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            אנחנו מעריכים מאוד שהקדשתם מזמנכם לשתף איתנו
          </p>

          {/* Decorative Element */}
          <div className="text-6xl mb-8">
            🎉 🎂 🎈
          </div>

          {/* Back to Form Link */}
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg py-3 px-8 rounded-xl shadow-lg transform transition hover:scale-105"
          >
            חזרה לטופס
          </Link>
        </div>
      </div>
    </div>
  )
}
