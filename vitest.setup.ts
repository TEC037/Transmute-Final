// vitest.setup.ts
import '@testing-library/jest-dom';

// Minimal Web Animations API polyfill for jsdom.
// Svelte 5 transitions (fade/scale/popIn/...) are driven by element.animate(),
// which jsdom does not implement.
class MockAnimation {
  onfinish: ((this: Animation, ev: Event) => unknown) | null = null;
  effect: unknown = null;
  playState: AnimationPlayState = 'running';
  currentTime = 0;

  cancel() {
    this.playState = 'idle';
    this.currentTime = 0;
  }
  play() {
    this.playState = 'running';
  }
  pause() {
    this.playState = 'paused';
  }
  finish() {
    this.playState = 'finished';
    this.onfinish?.call(this, new Event('finish'));
  }
}

if (typeof Element !== 'undefined') {
  if (typeof Element.prototype.animate !== 'function') {
    Element.prototype.animate = function (
      _keyframes: PropertyIndexedKeyframes | Keyframe[] | null,
      options?: number | KeyframeAnimationOptions
    ) {
      return new MockAnimation() as unknown as Animation;
    };
  }
  if (typeof Element.prototype.getAnimations !== 'function') {
    Element.prototype.getAnimations = function () {
      return [];
    };
  }
}
