"use client"

import { MessageSquare, Send, User, Bot } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export interface ChatMessage {
  role: "assistant" | "user"
  content: string
}

export interface AnalysisPanelProps {
  accentColor: string
  messages: ChatMessage[]
  loading?: boolean
  onFollowUp?: (text: string) => void
}

export function AnalysisPanel({
  accentColor,
  messages,
  loading = false,
  onFollowUp,
}: AnalysisPanelProps) {
  const [followUpText, setFollowUpText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (followUpText.trim() && onFollowUp) {
      onFollowUp(followUpText.trim())
      setFollowUpText("")
    }
  }

  // Empty state - no messages and not loading
  if (messages.length === 0 && !loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <MessageSquare className="h-7 w-7" style={{ color: accentColor }} />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          Analysis will appear here
        </h3>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Fill out the form and click &ldquo;Analyze My Answer&rdquo; to get a
          detailed breakdown of your reasoning.
        </p>
      </div>
    )
  }

  // Initial loading - no messages yet but loading first analysis
  if (messages.length === 0 && loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl animate-pulse"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <MessageSquare className="h-7 w-7" style={{ color: accentColor }} />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          Analyzing your answer...
        </h3>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Claude is reviewing your reasoning patterns.
        </p>
      </div>
    )
  }

  // Chat view - has messages (keep visible even while loading follow-ups)
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div
        className="flex items-center gap-2 rounded-t-2xl px-5 py-3.5 text-sm font-medium text-white"
        style={{ backgroundColor: accentColor }}
      >
        <MessageSquare className="h-4 w-4" />
        Analysis Chat
      </div>

      {/* Scrollable messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={
                  msg.role === "assistant"
                    ? {
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                      }
                    : {
                        backgroundColor: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                      }
                }
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>

              {/* Message bubble */}
              <div
                className={`min-w-0 ${msg.role === "user" ? "max-w-[80%]" : "flex-1"}`}
              >
                <p
                  className={`mb-1 text-xs font-medium text-muted-foreground ${msg.role === "user" ? "text-right" : ""}`}
                >
                  {msg.role === "assistant" ? "Analysis" : "You"}
                </p>
                <div
                  className="rounded-xl px-4 py-3 text-sm leading-relaxed"
                  style={
                    msg.role === "assistant"
                      ? {
                          backgroundColor: `${accentColor}08`,
                          border: `1px solid ${accentColor}20`,
                          color: "hsl(var(--foreground))",
                        }
                      : {
                          backgroundColor: "hsl(var(--primary))",
                          color: "hsl(var(--primary-foreground))",
                        }
                  }
                >
                  {msg.content.split("\n").map((paragraph, pIdx) => {
                    const formattedText = paragraph.replace(
                      /\*\*(.*?)\*\*/g,
                      "<strong>$1</strong>"
                    )
                    return paragraph.trim() ? (
                      <p
                        key={pIdx}
                        className="mb-2 last:mb-0"
                        dangerouslySetInnerHTML={{ __html: formattedText }}
                      />
                    ) : null
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator during follow-up loading */}
          {loading && (
            <div className="flex gap-3">
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                }}
              >
                <Bot className="h-4 w-4" />
              </div>
              <div
                className="flex items-center gap-1.5 rounded-xl px-4 py-3"
                style={{
                  backgroundColor: `${accentColor}08`,
                  border: `1px solid ${accentColor}20`,
                }}
              >
                <span
                  className="h-2 w-2 animate-bounce rounded-full"
                  style={{
                    backgroundColor: accentColor,
                    animationDelay: "0ms",
                  }}
                />
                <span
                  className="h-2 w-2 animate-bounce rounded-full"
                  style={{
                    backgroundColor: accentColor,
                    animationDelay: "150ms",
                  }}
                />
                <span
                  className="h-2 w-2 animate-bounce rounded-full"
                  style={{
                    backgroundColor: accentColor,
                    animationDelay: "300ms",
                  }}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Follow-up input - always visible once chat has started */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleFollowUpSubmit} className="flex gap-2">
          <input
            type="text"
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
            placeholder="Ask a follow-up question..."
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2"
            style={
              { "--tw-ring-color": accentColor } as React.CSSProperties
            }
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!followUpText.trim() || loading}
            className="rounded-lg px-4 py-2 text-white transition-opacity disabled:opacity-50"
            style={{ backgroundColor: accentColor }}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send follow-up</span>
          </button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          Ask for clarification or deeper explanation
        </p>
      </div>
    </div>
  )
}
