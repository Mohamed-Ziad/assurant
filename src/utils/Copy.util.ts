export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};

export const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (error) {
    console.error("Failed to paste:", error);
  }
};