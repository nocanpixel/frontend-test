import { useEffect, useRef } from "react";
import { withAuthentication } from "../helpers/withAuthentication";
import { Cookie } from "../utils/tools";
import { useNavigate } from "react-router-dom";
import { DraggableMenu } from "../components/menu/DraggableMenu";
import { useFetchPokemons } from "../hooks/useFetchPokemons";
import { usePokemonStore } from "../store/store";
import { SideMenu } from "../components/menu/SideMenu";
import Map from "../components/map/Map";
import './styles.css';

const cookie = new Cookie();

export const Home = withAuthentication(({user}) => {
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const {pokemons,next,prev, loading, locationsLoading} = useFetchPokemons();

  const handleLogout = () => {
    cookie.removeUser();
    cookie.setAuth(0);
    navigate("/login");
  };

  return (
    <section
      ref={parentRef}
      className="parent-container relative h-screen w-full overflow-hidden "
    >
      <DraggableMenu user={user} locationsLoading={locationsLoading} prev={prev} loading={loading} next={next} logout={handleLogout} className={`md:hidden`} parentRef={parentRef} />
      <div className="flex">
      <SideMenu user={user} locationsLoading={locationsLoading} prev={prev} loading={loading} next={next} logout={handleLogout} className={`hidden md:flex`} />
      <div className="leaflet-container">
      <Map/>
      </div>
      </div>
    </section>
  );
});
