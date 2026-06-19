import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  RemoveFormatting,
  Undo2,
  Unlink
} from "lucide-react";
import { useEffect } from "react";

function ToolbarButton({ active = false, disabled = false, label, onClick, children }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-md transition disabled:cursor-not-allowed disabled:opacity-35 ${
        active ? "bg-brand-100 text-brand-700" : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value = "", onChange, placeholder = "Start writing...", minHeight = "280px" }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } })
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-neutral max-w-none px-4 py-4 text-sm leading-7 outline-none"
      }
    },
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getHTML())
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "", { emitUpdate: false });
  }, [editor, value]);

  if (!editor) return null;

  function setLink() {
    const current = editor.getAttributes("link").href || "";
    const href = window.prompt("Enter a link URL", current);
    if (href === null) return;
    if (!href.trim()) return editor.chain().focus().extendMarkRange("link").unsetLink().run();
    editor.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run();
  }

  const buttons = [
    ["Bold", Bold, editor.isActive("bold"), () => editor.chain().focus().toggleBold().run()],
    ["Italic", Italic, editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run()],
    ["Heading", Heading2, editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run()],
    ["Bullet list", List, editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run()],
    ["Numbered list", ListOrdered, editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run()],
    ["Quote", Quote, editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run()]
  ];

  return (
    <div className="mt-2 overflow-hidden rounded-md border border-neutral-300 bg-white focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/10">
      <div className="flex flex-wrap items-center gap-1 border-b border-neutral-200 bg-neutral-50 p-2">
        {buttons.map(([label, Icon, active, action]) => (
          <ToolbarButton key={label} label={label} active={active} onClick={action}><Icon size={17} /></ToolbarButton>
        ))}
        <span className="mx-1 h-6 w-px bg-neutral-200" />
        <ToolbarButton label="Add link" active={editor.isActive("link")} onClick={setLink}><Link2 size={17} /></ToolbarButton>
        <ToolbarButton label="Remove link" disabled={!editor.isActive("link")} onClick={() => editor.chain().focus().unsetLink().run()}><Unlink size={17} /></ToolbarButton>
        <ToolbarButton label="Clear formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}><RemoveFormatting size={17} /></ToolbarButton>
        <span className="mx-1 h-6 w-px bg-neutral-200" />
        <ToolbarButton label="Undo" disabled={!editor.can().chain().focus().undo().run()} onClick={() => editor.chain().focus().undo().run()}><Undo2 size={17} /></ToolbarButton>
        <ToolbarButton label="Redo" disabled={!editor.can().chain().focus().redo().run()} onClick={() => editor.chain().focus().redo().run()}><Redo2 size={17} /></ToolbarButton>
      </div>
      <div style={{ minHeight }} className="relative" data-placeholder={placeholder}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
