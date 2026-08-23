'use client'

import { useMemo, useState } from 'react'
import { Eye } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { renderMarkdown } from '@/lib/markdown'

/**
 * Textarea markdown + panel live preview berdampingan (stack di mobile).
 * Tetap menyimpan nilai ke form lewat name="content" agar handleSubmit lama tidak berubah.
 */
export default function MarkdownEditor({ defaultValue = '' }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue)
  const preview = useMemo(() => renderMarkdown(value), [value])

  return (
    <div className="space-y-1.5">
      <Label htmlFor="content">Full Content (Markdown)</Label>
      <div className="grid md:grid-cols-2 gap-3">
        <Textarea
          id="content"
          name="content"
          rows={12}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="## Overview..."
        />
        <div className="notch-sm border border-input bg-muted/40 px-3 py-2 overflow-auto max-h-96">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Eye className="size-3" /> Preview
          </p>
          <div
            className="markdown-body text-sm"
            data-testid="markdown-preview"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      </div>
    </div>
  )
}
