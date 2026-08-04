<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    term?: string;
    content: string;
    children?: Snippet;
  }

  let { term = '', content, children }: Props = $props();
</script>

<style>
  .tooltip {
    position: relative;
    cursor: help;
    border-bottom: 2px dashed currentColor;
  }
  .tooltip::after {
    content: attr(data-content);
    position: absolute;
    left: 50%;
    top: calc(100% + 10px);
    transform: translateX(-50%);
    width: max-content;
    max-width: 220px;
    background: #fff;
    color: #1a1c1c;
    border: 2.5px solid #000;
    box-shadow: 4px 4px 0 0 #000;
    padding: 0.4rem 0.6rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: normal;
    text-align: left;
    z-index: 50;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.12s ease-in-out;
  }
  .tooltip:hover::after {
    opacity: 1;
  }
</style>

<!-- If children are provided, render them; otherwise render the term -->
<span class="tooltip" data-content={content}>
  {#if children}
    {@render children()}
  {:else}
    {term}
  {/if}
</span>
