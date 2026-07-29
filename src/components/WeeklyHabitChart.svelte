<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createRoot, type Root } from 'react-dom/client';
  import React from 'react';
  import WeeklyHabitChartReact from './WeeklyHabitChartReact';
  import type { HabitCard } from '../types';

  interface Props {
    habits: HabitCard[];
    userLevel: number;
  }

  let { habits, userLevel }: Props = $props();

  let containerRef: HTMLDivElement;
  let root: Root | null = null;

  onMount(() => {
    if (containerRef) {
      root = createRoot(containerRef);
      renderChart();
    }
  });

  $effect(() => {
    // Whenever props change in Svelte, trigger React re-render
    if (root) {
      renderChart();
    }
  });

  function renderChart() {
    if (root) {
      root.render(
        React.createElement(WeeklyHabitChartReact, { habits, userLevel })
      );
    }
  }

  onDestroy(() => {
    if (root) {
      root.unmount();
      root = null;
    }
  });
</script>

<div bind:this={containerRef} class="w-full"></div>
