"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getWaitlistSignups, getWaitlistStats, exportWaitlistToCSV } from "../../../actions/waitlist-supabase"
import { Users, Calendar, TrendingUp, Download, Globe, Share2 } from "lucide-react"

interface Signup {
  id: string
  email: string
  tier?: string
  source?: string
  referral_source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  confirmed?: boolean
  created_at: string
}

interface Stats {
  total: number
  today: number
  week: number
  tierBreakdown?: Record<string, number>
  referralBreakdown?: Record<string, number>
}

// Map of source names to display-friendly labels
const SOURCE_LABELS: Record<string, string> = {
  linkedin: 'LinkedIn',
  twitter: 'Twitter/X',
  google: 'Google Search',
  facebook: 'Facebook',
  reddit: 'Reddit',
  hackernews: 'Hacker News',
  youtube: 'YouTube',
  github: 'GitHub',
  producthunt: 'Product Hunt',
  direct: 'Direct',
  bing: 'Bing',
}

function getSourceLabel(source: string): string {
  return SOURCE_LABELS[source.toLowerCase()] || source
}

function getSourceColor(source: string): string {
  const colors: Record<string, string> = {
    linkedin: 'bg-blue-100 text-blue-800',
    twitter: 'bg-sky-100 text-sky-800',
    google: 'bg-red-100 text-red-800',
    facebook: 'bg-indigo-100 text-indigo-800',
    reddit: 'bg-orange-100 text-orange-800',
    hackernews: 'bg-orange-100 text-orange-800',
    youtube: 'bg-red-100 text-red-800',
    github: 'bg-gray-100 text-gray-800',
    producthunt: 'bg-orange-100 text-orange-800',
    direct: 'bg-green-100 text-green-800',
  }
  return colors[source.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

export default function WaitlistAdmin() {
  const [signups, setSignups] = useState<Signup[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0, week: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [signupsResult, statsResult] = await Promise.all([getWaitlistSignups(), getWaitlistStats()])

      if (signupsResult.success) {
        setSignups(signupsResult.data as Signup[])
      }

      if (statsResult.success) {
        setStats(statsResult.data as Stats)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = async () => {
    const result = await exportWaitlistToCSV()
    if (result.success && result.data) {
      const blob = new Blob([result.data], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = result.filename || `vibe-browser-waitlist-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading waitlist data...</div>
        </div>
      </div>
    )
  }

  // Sort referral breakdown by count
  const sortedReferrals = stats.referralBreakdown 
    ? Object.entries(stats.referralBreakdown).sort((a, b) => b[1] - a[1])
    : []

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Waitlist Dashboard</h1>
        <Button onClick={exportToCSV} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.today}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.week}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tier Breakdown</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Free:</span>
                <span className="font-bold">{stats.tierBreakdown?.free || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Pro:</span>
                <span className="font-bold">{stats.tierBreakdown?.pro || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Sources */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {sortedReferrals.length === 0 ? (
              <p className="text-muted-foreground text-sm">No referral data yet</p>
            ) : (
              <div className="space-y-3">
                {sortedReferrals.slice(0, 8).map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Share2 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{getSourceLabel(source)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${(count / stats.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Top Referral Channels</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedReferrals.length === 0 ? (
              <p className="text-muted-foreground text-sm">No referral data yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {sortedReferrals.slice(0, 10).map(([source, count]) => (
                  <Badge 
                    key={source} 
                    variant="secondary"
                    className={getSourceColor(source)}
                  >
                    {getSourceLabel(source)}: {count}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Signups List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Signups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {signups.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No signups yet.</p>
            ) : (
              signups.map((signup) => (
                <div key={signup.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{signup.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(signup.created_at).toLocaleDateString()} at{" "}
                        {new Date(signup.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {(signup.referral_source || signup.utm_source) && (
                      <Badge 
                        variant="outline"
                        className={getSourceColor(signup.referral_source || signup.utm_source || '')}
                      >
                        {getSourceLabel(signup.referral_source || signup.utm_source || '')}
                      </Badge>
                    )}
                    {signup.tier && (
                      <Badge variant={signup.tier === 'pro' ? 'default' : 'secondary'}>
                        {signup.tier}
                      </Badge>
                    )}
                    {signup.confirmed && (
                      <Badge variant="outline">Confirmed</Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
