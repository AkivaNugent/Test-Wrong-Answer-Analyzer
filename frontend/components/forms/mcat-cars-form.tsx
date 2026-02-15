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

export function McatCarsForm() {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="mcat-passage" className="text-sm font-medium text-foreground">
          Passage
        </Label>
        <Textarea
          id="mcat-passage"
          placeholder="Paste the full passage here..."
          rows={9}
          className="resize-y rounded-xl border-[--mcat-border] bg-background focus-visible:ring-[--mcat-accent]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="mcat-question" className="text-sm font-medium text-foreground">
          {"Question & Answers"}
        </Label>
        <Textarea
          id="mcat-question"
          placeholder="Paste the question and answer choices..."
          rows={5}
          className="resize-y rounded-xl border-[--mcat-border] bg-background focus-visible:ring-[--mcat-accent]"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Your Answer</Label>
          <Select>
            <SelectTrigger className="rounded-xl border-[--mcat-border] focus:ring-[--mcat-accent]">
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
            <SelectTrigger className="rounded-xl border-[--mcat-border] focus:ring-[--mcat-accent]">
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
        <Label htmlFor="mcat-reasoning" className="text-sm font-medium text-foreground">
          Your Reasoning (optional)
        </Label>
        <Textarea
          id="mcat-reasoning"
          placeholder="Explain the reasoning behind your answer choice..."
          rows={4}
          className="resize-y rounded-xl border-[--mcat-border] bg-background focus-visible:ring-[--mcat-accent]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="mcat-notes" className="text-sm font-medium text-foreground">
          Passage comprehension notes (optional)
        </Label>
        <Textarea
          id="mcat-notes"
          placeholder="Note any parts of the passage you found confusing..."
          rows={4}
          className="resize-y rounded-xl border-[--mcat-border] bg-background focus-visible:ring-[--mcat-accent]"
        />
      </div>

      <Button
        type="submit"
        className="mt-2 w-full rounded-xl bg-[--mcat-accent] text-white hover:bg-[--mcat-accent-hover] sm:w-auto sm:self-start"
      >
        Analyze My Answer
      </Button>
    </form>
  )
}
