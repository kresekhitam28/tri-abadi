export function containDialogTab(event) {
  if (event.key !== "Tab") return;

  const controls = Array.from(event.currentTarget.querySelectorAll("button, a[href]")).filter(
    (element) => element.tabIndex >= 0 && !element.matches(":disabled") &&
      !element.closest("[inert]") && element.getClientRects().length > 0,
  );
  const first = controls[0];
  const last = controls.at(-1);
  const boundary = event.shiftKey ? first : last;

  if (boundary && document.activeElement === boundary) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  }
}
