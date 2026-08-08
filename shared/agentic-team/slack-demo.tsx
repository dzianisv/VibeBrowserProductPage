"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Hash, Circle, RotateCcw, ChevronDown } from "lucide-react"

// ----- Types -----

export interface SlackMessage {
  agent: string
  role: string
  agentColor: string
  agentInitial: string
  timestamp: string
  content: React.ReactNode
  reactions?: { emoji: string; count: number }[]
  threadReplies?: number
}

export interface SlackAgent {
  role: string
  handle: string
  initial: string
  color: string
}

export interface SlackDemoProps {
  /** Channel name shown in the header */
  channelName: string
  /** Channel description shown next to the name */
  channelDescription?: string
  /** Workspace name shown in the sidebar */
  workspaceName: string
  /** Workspace logo initial */
  workspaceInitial?: string
  /** Workspace logo color */
  workspaceColor?: string
  /** List of agents to show in the sidebar */
  agents: SlackAgent[]
  /** Conversation messages to animate */
  conversation: SlackMessage[]
  /** Sidebar channel list */
  channels?: { name: string; active: boolean }[]
}

// ----- Emoji map -----

const EMOJI_MAP: Record<string, string> = {
  eyes: "\uD83D\uDC40",
  thumbsup: "\uD83D\uDC4D",
  white_check_mark: "\u2705",
  tada: "\uD83C\uDF89",
  raised_hands: "\uD83D\uDE4C",
  green_heart: "\uD83D\uDC9A",
  rocket: "\uD83D\uDE80",
  fire: "\uD83D\uDD25",
  sparkles: "\u2728",
  chart_with_upwards_trend: "\uD83D\uDCC8",
  handshake: "\uD83E\uDD1D",
  muscle: "\uD83D\uDCAA",
  star: "\u2B50",
  bulb: "\uD83D\uDCA1",
  100: "\uD83D\uDCAF",
}

// ----- Sub-components -----

function SlackReactions({ reactions }: { reactions: { emoji: string; count: number }[] }) {
  return (
    <div className="flex gap-1.5 mt-1.5 flex-wrap">
      {reactions.map((r) => (
        <span
          key={r.emoji}
          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs cursor-pointer hover:bg-white/10 transition-colors"
          style={{
            backgroundColor: "rgba(29,155,209,0.1)",
            border: "1px solid rgba(29,155,209,0.3)",
          }}
        >
          <span>{EMOJI_MAP[r.emoji] || r.emoji}</span>
          <span style={{ color: "#1d9bd1", fontWeight: 600, fontSize: 11 }}>{r.count}</span>
        </span>
      ))}
    </div>
  )
}

// ----- Main component -----

export function SlackDemo({
  channelName,
  channelDescription,
  workspaceName,
  workspaceInitial = workspaceName.charAt(0).toUpperCase(),
  workspaceColor = "#8ab4f8",
  agents,
  conversation,
  channels,
}: SlackDemoProps) {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  const defaultChannels = channels || [
    { name: channelName, active: true },
    { name: "general", active: false },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          setIsAnimating(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAnimating) return

    if (visibleMessages < conversation.length) {
      const delay = visibleMessages === 0 ? 600 : 1800 + Math.random() * 1200
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timer)
    }

    setIsAnimating(false)
  }, [visibleMessages, isAnimating, conversation.length])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [visibleMessages])

  const handleReplay = useCallback(() => {
    setVisibleMessages(0)
    hasStarted.current = true
    setIsAnimating(true)
  }, [])

  const nextAgent = visibleMessages < conversation.length
    ? conversation[visibleMessages]
    : null

  return (
    <div ref={sectionRef} className="rounded-lg overflow-hidden max-w-4xl mx-auto" style={{
      border: "1px solid #3a3a4a",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
    }}>
      <div className="flex" style={{ height: 540 }}>
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-[220px] flex-shrink-0" style={{
          backgroundColor: "#1a1025",
          borderRight: "1px solid #2a2a3a",
        }}>
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid #2a2a3a" }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: workspaceColor }}>
                <span className="flex items-center justify-center h-full text-xs font-bold text-[#0a0a0a]">{workspaceInitial}</span>
              </div>
              <span className="text-sm font-semibold text-white">{workspaceName}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-[#9aa0a6]" />
          </div>

          <div className="px-3 py-3 flex-1 overflow-hidden">
            <p className="text-[11px] font-semibold text-[#9aa0a6] uppercase tracking-wider mb-2 px-1">Channels</p>
            <div className="space-y-0.5">
              {defaultChannels.map((ch) => (
                <div
                  key={ch.name}
                  className="flex items-center gap-2 px-2 py-1 rounded text-sm"
                  style={{
                    backgroundColor: ch.active ? "#1164A3" : "transparent",
                    color: ch.active ? "#fff" : "#9aa0a6",
                  }}
                >
                  <Hash className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate text-[13px]">{ch.name}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-semibold text-[#9aa0a6] uppercase tracking-wider mt-5 mb-2 px-1">Online &mdash; {agents.length}</p>
            <div className="space-y-1">
              {agents.map((agent) => (
                <div key={agent.role} className="flex items-center gap-2 px-2 py-0.5">
                  <div className="relative">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-[#0a0a0a]"
                      style={{ backgroundColor: agent.color }}
                    >
                      {agent.initial}
                    </div>
                    <Circle className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 fill-[#2BAC76] text-[#1a1025]" />
                  </div>
                  <span className="text-[13px] text-[#ccc] truncate">{agent.handle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col" style={{ backgroundColor: "#1a1a2e" }}>
          <div className="flex items-center justify-between px-4 py-2.5" style={{
            borderBottom: "1px solid #2a2a3a",
            backgroundColor: "#1a1a2e",
          }}>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#9aa0a6]" />
              <span className="text-[15px] font-semibold text-white">{channelName}</span>
              {channelDescription && (
                <span className="text-xs text-[#9aa0a6] hidden sm:inline ml-1">{channelDescription}</span>
              )}
            </div>
            <button
              onClick={handleReplay}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded hover:bg-white/5 transition-colors"
              style={{ color: "#9aa0a6" }}
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Replay</span>
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px" style={{ backgroundColor: "#2a2a3a" }} />
              <span className="text-xs font-semibold" style={{ color: "#9aa0a6" }}>Today</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#2a2a3a" }} />
            </div>

            <div className="space-y-1">
              {conversation.slice(0, visibleMessages).map((msg, i) => {
                const prevMsg = i > 0 ? conversation[i - 1] : null
                const isGrouped = prevMsg?.agent === msg.agent && prevMsg?.timestamp === msg.timestamp

                return (
                  <div
                    key={i}
                    className="group rounded-lg px-3 transition-colors hover:bg-white/[0.02]"
                    style={{
                      paddingTop: isGrouped ? 2 : 12,
                      paddingBottom: 4,
                      animation: "slack-msg-in 0.25s ease-out",
                    }}
                  >
                    {isGrouped ? (
                      <div className="flex items-start">
                        <div className="w-9 mr-3 flex-shrink-0 flex items-center justify-center">
                          <span className="text-[10px] text-[#5f6368] opacity-0 group-hover:opacity-100 transition-opacity select-none">{msg.timestamp}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[15px] leading-relaxed text-[#d1d5db]">
                            {msg.content}
                          </div>
                          {msg.reactions && <SlackReactions reactions={msg.reactions} />}
                          {msg.threadReplies && (
                            <div className="flex items-center gap-1.5 mt-1.5">
                              <span className="text-xs font-medium" style={{ color: "#1d9bd1" }}>{msg.threadReplies} replies</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 text-[#0a0a0a] font-bold text-[11px]"
                          style={{ backgroundColor: msg.agentColor }}
                        >
                          {msg.agentInitial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-0.5">
                            <span className="font-bold text-[15px]" style={{ color: msg.agentColor }}>{msg.agent}</span>
                            <span className="text-[11px]" style={{ color: "#616061" }}>{msg.timestamp}</span>
                          </div>
                          <div className="text-[15px] leading-relaxed text-[#d1d5db]">
                            {msg.content}
                          </div>
                          {msg.reactions && <SlackReactions reactions={msg.reactions} />}
                          {msg.threadReplies && (
                            <div className="flex items-center gap-1.5 mt-1.5 cursor-pointer group/thread">
                              <span className="text-xs font-medium group-hover/thread:underline" style={{ color: "#1d9bd1" }}>{msg.threadReplies} replies</span>
                              <span className="text-[11px]" style={{ color: "#616061" }}>Last reply 2 min ago</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {isAnimating && nextAgent && visibleMessages > 0 && (
              <div className="flex items-center gap-3 px-3 pt-3 pb-1" style={{ animation: "slack-msg-in 0.2s ease-out" }}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[#0a0a0a] font-bold text-[11px]"
                  style={{ backgroundColor: nextAgent.agentColor }}
                >
                  {nextAgent.agentInitial}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold" style={{ color: nextAgent.agentColor }}>{nextAgent.agent}</span>
                  <span className="text-xs text-[#616061] ml-1">is typing</span>
                  <span className="flex gap-0.5 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9aa0a6]" style={{ animation: "slack-dot 1.4s infinite ease-in-out", animationDelay: "0s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9aa0a6]" style={{ animation: "slack-dot 1.4s infinite ease-in-out", animationDelay: "0.2s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9aa0a6]" style={{ animation: "slack-dot 1.4s infinite ease-in-out", animationDelay: "0.4s" }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 pb-4">
            <div
              className="rounded-lg px-4 py-3 text-sm flex items-center"
              style={{
                border: "1px solid #3a3a4a",
                backgroundColor: "#1a1a2e",
                color: "#616061",
              }}
            >
              <span>Message #{channelName}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slack-msg-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slack-dot {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
