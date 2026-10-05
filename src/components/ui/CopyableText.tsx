"use client";

import type { CSSProperties, ReactNode } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import { classNames } from "@/utils/classNames";
import Icon from "./Icon";
import styles from "./CopyableText.module.css";

const COPY_KEY = "text";

interface CopyableTextProps {
  /** The value placed on the clipboard. */
  text: string;
  /** What to show instead of `text`, when it should look different from what is copied. */
  children?: ReactNode;
  bold?: boolean;
  monospace?: boolean;
  showIcon?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Text that is copied to the clipboard when clicked.
 *
 * <CopyableText text="123456789123456" monospace />
 * <CopyableText text="iPhone 15 Pro" bold />
 * <CopyableText text="927468125">Item 927468125</CopyableText>
 */
export default function CopyableText({
  text,
  children,
  bold = false,
  monospace = false,
  showIcon = true,
  className,
  style,
}: CopyableTextProps) {
  const { copiedKey, copy } = useClipboard();
  const isCopied = copiedKey === COPY_KEY;

  return (
    <button
      type="button"
      onClick={() => copy(text, COPY_KEY)}
      title={isCopied ? "Copied" : "Click to copy"}
      className={classNames(
        styles.copyable,
        isCopied && styles.copied,
        bold && "fw-semibold",
        monospace && "font-monospace",
        className,
      )}
      style={style}
    >
      {children ?? text}
      {showIcon && (
        <span className={styles.icon}>
          <Icon name={isCopied ? "check" : "copy"} size={14} />
        </span>
      )}
    </button>
  );
}
