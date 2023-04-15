"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = ({ content }) => {
    const tiptap = useEditor({
        extensions: [StarterKit],
        content: "<p>Hello World! 🌎️</p>",
    });

    return <EditorContent editor={tiptap} />;
};

export default Editor;
