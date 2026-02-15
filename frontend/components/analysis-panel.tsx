import { MessageSquare } from "lucide-react"

interface AnalysisPanelProps {
  accentColor: string
}

export function AnalysisPanel({ accentColor }: AnalysisPanelProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <MessageSquare
          className="h-7 w-7"
          style={{ color: accentColor }}
        />
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
