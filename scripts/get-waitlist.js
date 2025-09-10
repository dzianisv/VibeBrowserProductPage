#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Parse command line arguments
const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');
const exportCsv = args.includes('--csv');
const showStats = args.includes('--stats');
const limit = args.find(arg => arg.startsWith('--limit='))?.split('=')[1] || null;
const tier = args.find(arg => arg.startsWith('--tier='))?.split('=')[1] || null;

if (showHelp) {
  console.log(`
📧 Waitlist Query Tool
======================

Usage: node scripts/get-waitlist.js [options]

Options:
  --help, -h      Show this help message
  --csv           Export as CSV format
  --stats         Show statistics only
  --limit=N       Limit results to N entries
  --tier=TYPE     Filter by tier (free/pro)

Examples:
  node scripts/get-waitlist.js                    # Show all entries
  node scripts/get-waitlist.js --stats            # Show statistics only
  node scripts/get-waitlist.js --csv              # Export as CSV
  node scripts/get-waitlist.js --limit=10         # Show last 10 entries
  node scripts/get-waitlist.js --tier=pro         # Show only pro tier
  node scripts/get-waitlist.js --csv > list.csv   # Save to file
`);
  process.exit(0);
}

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase credentials not found in .env.local');
  console.error('Please ensure SUPABASE_PROJECT_URL and SUPABASE_API_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getWaitlistStats() {
  try {
    // Total count
    const { count: totalCount } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true });

    // Count by tier
    const { data: tierData } = await supabase
      .from('vibebrowser_waitlist')
      .select('tier');
    
    const tierCounts = tierData?.reduce((acc, item) => {
      const tierName = item.tier || 'free';
      acc[tierName] = (acc[tierName] || 0) + 1;
      return acc;
    }, {}) || {};

    // Count by source
    const { data: sourceData } = await supabase
      .from('vibebrowser_waitlist')
      .select('source');
    
    const sourceCounts = sourceData?.reduce((acc, item) => {
      const sourceName = item.source || 'unknown';
      acc[sourceName] = (acc[sourceName] || 0) + 1;
      return acc;
    }, {}) || {};

    // Recent signups (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const { count: weekCount } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString());

    // Today's signups
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { count: todayCount } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    console.log('\n📊 WAITLIST STATISTICS');
    console.log('======================\n');
    console.log(`📧 Total Signups: ${totalCount}`);
    console.log(`📅 Today: ${todayCount}`);
    console.log(`📅 Last 7 days: ${weekCount}`);
    
    console.log('\n🏷️  By Tier:');
    Object.entries(tierCounts).forEach(([tier, count]) => {
      const percentage = ((count / totalCount) * 100).toFixed(1);
      console.log(`   ${tier}: ${count} (${percentage}%)`);
    });
    
    console.log('\n📍 By Source:');
    Object.entries(sourceCounts).forEach(([source, count]) => {
      const percentage = ((count / totalCount) * 100).toFixed(1);
      console.log(`   ${source}: ${count} (${percentage}%)`);
    });

  } catch (error) {
    console.error('❌ Error fetching statistics:', error.message);
  }
}

async function getWaitlistEntries() {
  try {
    // Build query
    let query = supabase
      .from('vibebrowser_waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (tier) {
      query = query.eq('tier', tier);
    }
    
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error, count } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .then(async (result) => {
        // Get total count separately
        const { count } = await supabase
          .from('vibebrowser_waitlist')
          .select('*', { count: 'exact', head: true });
        
        return { ...result, count };
      });

    if (error) {
      throw error;
    }

    if (exportCsv) {
      // CSV format
      console.log('email,tier,source,confirmed,created_at');
      data.forEach(entry => {
        console.log(`"${entry.email}","${entry.tier || 'free'}","${entry.source || 'website'}",${entry.confirmed || false},"${entry.created_at}"`);
      });
    } else {
      // Table format
      console.log('\n📧 WAITLIST ENTRIES');
      console.log('===================\n');
      
      if (limit) {
        console.log(`Showing ${data.length} of ${count} total entries\n`);
      } else {
        console.log(`Total entries: ${data.length}\n`);
      }

      console.log('┌─────┬──────────────────────────────────┬──────────┬────────────┬───────────┬─────────────────────┐');
      console.log('│ #   │ Email                            │ Tier     │ Source     │ Confirmed │ Date                │');
      console.log('├─────┼──────────────────────────────────┼──────────┼────────────┼───────────┼─────────────────────┤');
      
      data.forEach((entry, index) => {
        const num = String(index + 1).padEnd(3);
        const email = entry.email.substring(0, 32).padEnd(32);
        const tier = (entry.tier || 'free').padEnd(8);
        const source = (entry.source || 'website').substring(0, 10).padEnd(10);
        const confirmed = (entry.confirmed ? '✓' : '✗').padEnd(9);
        const date = new Date(entry.created_at).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        console.log(`│ ${num} │ ${email} │ ${tier} │ ${source} │ ${confirmed} │ ${date} │`);
      });
      
      console.log('└─────┴──────────────────────────────────┴──────────┴────────────┴───────────┴─────────────────────┘');
      
      // Show summary
      console.log('\n📊 Summary:');
      const tiers = data.reduce((acc, entry) => {
        const t = entry.tier || 'free';
        acc[t] = (acc[t] || 0) + 1;
        return acc;
      }, {});
      
      Object.entries(tiers).forEach(([t, count]) => {
        console.log(`   ${t}: ${count} entries`);
      });
    }

  } catch (error) {
    console.error('❌ Error fetching waitlist:', error.message);
  }
}

async function main() {
  if (showStats) {
    await getWaitlistStats();
  } else {
    await getWaitlistEntries();
  }
}

main().catch(console.error);