"use client";
import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css"; // Include the Draft.js styles
import { convertToRaw } from "draft-js";
import styles from "./writePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const WritePage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [errors, setErrors] = useState({});
  const { status } = useSession();
  const router = useRouter();
  const rawContent = convertToRaw(editorState.getCurrentContent());
  const desc = JSON.stringify(rawContent);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const uploadToCloudinary = async () => {
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset"); // Replace with your upload preset
      formData.append("cloud_name", "dmxwwdj5y"); // Replace with your cloud name

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dmxwwdj5y/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (data.secure_url) {
          setMedia(data.secure_url);
          toast.success("Image uploaded successfully");
        } else {
          console.error("Upload to Cloudinary failed:", data);
          toast.error("Failed to upload image... Please try again!");
        }
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        toast.error("Server Error... Please try again later!");
      }
    };

    file && uploadToCloudinary();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleInputChange = (value, field) => {
    if (field === "title") {
      setTitle(value);
    } else if (field === "catSlug") {
      setCatSlug(value);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const formValidation = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "*Title is required";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!catSlug) {
      newErrors.catSlug = "*Category is required";
    } else if (catSlug.length < 3) {
      newErrors.catSlug = "Category slug must be at least 3 characters.";
    }

    const hasMeaningfulText = rawContent.blocks.some(
      (block) => block.text.trim().length > 0
    );

    if (!hasMeaningfulText) {
      newErrors.desc =
        "*Please enter a description (at least 10 characters long)";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!formValidation()) {
      toast.error("Please fix the validation errors.");
      return;
    }
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
      setTitle("");
      setCatSlug("");
      setEditorState(EditorState.createEmpty());
      toast.success("Post created successfully!");
    }
  };

  // Handle editor state changes
  const handleEditorChange = (newState) => {
    setEditorState(newState);
    if (errors.desc) {
      setErrors((prevErrors) => ({ ...prevErrors, desc: "" }));
    }
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
      <div className={styles.topContainer}>
        <div>
          <input
            type="text"
            value={title}
            placeholder="Title"
            className={styles.input}
            onChange={(e) => handleInputChange(e.target.value, "title")}
          />
          {errors.title && (
            <p style={{ marginLeft: "16px" }} className={styles.error}>
              {errors.title}
            </p>
          )}
        </div>
        <div className={styles.selectContainer}>
          <select
            className={styles.select}
            onChange={(e) => handleInputChange(e.target.value, "catSlug")}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="style">Style</option>
            <option value="fashion">Fashion</option>
            <option value="food">Food</option>
            <option value="culture">Culture</option>
            <option value="travel">Travel</option>
            <option value="coding">Coding</option>
          </select>
          {errors.catSlug && <p className={styles.error}>{errors.catSlug}</p>}
        </div>
      </div>
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
          {errors.desc && <p className={styles.error}>{errors.desc}</p>}
        </div>
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
