import React from "react";
import { PokemonData } from "../../types/interfaces";

interface Props {
  data: PokemonData[];
}

const renderData = (data: PokemonData[]) => {
  return data.map((element) => (
    <tr
      key={element.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-600"
    >
      <td className="px-6 py-4">{element.id}</td>
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
        {element.name}
      </td>
      <td className="px-6 py-4 whitespace-normal">
        {element.location?.placeName}
      </td>
    </tr>
  ));
};


export const DataTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative overflow-x-auto rounded-lg max-h-[27em] ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Localización
            </th>
          </tr>
        </thead>
        <tbody>
          {renderData(data).length !== 0 ? (
            renderData(data)
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No data to show.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};