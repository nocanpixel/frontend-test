export interface Auth {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  rol: string;
}

export interface Position {
  x:number;
  y:number;
}

export interface Location {
  placeName: string;
  latitude: number;
  longitude: number;
}

export interface PokemonData {
  name: string;
  id: number;
  location?: Location;
}

export interface MenuProps {
  parentRef?: React.RefObject<HTMLElement>;
  className?: string;
  user?: User;
  next: () => void;
  prev: () => void;
  logout: () => void;
  loading: boolean;
  locationsLoading: boolean;
  pokemonsFound: number;
}