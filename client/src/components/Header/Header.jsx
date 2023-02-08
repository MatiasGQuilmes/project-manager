import React from "react";
import { Link } from "react-router-dom";
export const Header = () => {
    return (
        <div >
            <div  className="flex justify-between pt-4 pb-4 pl-4 pr-4 bg-cyan-600">
                <h2 className="flex items-center text-white uppercase font-bold tracking-wider">Projects Manager</h2>
               
                <div className="flex justify-around items-center w-100 ">
                    <Link
                        to='/projects'
                        className="pr-5 uppercase font-bold "
                    >   
                    <p className="hover:bg-sky-700 p-2 rounded-lg text-cyan-900 bg-white"> Proyectos</p>
                       
                    </Link>
                    <button
                        type="button"
                        className="border-sky-100 text-white bg-cyan-900 p-2 border rounded-lg "
                    /* onClick={closeSession} */
                    >
                        Cerrar Sesión
                    </button>
                </div>
        
            </div>
            <div className="flex justify-between bg-white p-2 pr-4 pl-4 ">
                <p className="text-black flex items-center">Hola: Nombre de usuario</p>
                 <input className="rounded-lg p-1 outline-cyan-500 border-2 border-cyan-500" type="text" placeholder=" Buscar proyecto..." />
            </div>
        </div>
    );
};
