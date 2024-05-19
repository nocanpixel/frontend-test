import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useGeolocation } from '../../hooks/useGeolocation';
import Loading from '../Loading';
import { usePokemonStore } from '../../store/store';
import { useEffect } from 'react';

const Map = () => {
  const {currentLocation} = useGeolocation();
  const pokemons = usePokemonStore((state) => state.data);

  useEffect(()=>{
    console.log(pokemons)
  },[pokemons])

  if (!currentLocation) {
    return <div className='w-full dark:bg-slate-900 h-screen flex justify-center items-center'>
      <Loading/>
    </div>;
  }
  const { latitude, longitude } = currentLocation;

  return (
<MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {pokemons && (
    pokemons.map((pokemon, index) => (
      pokemon.location?.latitude !== undefined && pokemon.location?.longitude !== undefined && (
        <Marker position={[pokemon.location.latitude, pokemon.location.longitude]} key={index}>
          <Popup>
            {pokemon.name}
          </Popup>
        </Marker>
      )
    ))
  )}
</MapContainer>

  );
};

export default Map;

