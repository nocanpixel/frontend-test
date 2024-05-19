import React from "react";
import { MenuProps } from "../../types/interfaces";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { usePokemonStore } from "../../store/store";
import { DataTable } from "../tables/DataTable";
import Loading from "../Loading";

export const SideMenu: React.FC<MenuProps> = ({
  className,
  user,
  logout,
  loading,
  next,
  prev,
  locationsLoading
}) => {
  const pokemons = usePokemonStore((state) => state.data);
  return (
    <section
      className={`h-dvh dark:bg-slate-900 px-4 py-8 ${className}`}
    >
      <div className="flex flex-col gap-4 md:w-[20em] lg:w-[25em]">
        <div className="flex justify-between rounded-lg items-center bg-slate-50 dark:bg-slate-800 p-6">
          <div className="flex flex-col">
            <span>Hi, {user?.name}</span>
            <span className="dark:text-slate-400 text-sm">{user?.email}</span>
          </div>
          <button
            onClick={() => logout()}
            className="flex gap-2 cursor-pointer hover:opacity-65"
          >
            <span>{"Logout"}</span>
            <ArrowLeftEndOnRectangleIcon className="w-6" />
          </button>
        </div>
        <div className="flex-grow flex flex-col justify-center">
          {!loading&&!locationsLoading ? <DataTable data={pokemons} /> : (
            <div className="flex justify-center">
              <Loading/>
            </div>
          )}
        </div>
        <div className="flex w-full py-3 px-6 rounded-lg justify-between bg-slate-50 dark:bg-slate-800">
          <button disabled={loading && true} onClick={() => prev()}>
            prev
          </button>
          <button disabled={loading && true} onClick={() => next()}>
            next
          </button>
        </div>
      </div>
    </section>
  );
};
