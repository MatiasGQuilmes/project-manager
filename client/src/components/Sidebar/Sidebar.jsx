import React from "react";
import { Link } from "react-router-dom";
export const Sidebar = () => {

    // const {name} = ;

    return (
        <aside className="flex justify-between p-4 bg-cyan-900 ">
              <p className="text-white flex items-center">Hola!</p>
            <Link to="create-project" className="text-white bg-cyan-600 rounded-lg border p-3 font-bold uppercase hover:bg-white hover:text-cyan-600"><span className="text-2xl">+</span>  Nuevo proyecto</Link>
        </aside>
    );
};