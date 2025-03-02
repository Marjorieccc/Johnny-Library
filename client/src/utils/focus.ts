import React from "react";

/**
 * Get a list of HTML Elements that can be focused
 * @param targetRef target DOM node
 * @returns null or a list of focusable elements
 */
export function getFocusList(
  targetRef: HTMLDivElement | null,
  queries: string
) {
  if (!targetRef) return null;

  const focusList = targetRef.querySelectorAll(
    queries
  ) as NodeListOf<HTMLElement>;

  return focusList;
}

/**
 * Trap the focus inside a element
 * @param e keyboard event
 * @param targetRef target DOM node
 * @returns none
 */
export function trapFocus(
  e: React.KeyboardEvent<Element>,
  targetRef: HTMLDivElement,
  queries: string
) {
  const focusableElements = getFocusList(targetRef, queries);

  if (focusableElements && focusableElements.length) {
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
  return;
}
