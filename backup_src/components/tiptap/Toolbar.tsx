'use client';

import { Editor } from '@tiptap/react';
import { useRef } from 'react';
import {
    Bold, Italic, Underline, List, ListOrdered,
    Code, Quote, Heading1, Heading2, Heading3, Link as LinkIcon,
    Image as ImageIcon, Youtube, AlignLeft, AlignCenter, AlignRight,
    Undo, Redo
} from 'lucide-react';

interface ToolbarProps {
    editor: Editor | null;
    showPreview: boolean;
    onTogglePreview: () => void;
    canUploadImages?: boolean;
    onUploadImage?: (file: File) => Promise<string>;
}

export default function Toolbar({
    editor,
    showPreview,
    onTogglePreview,
    canUploadImages = false,
    onUploadImage
}: ToolbarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!editor) return null;

    const Button = ({ onClick, active, title, children, disabled = false }: any) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`p-1.5 rounded-md transition-all duration-200 ${disabled
                ? 'opacity-30 cursor-not-allowed text-dungeon-500'
                : active
                    ? 'bg-gold-500 text-dungeon-950 shadow-sm'
                    : 'hover:bg-dungeon-800 text-dungeon-400 hover:text-dungeon-200'
                }`}
            title={title}
        >
            {children}
        </button>
    );

    const Divider = () => <div className="w-px h-5 bg-dungeon-800 mx-1" />;

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL del enlace:', previousUrl);

        if (url === null) return;

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = async () => {
        if (canUploadImages && onUploadImage) {
            fileInputRef.current?.click();
        } else {
            const url = window.prompt('URL de la imagen:');
            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
            }
        }
    };

    const addYoutube = () => {
        const url = window.prompt('URL del video de YouTube:');
        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
            });
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !onUploadImage) return;

        try {
            const url = await onUploadImage(file);
            editor.chain().focus().setImage({ src: url }).run();
        } catch (error) {
            alert('Error al subir la imagen');
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            <div className="flex items-center gap-0.5 p-2 bg-dungeon-900 border-b border-dungeon-800 flex-wrap sticky top-0 z-10">
                {/* History */}
                <Button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Deshacer (Ctrl+Z)"
                >
                    <Undo className="w-4 h-4" />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Rehacer (Ctrl+Y)"
                >
                    <Redo className="w-4 h-4" />
                </Button>

                <Divider />

                {/* Text formatting */}
                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                    title="Negrita (Ctrl+B)"
                >
                    <Bold className="w-4 h-4" />
                </Button>

                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                    title="Cursiva (Ctrl+I)"
                >
                    <Italic className="w-4 h-4" />
                </Button>

                <Button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive('underline')}
                    title="Subrayado (Ctrl+U)"
                >
                    <Underline className="w-4 h-4" />
                </Button>

                <Divider />

                {/* Headings */}
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive('heading', { level: 1 })}
                    title="Encabezado 1"
                >
                    <Heading1 className="w-4 h-4" />
                </Button>

                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                    title="Encabezado 2"
                >
                    <Heading2 className="w-4 h-4" />
                </Button>

                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                    title="Encabezado 3"
                >
                    <Heading3 className="w-4 h-4" />
                </Button>

                <Divider />

                {/* Alignment */}
                <Button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    active={editor.isActive({ textAlign: 'left' })}
                    title="Alinear a la izquierda"
                >
                    <AlignLeft className="w-4 h-4" />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    active={editor.isActive({ textAlign: 'center' })}
                    title="Centrar"
                >
                    <AlignCenter className="w-4 h-4" />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    active={editor.isActive({ textAlign: 'right' })}
                    title="Alinear a la derecha"
                >
                    <AlignRight className="w-4 h-4" />
                </Button>

                <Divider />

                {/* Lists */}
                <Button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                    title="Lista con viñetas"
                >
                    <List className="w-4 h-4" />
                </Button>

                <Button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                    title="Lista numerada"
                >
                    <ListOrdered className="w-4 h-4" />
                </Button>

                <Divider />

                {/* Blockquote and Code */}
                <Button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                    title="Cita"
                >
                    <Quote className="w-4 h-4" />
                </Button>

                <Button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    active={editor.isActive('codeBlock')}
                    title="Bloque de código"
                >
                    <Code className="w-4 h-4" />
                </Button>

                <Divider />

                {/* Media */}
                <Button
                    onClick={setLink}
                    active={editor.isActive('link')}
                    title="Insertar enlace (Ctrl+K)"
                >
                    <LinkIcon className="w-4 h-4" />
                </Button>

                <Button
                    onClick={addImage}
                    title="Insertar imagen"
                >
                    <ImageIcon className="w-4 h-4" />
                </Button>

                <Button
                    onClick={addYoutube}
                    active={editor.isActive('youtube')}
                    title="Insertar video de YouTube"
                >
                    <Youtube className="w-4 h-4" />
                </Button>
            </div>
        </>
    );
}
