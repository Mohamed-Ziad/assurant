"use client";

import type { CSSProperties, ReactNode } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import { classNames } from "@/utils/classNames";
import Icon from "./Icon";
import styles from "./CopyableText.module.css";

interface CopyableTextProps {
  /** The value placed on the clipboard. */
  text: string;
  /** What the value is, for the "copied" message. For example "Item number". */
  label: string;
  /** Set to false for text that is not an ID, such as a model name. The message then has no "#". */
  isIdentifier?: boolean;
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
 * <CopyableText text="123456789123456" label="IMEI number" monospace />
 * <CopyableText text="iPhone 15 Pro" label="Model" isIdentifier={false} bold />
 * <CopyableText text="927468125" label="Item number">Item 927468125</CopyableText>
 */
export default function CopyableText({
  text,
  label,
  isIdentifier = true,
  children,
  bold = false,
  monospace = false,
  showIcon = true,
  className,
  style,
}: CopyableTextProps) {
  const { isCopied, copy } = useClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(text, label, isIdentifier)}
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
