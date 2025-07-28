"use server"

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Initialize Resend only if API key is available
let resend: any = null
try {
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend")
    resend = new Resend(process.env.RESEND_API_KEY)
  }
} catch (error) {
  console.log("Resend not configured - email notifications disabled")
}

export async function joinWaitlist(email: string) {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Check if email already exists
    const existingUser = await sql`
      SELECT email FROM waitlist WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return { success: false, message: "Email already registered on waitlist." }
    }

    // Insert email into waitlist
    await sql`
      INSERT INTO waitlist (email) 
      VALUES (${email})
    `

    // Send notification email to info@vibebrowser.app (only if Resend is configured)
    if (resend && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Vibe Browser <noreply@vibebrowser.app>",
          to: ["info@vibebrowser.app"],
          subject: "New Waitlist Signup - Vibe Browser",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #7c3aed;">New Waitlist Signup</h2>
              <p>A new user has joined the Vibe Browser waitlist:</p>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Signup Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <p>You can view all waitlist signups in your admin dashboard.</p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                This notification was sent automatically from the Vibe Browser waitlist system.
              </p>
            </div>
          `,
        })
        console.log("Notification email sent successfully")
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError)
        // Don't fail the signup if email fails
      }
    } else {
      console.log("Email notifications disabled - RESEND_API_KEY not configured")
    }

    return { success: true, message: "Successfully joined the waitlist!" }
  } catch (error) {
    console.error("Error joining waitlist:", error)
    return { success: false, message: "Failed to join waitlist. Please try again." }
  }
}

// Admin function to get all waitlist signups
export async function getWaitlistSignups() {
  try {
    const signups = await sql`
      SELECT id, email, created_at 
      FROM waitlist 
      ORDER BY created_at DESC
    `
    return { success: true, data: signups }
  } catch (error) {
    console.error("Error fetching waitlist signups:", error)
    return { success: false, message: "Failed to fetch signups." }
  }
}

// Admin function to get waitlist stats
export async function getWaitlistStats() {
  try {
    const totalSignups = await sql`
      SELECT COUNT(*) as total FROM waitlist
    `

    const todaySignups = await sql`
      SELECT COUNT(*) as today 
      FROM waitlist 
      WHERE DATE(created_at) = CURRENT_DATE
    `

    const weekSignups = await sql`
      SELECT COUNT(*) as week 
      FROM waitlist 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    `

    return {
      success: true,
      data: {
        total: Number.parseInt(totalSignups[0].total),
        today: Number.parseInt(todaySignups[0].today),
        week: Number.parseInt(weekSignups[0].week),
      },
    }
  } catch (error) {
    console.error("Error fetching waitlist stats:", error)
    return { success: false, message: "Failed to fetch stats." }
  }
}
