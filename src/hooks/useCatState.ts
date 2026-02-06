import { useState, useCallback, useEffect } from "react";
import { TimeOfDay } from "./useTimeOfDay";

export type CatMood = "sleeping" | "awake" | "playful" | "purring" | "startled" | "judgmental";
export type CatPersonality = "playful" | "sleepy" | "curious" | "aloof-soft";

interface CatState {
  name: string;
  personality: CatPersonality;
  mood: CatMood;
  hasBeenIntroduced: boolean;
  interactionCount: number;
  cardsDiscovered: number;
}

const STORAGE_KEY = "pocket-cat-state";

const defaultState: CatState = {
  name: "",
  personality: "curious",
  mood: "sleeping",
  hasBeenIntroduced: false,
  interactionCount: 0,
  cardsDiscovered: 0,
};

export function useCatState(timeOfDay: TimeOfDay) {
  const [state, setState] = useState<CatState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Update mood based on time of day
  useEffect(() => {
    if (state.mood === "sleeping" && !state.hasBeenIntroduced) return;
    if (state.mood === "startled" || state.mood === "judgmental") return;

    const timeMoods: Record<TimeOfDay, CatMood> = {
      morning: "awake",
      afternoon: "playful",
      evening: "awake",
      night: "sleeping",
    };
    
    setState(prev => ({ ...prev, mood: timeMoods[timeOfDay] }));
  }, [timeOfDay, state.hasBeenIntroduced]);

  const setName = useCallback((name: string) => {
    setState(prev => ({ ...prev, name }));
  }, []);

  const setPersonality = useCallback((personality: CatPersonality) => {
    setState(prev => ({ ...prev, personality }));
  }, []);

  const markIntroduced = useCallback(() => {
    setState(prev => ({ ...prev, hasBeenIntroduced: true, mood: "awake" }));
  }, []);

  const setMood = useCallback((mood: CatMood) => {
    setState(prev => ({ ...prev, mood }));
  }, []);

  const interact = useCallback(() => {
    setState(prev => ({ ...prev, interactionCount: prev.interactionCount + 1 }));
  }, []);

  const discoverCard = useCallback(() => {
    setState(prev => ({ ...prev, cardsDiscovered: prev.cardsDiscovered + 1 }));
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  }, []);

  return {
    ...state,
    setName,
    setPersonality,
    markIntroduced,
    setMood,
    interact,
    discoverCard,
    resetAll,
  };
}
