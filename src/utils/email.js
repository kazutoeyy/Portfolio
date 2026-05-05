/**
 * email.js — EmailJS integration for contact form
 * 
 * Dynamic imported by useContactStore only when form is submitted.
 * Requires environment variables:
 *   VITE_EMAILJS_SERVICE_ID
 *   VITE_EMAILJS_TEMPLATE_ID
 *   VITE_EMAILJS_PUBLIC_KEY
 */

import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

/**
 * Send email via EmailJS
 * @param {{ email: string, message: string }} data
 * @throws {Error} if EmailJS is not configured or send fails
 */
export async function sendEmail({ email, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('Email service is not configured. Please set up EmailJS environment variables.')
  }

  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_email: email,
        message: message,
        reply_to: email,
      },
      PUBLIC_KEY,
    )

    if (result.status !== 200) {
      throw new Error('Email send failed. Please try again.')
    }

    return result
  } catch (error) {
    if (error.text) {
      throw new Error(`Email error: ${error.text}`)
    }
    throw error
  }
}
