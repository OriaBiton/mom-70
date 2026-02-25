'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitForm } from './actions/submitForm'

export default function Home() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    anonymousBlessing: '',
    anonymousItem: '',
    learned: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.fullName.trim()) {
      setError('אנא מלאו את השם המלא')
      return
    }

    if (!formData.learned.trim()) {
      setError('אנא כתבו דבר אחד שלמדתם או לקחתם ממנה לחיים')
      return
    }

    if (!formData.anonymousBlessing.trim() && !formData.anonymousItem.trim()) {
      setError('אנא מלאו לפחות אחד מהשדות: ברכה או חפץ')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitForm({
        fullName: formData.fullName,
        anonymousBlessing: formData.anonymousBlessing || undefined,
        anonymousItem: formData.anonymousItem || undefined,
        learned: formData.learned,
        timestamp: new Date().toISOString()
      })

      if (result.success) {
        router.push('/thank-you')
      } else {
        setError('אירעה שגיאה בשמירת הטופס. אנא נסו שוב.')
        setIsSubmitting(false)
      }
    } catch (err) {
      setError('אירעה שגיאה בשמירת הטופס. אנא נסו שוב.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ברכות לאמא 🎉
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              נשמח אם תשתפו איתנו בברכות ובזיכרונות יפים
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Field 1: Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-lg font-semibold text-gray-900 dark:text-white mb-2">
                1. שם מלא <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="הכניסו את שמכם המלא"
                disabled={isSubmitting}
              />
            </div>

            <hr className="border-gray-300 dark:border-gray-600" />

            {/* Field 2: Anonymous Blessing */}
            <div>
              <label htmlFor="anonymousBlessing" className="block text-lg font-semibold text-gray-900 dark:text-white mb-2">
                2. ברכה למשחק "מי כתב את זה" (אנונימי)
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                נעשה לאמא שלי משחקון קטן. כל מי שמגיע - בחרו אחד מהבאים:<br/>
                <strong>a.</strong> לכתוב ברכה קצרה (אפילו שורה או שתיים), שיש בה קריצה מכם לאמא שלי. למשל - בדיחה פרטית, או משהו שרק אתם והיא תבינו.<br/>
                או...<br/>
                <strong>b.</strong> להביא חפץ/פריט מיוחד - כזה שיצחיק אותה, או יעלה זיכרון שלכם יחד.<br/><br/>
                המשחק מאוד פשוט - היא תקרא את הברכה שלכם, או לחלופין תשלוף את החפץ שהבאתם - ותנחש ממי זה.<br/><br/>
                חשבתם וחשבתם - ועדיין אין לכם? אל תדאגו - אתם יכולים לכתוב ברכה עם קריצה רק על עצמכם ואמא שלי עדיין צריכה לנחש מי כתב את הברכה.
              </p>
              <textarea
                id="anonymousBlessing"
                value={formData.anonymousBlessing}
                onChange={(e) => setFormData({ ...formData, anonymousBlessing: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                placeholder="כתבו כאן את הברכה שלכם..."
                disabled={isSubmitting}
              />
            </div>

            {/* Field 2b: Anonymous Item */}
            <div>
              <label htmlFor="anonymousItem" className="block text-lg font-semibold text-gray-900 dark:text-white mb-2">
                חפץ/פריט שאני מביא (אנונימי)
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                אם בחרתם להביא חפץ במקום ברכה - תארו אותו כאן (למשל: "אני מביא תמונה משנות ה-90")
              </p>
              <textarea
                id="anonymousItem"
                value={formData.anonymousItem}
                onChange={(e) => setFormData({ ...formData, anonymousItem: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                placeholder="תארו את החפץ שאתם מביאים..."
                disabled={isSubmitting}
              />
            </div>

            <hr className="border-gray-300 dark:border-gray-600" />

            {/* Field 3: What I Learned */}
            <div>
              <label htmlFor="learned" className="block text-lg font-semibold text-gray-900 dark:text-white mb-2">
                3. דבר אחד שלמדתי או לקחתי ממנה לחיים <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                אתם כותבים על דבר אחד שלמדתם או לקחתם ממנה לחיים, ואני מכין מזה מתנה עבורה.
              </p>
              <textarea
                id="learned"
                value={formData.learned}
                onChange={(e) => setFormData({ ...formData, learned: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                placeholder="שתפו איתנו מה למדתם ממנה..."
                disabled={isSubmitting}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'שולח...' : 'שלחו את הברכה שלכם 💝'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            <span className="text-red-500">*</span> שדות חובה
          </p>
        </div>
      </div>
    </div>
  )
}
