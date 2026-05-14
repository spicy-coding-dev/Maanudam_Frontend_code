"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

import { TextStyle } from "@tiptap/extension-text-style";
import { FontSize } from "./fontSize";
import { FontFamily } from "./fontFamily";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

import { useRef, useState } from "react";

import {toast} from "react-toastify";
import axiosInstance from "@/API/axiosInstance";

export default function BookContentEditor() {
  // ✅ MANUAL BOOK ID
  const [bookId, setBookId] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const saveTimer = useRef<any>(null);

  //-------------------------------------------
  // IMAGE UPLOAD
  //-------------------------------------------

  const uploadImage = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be below 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const toastId = toast.loading("Uploading image...");

    try {
      const res = await axiosInstance.post("/admin/books/editor-image", formData);
      toast.success("Image added ✅", { position:"top-right" });

      return res.data?.data.url;
    } catch {
      toast.error("Upload failed ❌", { position:"top-right" });
    }
  };

  //-------------------------------------------
  // AUTOSAVE (ONLY IF BOOK ID EXISTS)
  //-------------------------------------------

  const debouncedSave = (content: string) => {
    if (!bookId) return;

    clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      try {
        console.log("📡 Autosaving for bookId:", bookId);

        await axiosInstance.post(`/admin/books/${bookId}/content`, {
          content,
        });

        console.log("✅ Autosaved");
      } catch {
        console.log("❌ Autosave failed");
      }
    }, 5000);
  };

  //-------------------------------------------
  // EDITOR
  //-------------------------------------------

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),

      // 🔥 ADD LIST EXTENSIONS EXPLICITLY
      // 🔥 LIST EXTENSIONS (ORDER MATTERS)
      ListItem,
      BulletList,
      OrderedList,

      TextStyle,
      Color,
      FontSize,
      FontFamily,
      Bold,
      Highlight.configure({ multicolor: true }),
      Image.configure({ inline: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "புத்தக உள்ளடக்கத்தை இங்கே எழுத தொடங்குங்கள்...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      debouncedSave(editor.getHTML());
    },
  });

  //-------------------------------------------
  // LOAD CONTENT (WHEN BOOK ID ENTERED)
  //-------------------------------------------

  const loadContent = async () => {
    if (!bookId) {
      toast.error("Book ID required");
      return;
    }

    setLoading(true);

    try {
      console.log("📚 Fetching content for:", bookId);

      const res = await axiosInstance.get(`/admin/books/${bookId}/content`);

      console.log(res);
      if (res.data?.data.content && editor) {
        editor.commands.setContent(res.data?.data.content);
      } else {
        // 🧹 safety clear
        editor?.commands.clearContent();
      }

      toast.success(res.data?.message || "Content loaded ✅",{
        position:"top-right"
      });
    } catch (err: any) {
      console.log(err);
      // 🔥 FORCE CLEAR EVEN ON ERROR
      editor?.commands.setContent("");
      toast.error(err.response.data?.message || "Failed to load content ❌",{
        position:"top-right"
      });
    } finally {
      setLoading(false);
    }
  };

  //-------------------------------------------
  // MANUAL SAVE
  //-------------------------------------------

  const saveContent = async () => {
    if (!editor || !bookId) {
      toast.error("Book ID required");
      return;
    }


    try {
          setSaving(true);
      const res = await axiosInstance.post(`/admin/books/${bookId}/content`, {
        content: editor.getHTML(),
      });

      console.log(res);
      toast.success(res.data?.message || "Content saved ✅",{
        position:"top-right"
      });
    } catch {
      toast.error("Save failed ❌",{
        position:"top-right"
      });
    } finally {
      setSaving(false);
    }
  };

  //-------------------------------------------

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="shrink-0 bg-white shadow z-50">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-3 border-b">
          <h1 className="text-2xl text-black font-bold">Content Editor</h1>

          <button
            onClick={saveContent}
            disabled={saving}
            className="px-5 py-2 bg-blue-700 text-white rounded cursor-pointer "
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {/* BOOK ID */}
        <div className="flex gap-3 px-6 py-3 border-b bg-gray-50">
          <input
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            placeholder="Enter Book ID"
            className="border px-3 py-2 border-gray-900 rounded w-64 text-gray-700"
          />

          <button
            onClick={loadContent}
            disabled={loading}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            {loading ? "Loading..." : "Load"}
          </button>
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-wrap gap-2 px-6 py-3 text-gray-700 bg-gray-100 border-b">
          <ToolbarBtn
            onClick={() => editor?.chain().focus().toggleBold().run()}
            label="Bold"
          
          />
          <ToolbarBtn
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            label="Italic"
          />
          <ToolbarBtn
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            label="• List"
          />
          <ToolbarBtn
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            label="1. List"
          />

          <select
            onChange={(e) =>
              editor?.chain().focus().setFontSize(e.target.value).run()
            }
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Size</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="18px">18</option>
            <option value="22px">22</option>
            <option value="26px">26</option>
            <option value="32px">32</option>
          </select>

          <select
            onChange={(e) =>
              editor?.chain().focus().setFontFamily(e.target.value).run()
            }
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Font</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Noto Serif Tamil">Noto Serif Tamil</option>
            <option value="Latha">Latha (Tamil)</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Oswald">Oswald</option>
          </select>

          <input
            type="color"
            onChange={(e: any) =>
              editor?.chain().focus().setColor(e.target.value).run()
            }
          />

          <input
            type="color"
            onInput={(e: any) =>
              editor
                ?.chain()
                .focus()
                .toggleHighlight({ color: e.target.value })
                .run()
            }
          />

          <ToolbarBtn
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            label="Left"
          />
          <ToolbarBtn
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            label="Center"
          />
          <ToolbarBtn
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            label="Right"
          />

          <ToolbarBtn
            label="Clear"
            onClick={() =>
              editor?.chain().focus().unsetAllMarks().clearNodes().run()
            }
          />

          <ToolbarBtn
            label="Image"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";

              input.onchange = async () => {
                if (!input.files?.length) return;
                const url = await uploadImage(input.files[0]);
                if (!url) return;
                editor?.chain().focus().setImage({ src: url }).run();
              };

              input.click();
            }}
          />
        </div>
      </div>

      {/* SCROLLABLE EDITOR ONLY */}
      <div className="flex-1 overflow-y-auto py-6">
        <EditorContent
          editor={editor}
          className="
    prose prose-lg prose-black
    max-w-none
    bg-white
    p-10
    min-h-full
    rounded-xl
    shadow
  "
        />
      </div>
    </div>
  );
}

//----------------------------------
// TOOLBAR BUTTON
//----------------------------------

function ToolbarBtn({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-sm border rounded-md bg-white hover:bg-gray-100 "
    >
      {label}
    </button>
  );
}
