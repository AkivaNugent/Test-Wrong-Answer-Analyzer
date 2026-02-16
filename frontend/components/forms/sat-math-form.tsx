"use client"

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

interface SatMathFormProps {
  onReset?: () => void
  hasAnalysis?: boolean
}

export function SatMathForm({ onReset, hasAnalysis = false }: SatMathFormProps) {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="sat-problem" className="text-sm font-medium text-foreground">
          Problem
        </Label>
        <Textarea
          id="sat-problem"
          placeholder="Paste the math problem here..."
          rows={5}
          className="resize-y rounded-xl border-[--sat-border] bg-background focus-visible:ring-[--sat-accent]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sat-choices" className="text-sm font-medium text-foreground">
          Answer Choices
        </Label>
        <Textarea
          id="sat-choices"
          placeholder="List the answer choices (A through D)..."
          rows={3}
          className="resize-y rounded-xl border-[--sat-border] bg-background focus-visible:ring-[--sat-accent]"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Your Answer</Label>
          <Select>
            <SelectTrigger className="rounded-xl border-[--sat-border] focus:ring-[--sat-accent]">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {["A", "B", "C", "D"].map((opt) => (
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
          <Select>
            <SelectTrigger className="rounded-xl border-[--sat-border] focus:ring-[--sat-accent]">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-">-</SelectItem>
              {["A", "B", "C", "D"].map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sat-work" className="text-sm font-medium text-foreground">
          Your Work (optional)
        </Label>
        <Textarea
          id="sat-work"
          placeholder="Show your work or approach to solving the problem..."
          rows={4}
          className="resize-y rounded-xl border-[--sat-border] bg-background focus-visible:ring-[--sat-accent]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sat-stuck" className="text-sm font-medium text-foreground">
          Where you got stuck (optional)
        </Label>
        <Textarea
          id="sat-stuck"
          placeholder="Describe where you hit a wall or got confused..."
          rows={4}
          className="resize-y rounded-xl border-[--sat-border] bg-background focus-visible:ring-[--sat-accent]"
        />
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          className="w-full rounded-xl bg-[--sat-accent] text-white hover:bg-[--sat-accent-hover] sm:w-auto"
        >
          Analyze My Answer
        </Button>
        {hasAnalysis && (
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl border-[--sat-border] text-[--sat-accent] hover:bg-[--sat-bg] sm:w-auto"
            onClick={() => onReset?.()}
          >
            Next Question
          </Button>
        )}
      </div>
    </form>
  )
}
