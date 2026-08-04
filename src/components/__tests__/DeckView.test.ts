// DeckView.test.ts

import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import DeckView from '$components/DeckView.svelte';
import type { HabitCard } from '../../types';

function makeHabit(overrides: Partial<HabitCard> = {}): HabitCard {
  return {
    id: '1',
    title: 'Test Habit',
    category: 'Diario',
    streak: 0,
    targetType: 'checkbox',
    currentCount: 0,
    targetCount: 1,
    unit: 'sesión',
    completed: false,
    minLevel: 1,
    xpReward: 10,
    ...overrides,
  };
}

function renderDeck(habits: HabitCard[], overrides: Partial<Record<string, unknown>> = {}) {
  return render(DeckView, {
    props: {
      habits,
      userLevel: 1,
      onToggleHabit: vi.fn(),
      onFailHabit: vi.fn(),
      onRestoreHabit: vi.fn(),
      onIncrementCounter: vi.fn(),
      onOpenNewHabitModal: vi.fn(),
      onEditHabitRequest: vi.fn(),
      onDeleteHabit: vi.fn(),
      onOpenDailyShare: vi.fn(),
      ...overrides,
    },
  });
}

function getPendingCard(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-habit-card]') as HTMLElement;
}

function swipeCard(card: HTMLElement, toX: number, toY = 100) {
  fireEvent.pointerDown(card, { clientX: 0, clientY: 0 });
  fireEvent.pointerMove(card, { clientX: toX, clientY: toY });
  fireEvent.pointerUp(card, { clientX: toX, clientY: toY });
}

afterEach(() => {
  vi.useRealTimers();
});

describe('DeckView', () => {
  test('renders habit title and XP reward', () => {
    const { getByText } = renderDeck([makeHabit()]);
    expect(getByText('Test Habit')).toBeInTheDocument();
    expect(getByText('+10 XP')).toBeInTheDocument();
  });

  test('swiping right past threshold completes the habit', () => {
    vi.useFakeTimers();
    const onToggleHabit = vi.fn();
    const { container } = renderDeck([makeHabit()], { onToggleHabit });
    swipeCard(getPendingCard(container), 200);
    vi.advanceTimersByTime(400);
    expect(onToggleHabit).toHaveBeenCalledWith('1');
  });

  test('swiping right on a counter increments without leaving the deck', () => {
    const onIncrementCounter = vi.fn();
    const onToggleHabit = vi.fn();
    const { container } = renderDeck(
      [makeHabit({ targetType: 'counter', currentCount: 0, targetCount: 3 })],
      { onIncrementCounter, onToggleHabit }
    );
    swipeCard(getPendingCard(container), 200);
    expect(onIncrementCounter).toHaveBeenCalledWith('1');
    expect(onToggleHabit).not.toHaveBeenCalled();
  });

  test('swiping right on a counter reaching its target completes the habit', () => {
    vi.useFakeTimers();
    const onIncrementCounter = vi.fn();
    const { container } = renderDeck(
      [makeHabit({ targetType: 'counter', currentCount: 2, targetCount: 3 })],
      { onIncrementCounter }
    );
    swipeCard(getPendingCard(container), 200);
    vi.advanceTimersByTime(400);
    expect(onIncrementCounter).toHaveBeenCalledWith('1');
  });

  test('swiping left opens the failure acknowledgment modal', () => {
    const { container, getByText } = renderDeck([makeHabit()]);
    swipeCard(getPendingCard(container), -200);
    expect(getByText('Reconocimiento del Fallo')).toBeInTheDocument();
  });

  test('confirming the failure swipes left and calls onFailHabit', () => {
    vi.useFakeTimers();
    const onFailHabit = vi.fn();
    const { container, getByText } = renderDeck([makeHabit()], { onFailHabit });
    swipeCard(getPendingCard(container), -200);
    fireEvent.click(getByText('Sí, reconozco mi fallo'));
    vi.advanceTimersByTime(400);
    expect(onFailHabit).toHaveBeenCalledWith('1');
  });

  test('cancelling the failure modal keeps the habit pending', () => {
    vi.useFakeTimers();
    const onFailHabit = vi.fn();
    const onToggleHabit = vi.fn();
    const { container, getByText } = renderDeck([makeHabit()], { onFailHabit, onToggleHabit });
    swipeCard(getPendingCard(container), -200);
    fireEvent.click(getByText('Cancelar'));
    vi.advanceTimersByTime(400);
    expect(onFailHabit).not.toHaveBeenCalled();
    expect(onToggleHabit).not.toHaveBeenCalled();
  });

  test('a small drag below the threshold does not resolve the habit', () => {
    const onToggleHabit = vi.fn();
    const { container } = renderDeck([makeHabit()], { onToggleHabit });
    swipeCard(getPendingCard(container), 50);
    expect(onToggleHabit).not.toHaveBeenCalled();
  });

  test('completed habit renders in Realizados and restore calls onRestoreHabit', () => {
    const onRestoreHabit = vi.fn();
    const { getByText, getByTitle } = renderDeck([makeHabit({ completed: true })], { onRestoreHabit });

    expect(getByText('Realizados')).toBeInTheDocument();
    expect(getByText('Completado · +10 XP')).toBeInTheDocument();

    fireEvent.click(getByTitle('Deshacer completado'));
    expect(onRestoreHabit).toHaveBeenCalledWith('1');
  });

  test('failed habit renders in No Realizados and restore calls onRestoreHabit', () => {
    const onRestoreHabit = vi.fn();
    const { getByText, getByTitle } = renderDeck(
      [makeHabit({ completed: false, failed: true })],
      { onRestoreHabit }
    );

    expect(getByText('No Realizados')).toBeInTheDocument();
    expect(getByText('Fallo reconocido · Racha 0')).toBeInTheDocument();

    fireEvent.click(getByTitle('Volver a pendientes'));
    expect(onRestoreHabit).toHaveBeenCalledWith('1');
  });
});
