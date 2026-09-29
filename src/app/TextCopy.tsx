"use client";

import { useState } from "react";

const GRAY: any = "#6b7280";
const GREEN: any = "#15803d";

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

/**
 * Click anywhere on the text to copy it.
 *
 * <CopyText text="123456789" />                     normal
 * <CopyText text="iPhone 15 Pro" bold />            bold
 * <CopyText text="123456789123456" mono />          monospace numbers
 * <CopyText text="A2484" icon={false} />            without the icon
 * <CopyText text="927468125">Item 927468125</CopyText>   show something different from what is copied
 */
export default function CopyText({ text, children, bold, mono, icon = true, className = "", style }: any) {
  const [copied, setCopied] = useState<any>(false);
  const [hover, setHover] = useState<any>(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(text ?? ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e: any) {}
  };

  return (
    <button
      type="button"
      onClick={copy}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={copied ? "Copied" : "Click to copy"}
      className={`${bold ? "fw-semibold" : ""} ${mono ? "font-monospace" : ""} ${className}`}
      style={{
        all: "unset",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        borderRadius: 4,
        padding: "0 3px",
        margin: "0 -3px",
        fontWeight: bold ? 600 : "inherit",
        fontFamily: mono ? "var(--bs-font-monospace)" : "inherit",
        color: copied ? GREEN : "inherit",
        background: hover ? "#f3f4f6" : "transparent",
        transition: "background .15s, color .15s",
        ...style,
      }}
    >
      {children ?? text}
      {icon && (
        <span style={{ color: copied ? GREEN : GRAY, opacity: copied || hover ? 1 : 0.6, display: "inline-flex" }}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </span>
      )}
    </button>
  );
}
