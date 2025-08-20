"use server"

import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL!,
  process.env.SUPABASE_API_KEY!
)

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

export async function joinWaitlist(email: string, tier: string = 'free') {
  try {
    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('vibebrowser_waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      return { success: false, message: "Email already registered on waitlist." }
    }

    // Insert email into waitlist
    const { data, error } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: email.toLowerCase(),
          tier,
          source: 'website',
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: 'web'
          },
          confirmed: false
        }
      ])
      .select()

    if (error) {
      // Check for duplicate email (unique constraint violation)
      if (error.code === '23505' || error.message?.includes('duplicate')) {
        return { 
          success: false,
          message: 'Email already registered on waitlist.' 
        }
      }
      
      console.error('Supabase error:', error)
      return { 
        success: false,
        message: 'Failed to join waitlist. Please try again.' 
      }
    }

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
                <p><strong>Tier:</strong> ${tier}</p>
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
    const { data: signups, error } = await supabase
      .from('vibebrowser_waitlist')
      .select('id, email, tier, source, metadata, confirmed, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error("Error fetching waitlist signups:", error)
      return { success: false, message: "Failed to fetch signups." }
    }

    return { success: true, data: signups }
  } catch (error) {
    console.error("Error fetching waitlist signups:", error)
    return { success: false, message: "Failed to fetch signups." }
  }
}

// Admin function to get waitlist stats
export async function getWaitlistStats() {
  try {
    // Get total signups
    const { count: totalCount, error: totalError } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true })

    if (totalError) throw totalError

    // Get today's signups
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { count: todayCount, error: todayError } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    if (todayError) throw todayError

    // Get this week's signups
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    
    const { count: weekCount, error: weekError } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString())

    if (weekError) throw weekError

    // Get tier breakdown
    const { data: tierData, error: tierError } = await supabase
      .from('vibebrowser_waitlist')
      .select('tier')

    if (tierError) throw tierError

    const tierBreakdown = tierData?.reduce((acc: Record<string, number>, item) => {
      acc[item.tier || 'free'] = (acc[item.tier || 'free'] || 0) + 1
      return acc
    }, {}) || { free: 0, pro: 0 }

    return {
      success: true,
      data: {
        total: totalCount || 0,
        today: todayCount || 0,
        week: weekCount || 0,
        tierBreakdown
      },
    }
  } catch (error) {
    console.error("Error fetching waitlist stats:", error)
    return { success: false, message: "Failed to fetch stats." }
  }
}

// Export signups to CSV
export async function exportWaitlistToCSV() {
  try {
    const { data: signups, error } = await supabase
      .from('vibebrowser_waitlist')
      .select('email, tier, source, confirmed, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (!signups || signups.length === 0) {
      return { success: false, message: "No signups to export." }
    }

    // Create CSV content
    const headers = ['Email', 'Tier', 'Source', 'Confirmed', 'Signup Date']
    const rows = signups.map(signup => [
      signup.email,
      signup.tier || 'free',
      signup.source || 'website',
      signup.confirmed ? 'Yes' : 'No',
      new Date(signup.created_at).toLocaleString()
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    return { 
      success: true, 
      data: csvContent,
      filename: `vibebrowser-waitlist-${new Date().toISOString().split('T')[0]}.csv`
    }
  } catch (error) {
    console.error("Error exporting waitlist:", error)
    return { success: false, message: "Failed to export waitlist." }
  }
}
