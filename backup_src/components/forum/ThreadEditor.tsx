'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import Image from '@tiptap/extension-image';
import { Markdown } from '@tiptap/markdown';
import Toolbar from '../tiptap/Toolbar';

interface PostEditorProps {
    value: string;
    onChange: (md: string) => void;
    onJsonChange?: (json: any) => void;
    canUploadImages: boolean;
    onUploadImage?: (file: File) => Promise<string>;
}

export default function ThreadEditor({ value, onChange, onJsonChange, canUploadImages, onUploadImage }: PostEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder: 'Escribe tu mensaje aquí... (Soporta Markdown)',
            }),
            CharacterCount.configure({
                limit: 10000,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Youtube.configure({
                controls: false,
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg border border-dungeon-700 max-h-[500px] object-contain',
                },
            }),
            Markdown,
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none min-h-[300px] p-4 focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            const content = (editor.storage as any).markdown.getMarkdown();
            onChange(content);
            if (onJsonChange) {
                onJsonChange(editor.getJSON());
            }
        },
    });

    if (!editor) {
        return <div className="text-dungeon-500 p-4">Cargando editor...</div>;
    }

    return (
        <div className="w-full flex flex-col rounded-xl overflow-hidden border border-dungeon-700 bg-dungeon-950" >
            <Toolbar
                editor={editor}
                showPreview={false}
                onTogglePreview={() => { }} // Preview handled by parent for now
                canUploadImages={canUploadImages}
                onUploadImage={onUploadImage}
            />
            <div className="bg-dungeon-950">
                <EditorContent editor={editor} />
            </div>
            <div className="px-4 py-2 bg-dungeon-900/50 border-t border-dungeon-800 text-xs text-dungeon-500 flex justify-end">
                {editor.storage.characterCount.characters()} caracteres
            </div>
        </div >
    );
}
