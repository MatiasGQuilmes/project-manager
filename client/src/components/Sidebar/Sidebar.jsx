import React from "react";
import { Link } from "react-router-dom";
export const Sidebar = () => {
    return (
        <aside className="flex justify-end p-4 bg-cyan-900 ">

            <Link to="create-project" className="text-white bg-cyan-600 rounded-lg border p-3 font-bold uppercase">Nuevo proyecto</Link>
        </aside>
    );
};