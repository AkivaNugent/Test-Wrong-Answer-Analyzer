"use client"

import { useState, useCallback } from "react"
import { BookOpen, Calculator, FileText } from "lucide-react"
import { LsatLrForm } from "@/components/forms/lsat-lr-form"
import { SatMathForm } from "@/components/forms/sat-math-form"
import { McatCarsForm } from "@/components/forms/mcat-cars-form"
import { AnalysisPanel, type ChatMessage } from "@/components/analysis-panel"

const TABS = [
  {
    id: "lsat",
    label: "LSAT LR",
    icon: FileText,
    accent: "var(--lsat-tab)",
    accentHex: "#3b82f6",
    bg: "var(--lsat-bg)",
  },
  {
    id: "sat",
    label: "SAT Math",
    icon: Calculator,
    accent: "var(--sat-tab)",
    accentHex: "#dc2626",
    bg: "var(--sat-bg)",
  },
  {
    id: "mcat",
    label: "MCAT CARS",
    icon: BookOpen,
    accent: "var(--mcat-tab)",
    accentHex: "#059669",
    bg: "var(--mcat-bg)",
  },
] as const

type TabId = (typeof TABS)[number]["id"]

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("lsat")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<
    { role: string; content: string }[]
  >([])

  const current = TABS.find((t) => t.id === activeTab)!

  // Called by the form when API analysis completes (initial submission)
  const handleAnalysisComplete = useCallback(
    (analysisText: string, history: { role: string; content: string }[]) => {
      if (analysisText.trim()) {
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant" as const, content: analysisText },
        ])
      }
      setConversationHistory(history)
      setLoading(false)
    },
    []
  )

  // Called by the form right before the API call starts
  const handleAnalysisStart = useCallback(() => {
    setLoading(true)
  }, [])

  // Reset everything for a new question
  const handleReset = useCallback(() => {
    setChatMessages([])
    setLoading(false)
    setConversationHistory([])
  }, [])

  // Called from the chat input for follow-up questions
  const handleFollowUp = useCallback(
    async (followUpText: string) => {
      // 1. Show user message immediately
      setChatMessages((prev) => [
        ...prev,
        { role: "user" as const, content: followUpText },
      ])
      setLoading(true)

      // 2. Build updated history for the backend
      const updatedHistory = [
        ...conversationHistory,
        { role: "user", content: followUpText },
      ]

      try {
        const response = await fetch("http://localhost:5000/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            testType: activeTab,
            formData: {},
            conversationHistory: updatedHistory,
          }),
        })

        const data = await response.json()

        if (data.success) {
          // 3. Append assistant response (preserving all previous messages)
          setChatMessages((prev) => [
            ...prev,
            { role: "assistant" as const, content: data.analysis },
          ])
          setConversationHistory(data.conversationHistory)
        } else {
          setChatMessages((prev) => [
            ...prev,
            {
              role: "assistant" as const,
              content: data.error || "Analysis failed. Please try again.",
            },
          ])
        }
      } catch (error) {
        console.error("Follow-up error:", error)
        setChatMessages((prev) => [
          ...prev,
          {
            role: "assistant" as const,
            content:
              "Sorry, I could not process your follow-up. Please make sure the backend is running.",
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [activeTab, conversationHistory]
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Wrong Answer Analysis
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Understand your mistakes. Improve your score.
            </p>
          </div>

          {/* Tab Navigation */}
          <nav
            className="flex gap-1 rounded-xl bg-muted p-1"
            role="tablist"
            aria-label="Test type"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setChatMessages([])
                    setLoading(false)
                    setConversationHistory([])
                  }}
                  className="relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  style={
                    isActive
                      ? {
                          backgroundColor: tab.accent,
                          color: "#fff",
                          boxShadow: "0 1px 3px rgba(0,0,0,.12)",
                        }
                      : { color: "hsl(var(--muted-foreground))" }
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left: Form */}
            <section
              className="w-full rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7 lg:w-[60%]"
              aria-label={`${current.label} input form`}
            >
              <div
                className="mb-5 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
                style={{
                  backgroundColor: current.bg,
                  color: current.accent,
                }}
              >
                <current.icon className="h-4 w-4" />
                {current.label}
              </div>

              {activeTab === "lsat" && (
                <LsatLrForm
                  onAnalysisComplete={handleAnalysisComplete}
                  onAnalysisStart={handleAnalysisStart}
                  onReset={handleReset}
                  conversationHistory={conversationHistory}
                  hasAnalysis={chatMessages.length > 0}
                />
              )}
              {activeTab === "sat" && (
                <SatMathForm
                  onReset={handleReset}
                  hasAnalysis={chatMessages.length > 0}
                />
              )}
              {activeTab === "mcat" && (
                <McatCarsForm
                  onReset={handleReset}
                  hasAnalysis={chatMessages.length > 0}
                />
              )}
            </section>

            {/* Right: Chat Analysis */}
            <aside
              className="w-full lg:w-[40%]"
              aria-label="Analysis chat"
            >
              <div className="sticky top-6 h-[calc(100vh-10rem)]">
                <AnalysisPanel
                  accentColor={current.accentHex}
                  messages={chatMessages}
                  loading={loading}
                  onFollowUp={handleFollowUp}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
