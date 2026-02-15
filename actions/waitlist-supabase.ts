"use server"

import { createClient } from '@supabase/supabase-js'

// Helper function to get Supabase client
function getSupabaseClient() {
  const url = process.env.SUPABASE_PROJECT_URL
  const key = process.env.SUPABASE_API_KEY
  
  if (!url || !key) {
    throw new Error('Supabase environment variables are not configured. Please check SUPABASE_PROJECT_URL and SUPABASE_API_KEY in your .env.local file.')
  }
  
  return createClient(url, key)
}

let resendClient: { emails: { send: (data: unknown) => Promise<unknown> } } | null = null

// Helper function to get Resend client
async function getResendClient(): Promise<{ emails: { send: (data: unknown) => Promise<unknown> } } | null> {
  if (resendClient) {
    return resendClient
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }

  try {
    const { Resend } = await import("resend")
    resendClient = new Resend(apiKey)
    return resendClient
  } catch (error) {
    console.log("Resend not configured - email notifications disabled")
    return null
  }
}

interface ReferralData {
  referral_source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  landing_page?: string
}

export async function joinWaitlist(
  email: string, 
  tier: string = 'free',
  referralData?: ReferralData
) {
  try {
    const supabase = getSupabaseClient()
    
    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('vibebrowser_waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      return { success: false, message: "Email already registered on waitlist." }
    }

    // Insert email into waitlist with referral tracking
    const { data, error } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: email.toLowerCase(),
          tier,
          source: 'website',
          referral_source: referralData?.referral_source || null,
          utm_source: referralData?.utm_source || null,
          utm_medium: referralData?.utm_medium || null,
          utm_campaign: referralData?.utm_campaign || null,
          landing_page: referralData?.landing_page || null,
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: 'web',
            ...referralData
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
    const resend = await getResendClient()
    if (resend) {
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
                ${referralData?.referral_source ? `<p><strong>Referral Source:</strong> ${referralData.referral_source}</p>` : ''}
                ${referralData?.utm_source ? `<p><strong>UTM Source:</strong> ${referralData.utm_source}</p>` : ''}
                ${referralData?.utm_medium ? `<p><strong>UTM Medium:</strong> ${referralData.utm_medium}</p>` : ''}
                ${referralData?.utm_campaign ? `<p><strong>UTM Campaign:</strong> ${referralData.utm_campaign}</p>` : ''}
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
    const supabase = getSupabaseClient()
    const { data: signups, error } = await supabase
      .from('vibebrowser_waitlist')
      .select('id, email, tier, source, referral_source, utm_source, utm_medium, utm_campaign, landing_page, metadata, confirmed, created_at')
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
    const supabase = getSupabaseClient()
    
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

    // Get referral source breakdown
    const { data: referralData, error: referralError } = await supabase
      .from('vibebrowser_waitlist')
      .select('referral_source, utm_source')

    if (referralError) throw referralError

    const referralBreakdown = referralData?.reduce((acc: Record<string, number>, item) => {
      const source = item.referral_source || item.utm_source || 'direct'
      acc[source] = (acc[source] || 0) + 1
      return acc
    }, {}) || {}

    return {
      success: true,
      data: {
        total: totalCount || 0,
        today: todayCount || 0,
        week: weekCount || 0,
        tierBreakdown,
        referralBreakdown
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
    const supabase = getSupabaseClient()
    const { data: signups, error } = await supabase
      .from('vibebrowser_waitlist')
      .select('email, tier, source, referral_source, utm_source, utm_medium, utm_campaign, confirmed, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (!signups || signups.length === 0) {
      return { success: false, message: "No signups to export." }
    }

    // Create CSV content with referral tracking
    const headers = ['Email', 'Tier', 'Source', 'Referral Source', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'Confirmed', 'Signup Date']
    const rows = signups.map(signup => [
      signup.email,
      signup.tier || 'free',
      signup.source || 'website',
      signup.referral_source || '',
      signup.utm_source || '',
      signup.utm_medium || '',
      signup.utm_campaign || '',
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
