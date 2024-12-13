"use client";
import React from "react";
import { convertFromRaw, ContentState } from "draft-js";
import DraftJSRenderer from "./draftjsRenderer";

const truncateDraftContent = (content, maxLength = 60) => {
  try {
    // Parse the content
    const contentState = convertFromRaw(JSON.parse(content));

    // Get the first block's text
    const firstBlockText = contentState.getFirstBlock().getText();

    // Truncate the text
    const truncatedText =
      firstBlockText.length > maxLength
        ? firstBlockText.slice(0, maxLength).trim() + "..."
        : firstBlockText;

    // Create a new content state with truncated text
    const truncatedContentState = ContentState.createFromText(truncatedText);

    // Convert to raw for DraftJSRenderer
    return JSON.stringify({
      blocks: truncatedContentState.getBlocksAsArray().map((block) => ({
        text: block.getText(),
        type: block.getType(),
        depth: block.getDepth(),
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      })),
      entityMap: {},
    });
  } catch (error) {
    console.error("Error truncating Draft.js content:", error);
    return content; // Fallback to original content if there's an error
  }
};

const TruncatedDraftJSRenderer = ({ content, maxLength = 60 }) => {
  // Only truncate if content exists and is longer than desired length
  const processedContent = content
    ? truncateDraftContent(content, maxLength)
    : content;

  return processedContent ? (
    <DraftJSRenderer content={processedContent} />
  ) : null;
};

export default TruncatedDraftJSRenderer;
