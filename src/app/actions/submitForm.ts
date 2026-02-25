'use server'

import { put, head, del } from '@vercel/blob'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export interface FormSubmission {
  fullName: string
  anonymousBlessing?: string
  anonymousItem?: string
  learned: string
  timestamp: string
}

export async function submitForm(data: FormSubmission) {
  try {
    const newSubmission = {
      ...data,
      timestamp: new Date().toISOString()
    }
    
    // Check if we're in Vercel environment
    const isVercel = !!process.env.VERCEL
    
    if (isVercel) {
      // Use Vercel Blob for production
      const blobPath = 'submissions.json'
      
      // Try to read existing submissions
      let submissions: FormSubmission[] = []
      try {
        const existingBlob = await head(blobPath)
        if (existingBlob) {
          const response = await fetch(existingBlob.url)
          submissions = await response.json()
          // Delete the old blob before writing new one
          await del(existingBlob.url)
        }
      } catch (e) {
        // File doesn't exist yet, start with empty array
      }
      
      // Append new submission
      submissions.push(newSubmission)
      
      // Write back to Vercel Blob
      await put(blobPath, JSON.stringify(submissions, null, 2), {
        access: 'public',
        contentType: 'application/json',
      })
    } else {
      // Use local filesystem for development
      const dataDir = path.join(process.cwd(), 'data')
      const filePath = path.join(dataDir, 'submissions.json')
      
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true })
      }
      
      let submissions: FormSubmission[] = []
      if (existsSync(filePath)) {
        const fileContent = await readFile(filePath, 'utf-8')
        submissions = JSON.parse(fileContent)
      }
      
      submissions.push(newSubmission)
      await writeFile(filePath, JSON.stringify(submissions, null, 2), 'utf-8')
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error saving submission:', error)
    return { success: false, error: 'Failed to save submission' }
  }
}
