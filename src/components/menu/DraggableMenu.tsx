import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Cookie } from "../../utils/tools";
import { DataTable } from "../tables/DataTable";
import { usePokemonStore } from "../../store/store";
import { MenuProps } from "../../types/interfaces";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Loading from "../Loading";
import { useGeolocation } from "../../hooks/useGeolocation";

const cookie = new Cookie();
export const DraggableMenu: React.FC<MenuProps> = ({
  parentRef,
  className,
  user,
  next,
  prev,
  logout,
  loading,
  locationsLoading,
  pokemonsFound,
}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>(
    cookie.position() || {
      x: 0,
      y: 486,
    }
  );
  const [parentRect, setParentRect] = useState<DOMRect | null>(null);
  const [draggableRect, setDraggableRect] = useState<DOMRect | null>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  const pokemons = usePokemonStore((state) => state.data);
  const { error } = useGeolocation();

  const bounds = useMemo(() => {
    if (!parentRect || !draggableRect) {
      return { top: 0, bottom: 0 };
    }
    return {
      top: 20,
      bottom: parentRect.height - draggableRect.height / 15,
    };
  }, [parentRect, draggableRect]);

  const handleDrag = (_e: DraggableEvent, ui: DraggableData) => {
    const { y } = position;
    const newY = Math.max(bounds.top, Math.min(bounds.bottom, y + ui.deltaY));
    setPosition({ x: 0, y: newY });
  };

  const handleDragEnd = (_e: DraggableEvent, ui: DraggableData) => {
    cookie.setPosition({ x: 0, y: ui.y });
  };

  useEffect(() => {
    if (parentRef?.current && draggableRef.current) {
      setParentRect(parentRef.current.getBoundingClientRect());
      setDraggableRect(draggableRef.current.getBoundingClientRect());
    }
  }, [parentRef]);


  const isDisabled = loading || locationsLoading;
  const loadingOrError = error ? (
    <div className="flex-grow flex flex-col justify-center items-center">
      <span>The geolocation service was cancelled.</span>
      <span className="text-slate-400 text-sm">
        {"Please reload the page and try again."}
      </span>
    </div>
  ) : (
    <div className="flex-grow flex flex-col justify-center">
      {!loading && !locationsLoading ? (
        <DataTable data={pokemons} />
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loading />
            <div className="flex flex-col items-center">
              <span>Looking for pokemons...</span>
              <span className="text-slate-400 text-sm">
                Pokemons found{" "}
                <span className="font-bold dark:text-white text-black">
                  {pokemonsFound}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Draggable
      axis="y"
      position={position}
      onDrag={handleDrag}
      onStop={handleDragEnd}
      nodeRef={draggableRef}
      bounds={{ top: bounds.top, bottom: bounds.bottom }}
      handle=".draggable"
    >
      <div
        ref={draggableRef}
        className={`w-full absolute z-[500] px-4 border bg-slate-50 border-slate-200 dark:border-none shadow-[0_15px_60px_-15px_rgba(0,0,0,0.3)] dark:bg-slate-800 h-dvh rounded-t-3xl ${className} `}
      >
        <div className="draggable cursor-grab w-full flex justify-center h-10">
          <span className="bg-slate-200 dark:bg-slate-500 px-6 py-[2.4px] absolute top-2 rounded-full"></span>
        </div>
        <section className="w-full h-5/6 flex flex-col gap-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col ml-2">
              <span>Hi, {user?.name}</span>
              <span className="dark:text-slate-400 text-sm">{user?.email}</span>
            </div>
            <button
              onClick={() => logout()}
              disabled={(isDisabled&&!error) && true}
              className={`${(isDisabled&&!error)?'flex gap-2 opacity-65':'flex gap-2 hover:opacity-80'}`}
            >
              <span>{"Logout"}</span>
              <ArrowLeftEndOnRectangleIcon className="w-6" />
            </button>
          </div>
          <div className="flex-grow flex flex-col">
            {loadingOrError}
          </div>
          <div className="flex w-full justify-between">
            <button className={`${(isDisabled)?'opacity-60':''}`} disabled={(isDisabled) && true} onClick={() => prev()}>
              prev
            </button>
            <button className={`${(isDisabled)?'opacity-60':''}`} disabled={(isDisabled) && true} onClick={() => next()}>
              next
            </button>
          </div>
        </section>
      </div>
    </Draggable>
  );
};
