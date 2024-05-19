import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Cookie } from "../../utils/tools";
import { DataTable } from "../tables/DataTable";
import { usePokemonStore } from "../../store/store";
import { MenuProps } from "../../types/interfaces";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Loading from "../Loading";


const cookie = new Cookie();
export const DraggableMenu: React.FC<MenuProps> = ({
  parentRef,
  className,
  user,
  next,
  prev,
  logout,
  loading,
  locationsLoading
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
    const parent = parentRef?.current;
    const draggable = draggableRef.current;
    if (parent && draggable) {
      setParentRect(parent.getBoundingClientRect());
      setDraggableRect(draggable.getBoundingClientRect());
    }
  }, [parentRef]);

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
          <span className="bg-slate-200 dark:bg-slate-400 px-10 py-1 absolute top-2 rounded-full"></span>
        </div>
        <section className="w-full h-5/6 flex flex-col gap-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col ml-2">
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
          <div className="flex-grow flex flex-col">
          {!loading&&!locationsLoading ? <DataTable data={pokemons} /> : (
            <div className="flex justify-center items-center flex-grow">
              <Loading/>
            </div>
          )}
          </div>
          <div className="flex w-full justify-between">
            <button disabled={loading && true} onClick={() => prev()}>
              prev
            </button>
            <button disabled={loading && true} onClick={() => next()}>
              next
            </button>
          </div>
        </section>
      </div>
    </Draggable>
  );
};
