import { create } from "zustand";

interface Gamestate {
    currentRound: number
    errors: number

    nextRound: () => void
    prevRound: () => void
    registerError: () => void
}

export const useRoundStore = create<Gamestate>((set) => ({
    currentRound: 1,
    errors: 0,
    nextRound: () =>
        set((state) => ({
            currentRound: Math.min(state.currentRound + 1, 8),
            errors: 0
        })),
    prevRound: () =>
        set((state) => ({
            currentRound: Math.max(state.currentRound - 1, 1),
            errors: 0
        })),
    registerError: () =>
        set((state) => ({ errors: state.errors + 1 })),
}))