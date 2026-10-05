/** Color palette shared by every page, so the same meaning always uses the same color. */
export const COLORS = {
  white: "#ffffff",

  gray900: "#111827",
  gray700: "#374151",
  gray600: "#4b5563",
  gray500: "#6b7280",
  gray400: "#9ca3af",
  gray300: "#d1d5db",
  gray200: "#e5e7eb",
  gray100: "#f3f4f6",
  gray50: "#f9fafb",
  divider: "#f0f1f3",

  success: "#15803d",
  successBackground: "#f0fdf4",
  successBorder: "#bbf7d0",
  successText: "#14532d",

  danger: "#b91c1c",
  dangerBackground: "#fef2f2",
  dangerBorder: "#fecaca",
  dangerText: "#7f1d1d",

  info: "#1d4ed8",
  infoBackground: "#eff6ff",
  infoBorder: "#bfdbfe",
  infoText: "#1e3a8a",
  infoBannerBackground: "#f8faff",

  questionLabel: "#363636",
  legacyPanelBackground: "#f6f6f6",
  redesignedPanelBackground: "#f3f6f9",

  pendingBorder: "#eef0f2",
  spinnerTrack: "#cbd5e1",
} as const;
