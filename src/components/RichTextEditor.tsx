'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import {
    Bold,
    Italic,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Link as LinkIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Undo,
    Redo,
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: string;
    disabled?: boolean;
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = 'Escribe aquí...',
    height = '400px',
    disabled = false,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
            }),
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editable: !disabled,
        immediatelyRender: false,
    });

    // Sincronizar contenido cuando la prop value cambia (ej: cambiar de deidad)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '', { parseOptions: { preserveWhitespace: 'full' } });
        }
    }, [value, editor]);

    // Actualizar el estado editable cuando cambia el prop disabled
    useEffect(() => {
        if (editor) {
            editor.setEditable(!disabled);
        }
    }, [disabled, editor]);

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = prompt('Ingresa la URL:');
        if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    };

    const ToolbarButton = ({
        icon: Icon,
        onClick,
        isActive = false,
        tooltip = '',
        disabled: isDisabled = false,
    }: {
        icon: any;
        onClick: () => void;
        isActive?: boolean;
        tooltip?: string;
        disabled?: boolean;
    }) => (
        <button
            onClick={onClick}
            disabled={isDisabled || disabled}
            title={tooltip}
            className={`p-2 rounded transition-colors ${isActive
                    ? 'bg-gold-500/30 text-gold-400 border border-gold-500/50'
                    : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600 hover:text-gold-400 border border-dungeon-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            <Icon className="w-4 h-4" />
        </button>
    );

    return (
        <div className="border border-dungeon-600 rounded-lg bg-dungeon-900 overflow-hidden">
            {/* Toolbar */}
            <div className="bg-dungeon-800 border-b border-dungeon-700 p-3 flex flex-wrap gap-1">
                {/* Estilos de texto */}
                <div className="flex gap-1">
                    <ToolbarButton
                        icon={Bold}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        tooltip="Negrita (Ctrl+B)"
                    />
                    <ToolbarButton
                        icon={Italic}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        tooltip="Itálica (Ctrl+I)"
                    />
                    <ToolbarButton
                        icon={Strikethrough}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                        tooltip="Tachado (Ctrl+Shift+X)"
                    />
                </div>

                <div className="w-px bg-dungeon-700" />

                {/* Encabezados */}
                <div className="flex gap-1">
                    <ToolbarButton
                        icon={Heading1}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                        tooltip="Encabezado 1"
                    />
                    <ToolbarButton
                        icon={Heading2}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                        tooltip="Encabezado 2"
                    />
                    <ToolbarButton
                        icon={Heading3}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive('heading', { level: 3 })}
                        tooltip="Encabezado 3"
                    />
                </div>

                <div className="w-px bg-dungeon-700" />

                {/* Listas */}
                <div className="flex gap-1">
                    <ToolbarButton
                        icon={List}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        tooltip="Lista con puntos"
                    />
                    <ToolbarButton
                        icon={ListOrdered}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        tooltip="Lista numerada"
                    />
                </div>

                <div className="w-px bg-dungeon-700" />

                {/* Alineamiento */}
                <div className="flex gap-1">
                    <ToolbarButton
                        icon={AlignLeft}
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        isActive={editor.isActive({ textAlign: 'left' })}
                        tooltip="Alinear izquierda"
                    />
                    <ToolbarButton
                        icon={AlignCenter}
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        isActive={editor.isActive({ textAlign: 'center' })}
                        tooltip="Alinear centro"
                    />
                    <ToolbarButton
                        icon={AlignRight}
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        isActive={editor.isActive({ textAlign: 'right' })}
                        tooltip="Alinear derecha"
                    />
                    <ToolbarButton
                        icon={AlignJustify}
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        isActive={editor.isActive({ textAlign: 'justify' })}
                        tooltip="Justificar"
                    />
                </div>

                <div className="w-px bg-dungeon-700" />

                {/* Links y otros */}
                <div className="flex gap-1">
                    <ToolbarButton
                        icon={LinkIcon}
                        onClick={addLink}
                        isActive={editor.isActive('link')}
                        tooltip="Añadir hiperenlace"
                    />
                    <ToolbarButton
                        icon={Quote}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        tooltip="Cita (blockquote)"
                    />
                </div>

                <div className="w-px bg-dungeon-700" />

                {/* Historial */}
                <div className="flex gap-1">
                    <ToolbarButton
                        icon={Undo}
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        tooltip="Deshacer (Ctrl+Z)"
                    />
                    <ToolbarButton
                        icon={Redo}
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        tooltip="Rehacer (Ctrl+Y)"
                    />
                </div>
            </div>

            {/* Editor Content */}
            <div
                style={{ minHeight: height }}
                className="overflow-auto bg-dungeon-950 p-4"
            >
                <EditorContent
                    editor={editor}
                    className="prose prose-invert prose-sm max-w-none
                        prose-p:text-dungeon-200 prose-p:leading-relaxed
                        prose-headings:text-gold-400 prose-headings:font-cinzel
                        prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                        prose-strong:text-gold-300 prose-strong:font-bold
                        prose-em:italic prose-em:text-dungeon-100
                        prose-a:text-blue-400 prose-a:underline hover:prose-a:text-blue-300
                        prose-ul:text-dungeon-200 prose-ol:text-dungeon-200
                        prose-li:text-dungeon-200 prose-li:leading-relaxed
                        prose-blockquote:border-l-4 prose-blockquote:border-gold-500/50
                        prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-dungeon-300
                        focus:outline-none"
                />
            </div>

            {/* Info */}
            <div className="bg-dungeon-800 border-t border-dungeon-700 px-4 py-2 text-xs text-dungeon-400">
                <p>💡 Tip: Usa Ctrl+Z para deshacer y Ctrl+Y para rehacer</p>
            </div>
        </div>
    );
}
