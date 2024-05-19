import { useCallback, useEffect, useState } from "react";
import pokeApi from "../api/pokemons";
import { Location, PokemonData } from "../types/interfaces";
import { useGeolocation } from "./useGeolocation";
import { usePokemonStore } from "../store/store";

interface Results {
  name: string;
  url: string;
}

interface Page {
  next: string;
  previous: string | null;
  results: Results[];
}


export const useFetchPokemons = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [page, setPage] = useState<Page>({
    next: "",
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const {getRandomLocationDetails, getCurrentLocation} = useGeolocation();
  const [locationsLoading, setLocationsLoading] = useState<boolean>(false);
  const setGlobalState = usePokemonStore((state)=> state.setData);

  const fetchPokemons = useCallback(async () => {
    try {
      const response = await pokeApi.getAllPokemons();
      setPage(response.data);
      fetchPokemonDetails(response.data.results)
      localStorage.setItem("page", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  }, []);


  const fetchPokemonDetails = useCallback(async (results: Results[]) => {
    try {
      setLocationsLoading(true);
      const pokemonData = await Promise.all(
        results.map(async (pokemon:{url:string}) => {
          const detailsResponse = await pokeApi.getPokemonsDetails(pokemon.url);
          return detailsResponse.data;
        })
      );

      const cLocation = await getCurrentLocation();
      const randomLocations = await getRandomLocationsBatch(cLocation.latitude, cLocation.longitude, results.length);
      setLocationsLoading(false);

      const dataPromises = pokemonData.map(async (pokemon: {id:number,name:string}, index: number) => ({
        id: pokemon.id,
        name: pokemon.name,
        location: randomLocations[index],
      }));
    
      const resolvedData = await Promise.all(dataPromises);
      setPokemons(resolvedData);
      setGlobalState(resolvedData);
      localStorage.setItem("pokemons", JSON.stringify(resolvedData));
      
    } catch (error) {
      console.error("Error fetching pokemon details:", error);
    }
  }, [page.results]);

  const getRandomLocationsBatch = async (latitude: number, longitude: number, count: number): Promise<Location[]> => {
    const batch = [];
    for (let i = 0; i < count; i++) {
      const randomLocation = await getRandomLocationDetails(latitude, longitude);
      batch.push(randomLocation);
    }
    return batch;
  };
  
  const next = useCallback(async () => {
    if (!page.next) return;
    setLoading(true);
    try {
      const response = await pokeApi.next(page.next);
      setPage(response.data);
      fetchPokemonDetails(response.data.results);
      localStorage.setItem("page", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching next page:", error);
    } finally {
      setLoading(false);
    }
  }, [page.next]);
  
  const prev = useCallback(async () => {
    if (!page.previous) return;
    setLoading(true);
    try {
      const response = await pokeApi.prev(page.previous);
      setPage(response.data);
      fetchPokemonDetails(response.data.results);
      localStorage.setItem("page", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching previous page:", error);
    } finally {
      setLoading(false);
    }
  }, [page.previous]);

  
  useEffect(() => {
    const cachedPage = localStorage.getItem("page");
    const cachedPokemon = localStorage.getItem("pokemons");
    if (cachedPage&&cachedPokemon) {
      const cachedData = JSON.parse(cachedPage);
      const cachedPokemonData = JSON.parse(cachedPokemon);
      setPage(cachedData);
      setPokemons(cachedPokemonData);
      setGlobalState(cachedPokemonData);
    } else {
      fetchPokemons();
    }
  }, [next,prev]);


  return { pokemons, next, prev, page, loading, locationsLoading };
};
