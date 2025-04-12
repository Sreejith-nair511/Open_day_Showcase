"use client"

import { useEffect, useState } from "react"
import Editor from "@monaco-editor/react"
import { Loader2 } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
}

export default function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/30">
        <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading editor...</span>
      </div>
    )
  }

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={value}
      value={value}
      onChange={(value) => onChange(value || "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: !isMobile },
        fontSize: isMobile ? 12 : 14,
        wordWrap: "on",
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        tabSize: 2,
        automaticLayout: true,
        padding: { top: 10 },
        folding: !isMobile,
        lineDecorationsWidth: isMobile ? 5 : 10,
      }}
      loading={
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      }
    />
  )
}
