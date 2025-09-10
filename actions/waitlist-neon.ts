"use server"

import { Pool } from 'pg'

// Helper function to get database pool
function getDatabasePool() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  
  if (!connectionString) {
    throw new Error('Database connection string not configured. Please check DATABASE_URL or POSTGRES_URL in your environment variables.')
  }
  
  return new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })
}

export async function joinWaitlist(email: string, tier: string = 'free') {
  const pool = getDatabasePool()
  
  try {
    // First, ensure the table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vibebrowser_waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        tier VARCHAR(50) DEFAULT 'free',
        source VARCHAR(50) DEFAULT 'website',
        metadata JSONB,
        confirmed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Check if email already exists
    const checkResult = await pool.query(
      'SELECT email FROM vibebrowser_waitlist WHERE email = $1',
      [email.toLowerCase()]
    )
    
    if (checkResult.rows.length > 0) {
      return { success: false, message: "Email already registered on waitlist." }
    }
    
    // Insert email into waitlist
    const insertResult = await pool.query(
      `INSERT INTO vibebrowser_waitlist (email, tier, source, metadata, confirmed)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        email.toLowerCase(),
        tier,
        'website',
        JSON.stringify({
          timestamp: new Date().toISOString(),
          userAgent: 'web'
        }),
        false
      ]
    )
    
    if (insertResult.rows.length > 0) {
      console.log('Successfully added to waitlist:', email)
      return { success: true, message: "Successfully joined the waitlist!" }
    } else {
      throw new Error('Failed to insert into database')
    }
    
  } catch (error: any) {
    // Check for duplicate email (unique constraint violation)
    if (error.code === '23505' || error.message?.includes('duplicate')) {
      return { 
        success: false,
        message: 'Email already registered on waitlist.' 
      }
    }
    
    console.error("Error joining waitlist:", error)
    return { success: false, message: "Failed to join waitlist. Please try again." }
  } finally {
    await pool.end()
  }
}

// Admin function to get all waitlist signups
export async function getWaitlistSignups() {
  const pool = getDatabasePool()
  
  try {
    const result = await pool.query(
      'SELECT id, email, tier, source, metadata, confirmed, created_at FROM vibebrowser_waitlist ORDER BY created_at DESC'
    )
    
    return { success: true, data: result.rows }
  } catch (error) {
    console.error("Error fetching waitlist signups:", error)
    return { success: false, message: "Failed to fetch signups." }
  } finally {
    await pool.end()
  }
}

// Admin function to get waitlist stats
export async function getWaitlistStats() {
  const pool = getDatabasePool()
  
  try {
    // Get total signups
    const totalResult = await pool.query(
      'SELECT COUNT(*) as count FROM vibebrowser_waitlist'
    )
    const totalCount = parseInt(totalResult.rows[0].count)
    
    // Get today's signups
    const todayResult = await pool.query(
      `SELECT COUNT(*) as count FROM vibebrowser_waitlist 
       WHERE created_at >= CURRENT_DATE`
    )
    const todayCount = parseInt(todayResult.rows[0].count)
    
    // Get this week's signups
    const weekResult = await pool.query(
      `SELECT COUNT(*) as count FROM vibebrowser_waitlist 
       WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'`
    )
    const weekCount = parseInt(weekResult.rows[0].count)
    
    // Get tier breakdown
    const tierResult = await pool.query(
      `SELECT tier, COUNT(*) as count FROM vibebrowser_waitlist 
       GROUP BY tier`
    )
    
    const tierBreakdown = tierResult.rows.reduce((acc: Record<string, number>, row) => {
      acc[row.tier || 'free'] = parseInt(row.count)
      return acc
    }, {})
    
    return {
      success: true,
      data: {
        total: totalCount,
        today: todayCount,
        week: weekCount,
        tierBreakdown
      },
    }
  } catch (error) {
    console.error("Error fetching waitlist stats:", error)
    return { success: false, message: "Failed to fetch stats." }
  } finally {
    await pool.end()
  }
}

// Export signups to CSV
export async function exportWaitlistToCSV() {
  const pool = getDatabasePool()
  
  try {
    const result = await pool.query(
      'SELECT email, tier, source, confirmed, created_at FROM vibebrowser_waitlist ORDER BY created_at DESC'
    )
    
    if (!result.rows || result.rows.length === 0) {
      return { success: false, message: "No signups to export." }
    }
    
    // Create CSV content
    const headers = ['Email', 'Tier', 'Source', 'Confirmed', 'Signup Date']
    const rows = result.rows.map(signup => [
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
  } finally {
    await pool.end()
  }
}