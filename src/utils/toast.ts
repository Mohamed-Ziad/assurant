import Swal from "sweetalert2";

const TOAST_DURATION_MS = 3000;

/** Shows a small success message in the bottom-right corner. It pauses while the mouse is over it. */
export function showSuccessToast(title: string): void {
  const toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: TOAST_DURATION_MS,
    timerProgressBar: true,
    didOpen: (toastElement) => {
      toastElement.onmouseenter = Swal.stopTimer;
      toastElement.onmouseleave = Swal.resumeTimer;
    },
  });

  toast.fire({ icon: "success", title });
}
