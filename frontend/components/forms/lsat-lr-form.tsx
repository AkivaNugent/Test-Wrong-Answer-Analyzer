"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface LsatLrFormProps {
  onAnalysisComplete?: (analysis: string, history: any[]) => void
  onAnalysisStart?: () => void
  onReset?: () => void
  conversationHistory?: any[]
  hasAnalysis?: boolean
}

export function LsatLrForm({
  onAnalysisComplete,
  onAnalysisStart,
  onReset,
  conversationHistory = [],
  hasAnalysis = false,
}: LsatLrFormProps) {
  const [formData, setFormData] = useState({
    stimulus: "",
    question: "",
    selectedAnswer: "",
    correctAnswer: "",
    rationale: "",
    whyWrong: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    onAnalysisStart?.()

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testType: "lsat",
          formData: formData,
          conversationHistory: conversationHistory,
        }),
      })

      const data = await response.json()

      if (data.success) {
        onAnalysisComplete?.(data.analysis, data.conversationHistory || [])
      } else {
        setError(data.error || "Analysis failed")
      }
    } catch (err) {
      setError(
        "Failed to connect to analysis service. Make sure the backend is running on port 5000."
      )
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="lsat-stimulus"
          className="text-sm font-medium text-foreground"
        >
          Stimulus
        </Label>
        <Textarea
          id="lsat-stimulus"
          placeholder="Paste the stimulus text here..."
          rows={7}
          className="resize-y rounded-xl border-[--lsat-border] bg-background focus-visible:ring-[--lsat-accent]"
          value={formData.stimulus}
          onChange={(e) =>
            setFormData({ ...formData, stimulus: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="lsat-question"
          className="text-sm font-medium text-foreground"
        >
          {"Question Stem & Answer Choices"}
        </Label>
        <Textarea
          id="lsat-question"
          placeholder="Paste the question stem and all answer choices..."
          rows={5}
          className="resize-y rounded-xl border-[--lsat-border] bg-background focus-visible:ring-[--lsat-accent]"
          value={formData.question}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">
            Your Answer
          </Label>
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, selectedAnswer: value })
            }
          >
            <SelectTrigger className="rounded-xl border-[--lsat-border] focus:ring-[--lsat-accent]">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {["A", "B", "C", "D", "E"].map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">
            Correct Answer (optional)
          </Label>
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, correctAnswer: value })
            }
          >
            <SelectTrigger className="rounded-xl border-[--lsat-border] focus:ring-[--lsat-accent]">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-">-</SelectItem>
              {["A", "B", "C", "D", "E"].map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="lsat-rationale"
          className="text-sm font-medium text-foreground"
        >
          Your Rationale (optional)
        </Label>
        <Textarea
          id="lsat-rationale"
          placeholder="Walk through your reasoning for picking that answer..."
          rows={4}
          className="resize-y rounded-xl border-[--lsat-border] bg-background focus-visible:ring-[--lsat-accent]"
          value={formData.rationale}
          onChange={(e) =>
            setFormData({ ...formData, rationale: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="lsat-wrong"
          className="text-sm font-medium text-foreground"
        >
          Why you think you got it wrong (optional)
        </Label>
        <Textarea
          id="lsat-wrong"
          placeholder="Any thoughts on where your reasoning went astray..."
          rows={4}
          className="resize-y rounded-xl border-[--lsat-border] bg-background focus-visible:ring-[--lsat-accent]"
          value={formData.whyWrong}
          onChange={(e) =>
            setFormData({ ...formData, whyWrong: e.target.value })
          }
        />
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          className="w-full rounded-xl bg-[--lsat-accent] text-white hover:bg-[--lsat-accent-hover] sm:w-auto"
        >
          Analyze My Answer
        </Button>
        {hasAnalysis && (
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl border-[--lsat-border] text-[--lsat-accent] hover:bg-[--lsat-bg] sm:w-auto"
            onClick={() => {
              setFormData({
                stimulus: "",
                question: "",
                selectedAnswer: "",
                correctAnswer: "",
                rationale: "",
                whyWrong: "",
              })
              setError("")
              onReset?.()
            }}
          >
            Next Question
          </Button>
        )}
      </div>
    </form>
  )
}
