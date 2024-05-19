import { create } from "zustand";
import { PokemonData } from "../types/interfaces";

interface PokemonState {
    data: PokemonData[],
    setData: (data:PokemonData[]) => void;
}

export const usePokemonStore = create<PokemonState>()((set)=>({
    data: [],
    setData: (data) => set({data})
}))
