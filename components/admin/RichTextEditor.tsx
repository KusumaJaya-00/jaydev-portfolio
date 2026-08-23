'use client'

import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import {
  Bold, Italic, Strikethrough, Code,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Undo2, Redo2, Pilcrow,
} from 'lucide-react'
import { Label } from '@/components/ui/label'

type Btn = {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick: () => void
}

function ToolBtn({ icon, label, active, onClick }: Btn) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()} // jaga fokus seleksi teks di editor
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`p-1.5 rounded transition-colors ${active ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
    >
      {icon}
    </button>
  )
}

const Divider = () => <span className="w-px h-5 bg-border mx-0.5 inline-block" />

/**
 * Rich text editor (WYSIWYG) berbasis Tiptap.
 * Menyimpan HTML ke form lewat input hidden name="content" — handleSubmit lama tak berubah.
 */
export default function RichTextEditor({ defaultValue = '' }: { defaultValue?: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: defaultValue,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'markdown-body min-h-72 max-h-[28rem] overflow-y-auto px-3 py-2 outline-none',
      },
    },
  })

  // Sinkronkan isi editor -> hidden input name="content"
  useEffect(() => {
    if (!editor) return
    const sync = () => {
      const el = document.querySelector<HTMLInputElement>('input[type=hidden][name="content"]')
      if (el) el.value = editor.getHTML()
    }
    editor.on('update', sync)
    return () => {
      editor.off('update', sync)
    }
  }, [editor])

  if (!editor) return null

  const chain = () => editor.chain().focus()

  return (
    <div className="space-y-1.5">
      <Label>Full Content</Label>
      <input type="hidden" name="content" defaultValue={defaultValue} />
      <div className="notch-sm border border-input bg-muted/40">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5">
          <ToolBtn icon={<Undo2 className="size-4" />} label="Undo" onClick={() => chain().undo().run()} />
          <ToolBtn icon={<Redo2 className="size-4" />} label="Redo" onClick={() => chain().redo().run()} />
          <Divider />
          <ToolBtn icon={<Pilcrow className="size-4" />} label="Paragraph" active={editor.isActive('paragraph')} onClick={() => chain().setParagraph().run()} />
          <ToolBtn icon={<Heading1 className="size-4" />} label="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => chain().toggleHeading({ level: 1 }).run()} />
          <ToolBtn icon={<Heading2 className="size-4" />} label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => chain().toggleHeading({ level: 2 }).run()} />
          <ToolBtn icon={<Heading3 className="size-4" />} label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => chain().toggleHeading({ level: 3 }).run()} />
          <Divider />
          <ToolBtn icon={<Bold className="size-4" />} label="Bold" active={editor.isActive('bold')} onClick={() => chain().toggleBold().run()} />
          <ToolBtn icon={<Italic className="size-4" />} label="Italic" active={editor.isActive('italic')} onClick={() => chain().toggleItalic().run()} />
          <ToolBtn icon={<Strikethrough className="size-4" />} label="Strikethrough" active={editor.isActive('strike')} onClick={() => chain().toggleStrike().run()} />
          <ToolBtn icon={<Code className="size-4" />} label="Code" active={editor.isActive('code')} onClick={() => chain().toggleCode().run()} />
          <Divider />
          <ToolBtn icon={<List className="size-4" />} label="Bullet list" active={editor.isActive('bulletList')} onClick={() => chain().toggleBulletList().run()} />
          <ToolBtn icon={<ListOrdered className="size-4" />} label="Numbered list" active={editor.isActive('orderedList')} onClick={() => chain().toggleOrderedList().run()} />
          <ToolBtn icon={<Quote className="size-4" />} label="Quote" active={editor.isActive('blockquote')} onClick={() => chain().toggleBlockquote().run()} />
          <ToolBtn icon={<Minus className="size-4" />} label="Divider" onClick={() => chain().setHorizontalRule().run()} />
          <Divider />
          <ToolBtn icon={<AlignLeft className="size-4" />} label="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => chain().setTextAlign('left').run()} />
          <ToolBtn icon={<AlignCenter className="size-4" />} label="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => chain().setTextAlign('center').run()} />
          <ToolBtn icon={<AlignRight className="size-4" />} label="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => chain().setTextAlign('right').run()} />
          <ToolBtn icon={<AlignJustify className="size-4" />} label="Justify" active={editor.isActive({ textAlign: 'justify' })} onClick={() => chain().setTextAlign('justify').run()} />
        </div>
        {/* Area edit */}
        <EditorContent editor={editor} />
      </div>
      <p className="text-xs text-muted-foreground">Format tersimpan sebagai HTML.</p>
    </div>
  )
}
