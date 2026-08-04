import { scale, fade } from 'svelte/transition';
import { backOut, cubicIn } from 'svelte/easing';

export function popIn(node: Element) {
  return scale(node, { duration: 220, start: 0.88, easing: backOut });
}

export function popOut(node: Element) {
  return scale(node, { duration: 150, start: 0.94, easing: cubicIn });
}

export function overlayFade(node: Element) {
  return fade(node, { duration: 200 });
}
