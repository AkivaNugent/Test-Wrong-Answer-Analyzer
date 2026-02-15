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

export function LsatLrForm() {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="lsat-stimulus" className="text-sm font-medium text-foreground">
          Stimulus
        </Label>
        <Textarea
          id="lsat-stimulus"
          placeholder="Paste the stimulus text here..."
          rows={7}
          className="resize-y rounded-xl border-[--lsat-border] bg-background focus-visible:ring-[--lsat-accent]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="lsat-question" className="text-sm font-medium text-foreground">
          {"Question Stem & Answer Choices"}
        </Label>
        <Textarea
          id="lsat-question"
          placeholder="Paste the question stem and all answer choices..."
          rows={5}
          className="resize-y rounded-xl border-[--lsat-border] bg-background focus-visible:ring-[--lsat-accent]"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Your Answer</Label>
          <Select>
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
          <Select>
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
        <Label htmlFor="lsat-rationale" className="text-sm font-medium text-foreground">
          Your Rationale (optional)
        </Label>
        <Textarea
          id="lsat-rationale"
          placeholder="Walk through your reasoning for picking that answer..."
          rows={4}
          className="resize-y rounded-xl border-[--lsat-border] bg-background focus-visible:ring-[--lsat-accent]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="lsat-wrong" className="text-sm font-medium text-foreground">
          Why you think you got it wrong (optional)
        </Label>
        <Textarea
          id="lsat-wrong"
          placeholder="Any thoughts on where your reasoning went astray..."
          rows={4}
          className="resize-y rounded-xl border-[--lsat-border] bg-background focus-visible:ring-[--lsat-accent]"
        />
      </div>

      <Button
        type="submit"
        className="mt-2 w-full rounded-xl bg-[--lsat-accent] text-white hover:bg-[--lsat-accent-hover] sm:w-auto sm:self-start"
      >
        Analyze My Answer
      </Button>
    </form>
  )
}
