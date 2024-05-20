import { useRef } from "react";
import { withAuthentication } from "../helpers/withAuthentication";
import { Cookie } from "../utils/tools";
import { useNavigate } from "react-router-dom";
import { DraggableMenu } from "../components/menu/DraggableMenu";
import { useFetchPokemons } from "../hooks/useFetchPokemons";
import { SideMenu } from "../components/menu/SideMenu";
import Map from "../components/map/Map";
import './styles.css';

const cookie = new Cookie();

export const Home = withAuthentication(({user}) => {
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const { next,prev, loading, locationsLoading, pokemonsFound} = useFetchPokemons();

  const handleLogout = () => {
    cookie.removeUser();
    cookie.setAuth(0);
    navigate("/login");
  };

  return (
    <section
      ref={parentRef}
      className="parent-container relative h-dvh w-full overflow-hidden "
    >
      <DraggableMenu pokemonsFound={pokemonsFound} user={user} locationsLoading={locationsLoading} prev={prev} loading={loading} next={next} logout={handleLogout} className={`md:hidden`} parentRef={parentRef} />
      <div className="flex">
      <SideMenu pokemonsFound={pokemonsFound} user={user} locationsLoading={locationsLoading} prev={prev} loading={loading} next={next} logout={handleLogout} className={`hidden md:flex`} />
      <div className="leaflet-container">
      <Map/>
      </div>
      </div>
    </section>
  );
});
