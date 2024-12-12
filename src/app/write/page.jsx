"use client";
import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css"; // Include the Draft.js styles
import styles from "./writePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const WritePage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    return null;
  }
  // Handle editor state changes
  const handleEditorChange = (newState) => {
    setEditorState(newState);
  };

  // Handle text formatting (bold, italic, etc.)
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const toggleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const toggleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const toggleStrikethrough = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const toggleCode = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "CODE"));
  };

  const toggleSuperscript = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "SUPERSCRIPT"));
  };

  const toggleSubscript = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "SUBSCRIPT"));
  };

  const toggleMonospace = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "MONOSPACE"));
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <div className={styles.editorStyles}>
          <div className={styles.buttonContainer}>
            <button className={styles.formatButton} onClick={toggleBold}>
              Bold
            </button>
            <button className={styles.formatButton} onClick={toggleItalic}>
              Italic
            </button>
            <button className={styles.formatButton} onClick={toggleUnderline}>
              Underline
            </button>
            <button
              className={styles.formatButton}
              onClick={toggleStrikethrough}
            >
              Strikethrough
            </button>
            <button className={styles.formatButton} onClick={toggleCode}>
              Code
            </button>
            <button className={styles.formatButton} onClick={toggleSuperscript}>
              Superscript
            </button>
            <button className={styles.formatButton} onClick={toggleSubscript}>
              Subscript
            </button>
            <button className={styles.formatButton} onClick={toggleMonospace}>
              Monospace
            </button>
          </div>
          <div className={styles.editorContainer}>
            <Editor
              editorState={editorState}
              onChange={handleEditorChange}
              handleKeyCommand={handleKeyCommand}
              placeholder="Tell your story..."
            />
          </div>
        </div>
      </div>
      <button className={styles.publish} onClick={() => {}}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
