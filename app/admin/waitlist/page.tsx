"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getWaitlistSignups, getWaitlistStats, exportWaitlistToCSV } from "../../../actions/waitlist-supabase"
import { Users, Calendar, TrendingUp, Download } from "lucide-react"

interface Signup {
  id: string
  email: string
  tier?: string
  source?: string
  confirmed?: boolean
  created_at: string
}

interface Stats {
  total: number
  today: number
  week: number
  tierBreakdown?: Record<string, number>
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
