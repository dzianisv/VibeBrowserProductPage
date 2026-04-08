"use client"

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts'

const aggregateData = [
  { model: 'Grok-4.1', successRate: 98, avgTime: 2.1, interventions: 0.3, costPerRun: 0.012 },
  { model: 'GPT-5.4', successRate: 92, avgTime: 3.8, interventions: 1.1, costPerRun: 0.035 },
  { model: 'Claude 4.6', successRate: 89, avgTime: 4.2, interventions: 1.4, costPerRun: 0.028 },
  { model: 'Ollama (local)', successRate: 65, avgTime: 12.0, interventions: 4.2, costPerRun: 0.0 },
]

const taskData = [
  { task: 'Gmail Triage', 'Grok-4.1': 1.8, 'GPT-5.4': 3.2, 'Claude 4.6': 3.9, 'Ollama': 10.5 },
  { task: 'LinkedIn Outreach', 'Grok-4.1': 2.4, 'GPT-5.4': 4.1, 'Claude 4.6': 4.5, 'Ollama': 14.2 },
  { task: 'Price Scraping', 'Grok-4.1': 1.5, 'GPT-5.4': 2.9, 'Claude 4.6': 3.1, 'Ollama': 8.8 },
  { task: 'Form Filling', 'Grok-4.1': 2.8, 'GPT-5.4': 4.8, 'Claude 4.6': 5.2, 'Ollama': 15.3 },
  { task: 'Dashboard Nav', 'Grok-4.1': 2.0, 'GPT-5.4': 4.0, 'Claude 4.6': 4.3, 'Ollama': 11.2 },
]

const radarData = [
  { metric: 'Success Rate', 'Grok-4.1': 98, 'GPT-5.4': 92, 'Claude 4.6': 89, 'Ollama': 65 },
  { metric: 'Speed', 'Grok-4.1': 95, 'GPT-5.4': 72, 'Claude 4.6': 68, 'Ollama': 25 },
  { metric: 'Reliability', 'Grok-4.1': 97, 'GPT-5.4': 85, 'Claude 4.6': 82, 'Ollama': 45 },
  { metric: 'Cost Efficiency', 'Grok-4.1': 90, 'GPT-5.4': 60, 'Claude 4.6': 70, 'Ollama': 100 },
  { metric: 'Complex Tasks', 'Grok-4.1': 96, 'GPT-5.4': 88, 'Claude 4.6': 91, 'Ollama': 40 },
]

const colors = {
  grok: '#8ab4f8',
  gpt: '#81c995',
  claude: '#f28b82',
  ollama: '#fdd663',
  bg: '#2d2e30',
  grid: '#3c4043',
  text: '#9aa0a6',
  white: '#e8eaed'
}

export function AggregateBarChart() {
  return (
    <div className="my-8 h-[400px] w-full rounded-xl border border-[#3c4043] bg-[#2d2e30] p-4 sm:p-6">
      <h3 className="mb-6 font-serif text-xl text-[#e8eaed]">Success Rate by Model (%)</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={aggregateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
          <XAxis dataKey="model" stroke={colors.text} tick={{ fill: colors.text, fontSize: 14 }} tickLine={false} axisLine={false} />
          <YAxis stroke={colors.text} tick={{ fill: colors.text, fontSize: 14 }} tickLine={false} axisLine={false} domain={[0, 100]} />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ backgroundColor: colors.bg, borderColor: colors.grid, color: colors.white, borderRadius: '8px' }}
            itemStyle={{ color: colors.white }}
          />
          <Bar dataKey="successRate" name="Success Rate (%)" fill={colors.grok} radius={[4, 4, 0, 0]} maxBarSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TaskLineChart() {
  return (
    <div className="my-8 h-[400px] w-full rounded-xl border border-[#3c4043] bg-[#2d2e30] p-4 sm:p-6">
      <h3 className="mb-6 font-serif text-xl text-[#e8eaed]">Avg Completion Time by Task (Seconds)</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={taskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
          <XAxis dataKey="task" stroke={colors.text} tick={{ fill: colors.text, fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis stroke={colors.text} tick={{ fill: colors.text, fontSize: 14 }} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: colors.bg, borderColor: colors.grid, color: colors.white, borderRadius: '8px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px', color: colors.text }} />
          <Line type="monotone" dataKey="Grok-4.1" stroke={colors.grok} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="GPT-5.4" stroke={colors.gpt} strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Claude 4.6" stroke={colors.claude} strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Ollama" stroke={colors.ollama} strokeWidth={3} dot={{ r: 4 }} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MultiMetricRadarChart() {
  return (
    <div className="my-8 flex h-[450px] w-full flex-col items-center justify-center rounded-xl border border-[#3c4043] bg-[#2d2e30] p-4 sm:p-6">
      <h3 className="mb-2 self-start font-serif text-xl text-[#e8eaed]">Multi-Metric Comparison (0-100 Score)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
          <PolarGrid stroke={colors.grid} />
          <PolarAngleAxis dataKey="metric" tick={{ fill: colors.text, fontSize: 13 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: colors.text }} stroke={colors.grid} />
          <Radar name="Grok-4.1" dataKey="Grok-4.1" stroke={colors.grok} fill={colors.grok} fillOpacity={0.3} strokeWidth={2} />
          <Radar name="GPT-5.4" dataKey="GPT-5.4" stroke={colors.gpt} fill={colors.gpt} fillOpacity={0.2} strokeWidth={2} />
          <Radar name="Claude 4.6" dataKey="Claude 4.6" stroke={colors.claude} fill={colors.claude} fillOpacity={0.1} strokeWidth={2} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: colors.bg, borderColor: colors.grid, color: colors.white, borderRadius: '8px' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ComparisonTable() {
  return (
    <div className="my-8 w-full overflow-x-auto rounded-xl border border-[#3c4043] bg-[#202124]">
      <table className="w-full border-collapse text-left text-sm text-[#e8eaed] sm:text-base">
        <thead className="bg-[#2d2e30] font-serif text-[#9aa0a6]">
          <tr>
            <th className="border-b border-[#3c4043] p-4 font-medium">Model</th>
            <th className="border-b border-[#3c4043] p-4 font-medium">Success Rate</th>
            <th className="border-b border-[#3c4043] p-4 font-medium">Avg Time (s)</th>
            <th className="border-b border-[#3c4043] p-4 font-medium">Interventions/Run</th>
            <th className="border-b border-[#3c4043] p-4 font-medium">Est. Cost/Run</th>
            <th className="border-b border-[#3c4043] p-4 font-medium">Best Fit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#3c4043]">
          <tr className="transition-colors hover:bg-[#2d2e30]/50">
            <td className="p-4 font-semibold text-[#8ab4f8]">Grok-4.1</td>
            <td className="p-4">98%</td>
            <td className="p-4">2.1</td>
            <td className="p-4">0.3</td>
            <td className="p-4">$0.012</td>
            <td className="p-4">High-frequency automation</td>
          </tr>
          <tr className="transition-colors hover:bg-[#2d2e30]/50">
            <td className="p-4 font-semibold text-[#81c995]">GPT-5.4</td>
            <td className="p-4">92%</td>
            <td className="p-4">3.8</td>
            <td className="p-4">1.1</td>
            <td className="p-4">$0.035</td>
            <td className="p-4">Complex reasoning tasks</td>
          </tr>
          <tr className="transition-colors hover:bg-[#2d2e30]/50">
            <td className="p-4 font-semibold text-[#f28b82]">Claude 4.6</td>
            <td className="p-4">89%</td>
            <td className="p-4">4.2</td>
            <td className="p-4">1.4</td>
            <td className="p-4">$0.028</td>
            <td className="p-4">Debugging & analysis</td>
          </tr>
          <tr className="transition-colors hover:bg-[#2d2e30]/50">
            <td className="p-4 font-semibold text-[#fdd663]">Ollama (local)</td>
            <td className="p-4">65%</td>
            <td className="p-4">12.0</td>
            <td className="p-4">4.2</td>
            <td className="p-4">$0.00</td>
            <td className="p-4">Privacy-first, simple tasks</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
