import React from "react";

export const Collaborator = () => {
  return (
    <div className="bg-white border mt-3 shadow-md rounded p-5 justify-between flex items-center">
      <p className="font-bold uppercase text-black">
        Nombre del colaborador
        <span className="text-black lowercase pl-2">
          | EMAIL
        </span>{" "}
      </p>
      <div>

        <button
          className='bg-red-600 p-3 text-white uppercase font-bold text-sm rounded-lg'

        >
          Eliminar
        </button>


      </div>
    </div>
  );
};