"use client";

import { useState } from "react";
import { Badge } from "react-bootstrap";
import Swal from "sweetalert2";
interface CopyTextProps {
  text: string;
}
export default function CopiedBadge({ text }: CopyTextProps) {
    const [copied, setCopied] = useState(false);
    
      const handleCopy = async () => {
        if (!text) return;
    
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
    
          setTimeout(() => setCopied(false), 1500);
          Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          }).fire({
            icon: "success",
            title: `${text} Copied!`,
          });
        } catch (error) {
          console.error("Failed to copy:", error);
        }
      };
    
  return (
    <>
      <Badge style={{cursor: "pointer"}} onClick={handleCopy} className="me-1" bg="info">
        {text}
        <i
            className={ "icofont-copy"}
          />
      </Badge>
    </>
  );
}
