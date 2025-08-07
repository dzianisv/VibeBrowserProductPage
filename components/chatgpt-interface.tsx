"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Plus,
  Paperclip,
  Mic,
  Image,
  FileText,
  Globe,
  Code,
  Settings,
  History,
  BookOpen,
  Zap,
  ArrowUp,
  MoreHorizontal,
  Copy,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from "lucide-react"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  attachments?: Array<{type: 'image' | 'file' | 'webpage', name: string}>
}

interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  messages: Message[]
}

export function ChatGPTInterface() {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Flight Booking Assistance',
      lastMessage: 'I found 3 flights matching your criteria...',
      timestamp: new Date('2025-01-06T10:00:00'),
      messages: []
    },
    {
      id: '2',
      title: 'LinkedIn Automation',
      lastMessage: 'Successfully sent 15 connection requests...',
      timestamp: new Date('2025-01-05T14:30:00'),
      messages: []
    }
  ])
  
  const [currentConversation, setCurrentConversation] = useState<Conversation>({
    id: '3',
    title: 'New Conversation',
    lastMessage: '',
    timestamp: new Date(),
    messages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm Vibe, your AI browsing assistant. I can help you navigate websites, fill forms, book flights, automate tasks, and much more. What would you like me to help you with today?",
        timestamp: new Date()
      }
    ]
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation.messages])

  const handleSend = () => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    }

    setCurrentConversation(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }))
    setMessage("")
    setIsTyping(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand you want to " + message.toLowerCase() + ". Let me help you with that. I'll analyze the webpage and execute the necessary actions for you.",
        timestamp: new Date()
      }
      
      setCurrentConversation(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage]
      }))
      setIsTyping(false)
    }, 2000)
  }

  const suggestionPrompts = [
    "Book a flight to Paris next week",
    "Fill out this form for me",
    "Find the cheapest hotel in Tokyo",
    "Respond to all my LinkedIn messages"
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">ChatGPT-like Interface</h2>
        <p className="text-muted-foreground">
          Natural conversation interface integrated directly into your browser
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card className="border-0 shadow-lg h-[700px] overflow-hidden">
            <CardHeader className="border-b p-4">
              <Button className="w-full justify-start" variant="ghost">
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </CardHeader>
            <CardContent className="p-2 space-y-2 overflow-y-auto" style={{height: 'calc(100% - 60px)'}}>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground px-2 py-1">Today</p>
                {conversations.slice(0, 2).map((conv) => (
                  <Button
                    key={conv.id}
                    variant="ghost"
                    className="w-full justify-start text-left p-3 hover:bg-slate-100"
                    onClick={() => setCurrentConversation(conv)}
                  >
                    <div className="flex flex-col items-start gap-1 w-full">
                      <span className="text-sm font-medium truncate w-full">{conv.title}</span>
                      <span className="text-xs text-muted-foreground truncate w-full">{conv.lastMessage}</span>
                    </div>
                  </Button>
                ))}
              </div>
              
              <div className="space-y-1 pt-2">
                <p className="text-xs font-semibold text-muted-foreground px-2 py-1">Yesterday</p>
                <Button variant="ghost" className="w-full justify-start text-left p-3 hover:bg-slate-100">
                  <div className="flex flex-col items-start gap-1 w-full">
                    <span className="text-sm font-medium truncate w-full">Amazon Shopping</span>
                    <span className="text-xs text-muted-foreground truncate w-full">Added items to cart...</span>
                  </div>
                </Button>
              </div>

              <div className="mt-auto pt-4 border-t space-y-1">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="border-0 shadow-lg h-[700px] flex flex-col">
            <CardHeader className="border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Vibe AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-muted-foreground">Online • GPT-4 Turbo</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    28 tools active
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentConversation.messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-slate-100 text-slate-900'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      {msg.attachments && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {msg.attachments.map((att, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {att.type === 'image' && <Image className="w-3 h-3 mr-1" />}
                              {att.type === 'file' && <FileText className="w-3 h-3 mr-1" />}
                              {att.type === 'webpage' && <Globe className="w-3 h-3 mr-1" />}
                              {att.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mt-2 px-2">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <RefreshCw className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0 order-2">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>

            <div className="border-t p-4 space-y-3">
              {currentConversation.messages.length === 1 && (
                <div className="flex gap-2 flex-wrap">
                  {suggestionPrompts.map((prompt, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setMessage(prompt)}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      {prompt}
                    </Button>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="px-2">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="px-2">
                    <Image className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="px-2">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Message Vibe... (@ to mention page, / for commands)"
                    className="pr-10"
                  />
                  <Button
                    onClick={handleSend}
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 bg-purple-600 hover:bg-purple-700"
                    disabled={!message.trim()}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Current page context
                  </span>
                  <span className="flex items-center gap-1">
                    <Code className="w-3 h-3" />
                    DOM access enabled
                  </span>
                </div>
                <span>Shift+Enter for new line</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mt-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">2.5M+</p>
                <p className="text-sm text-muted-foreground">Messages processed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">&lt; 2s</p>
                <p className="text-sm text-muted-foreground">Avg response time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">100+</p>
                <p className="text-sm text-muted-foreground">Languages supported</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">∞</p>
                <p className="text-sm text-muted-foreground">Context memory</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}