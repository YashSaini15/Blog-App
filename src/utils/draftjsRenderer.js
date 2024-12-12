"use client"
import React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';

const DraftJSRenderer = ({ content }) => {
  const contentState = convertFromRaw(JSON.parse(content));
  const editorState = EditorState.createWithContent(contentState);

  return (
    <Editor
      editorState={editorState}
      readOnly={true}
      onChange={() => {}} // Required prop, but does nothing in read-only mode
    />
  );
};

export default DraftJSRenderer;