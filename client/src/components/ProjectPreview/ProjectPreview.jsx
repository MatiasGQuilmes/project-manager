import React from "react";
import { Link } from "react-router-dom";
export const ProjectPreview = ({name, _id, client}) => {
    return (
        <div className="bg-cyan-600 text-white flex justify-between rounded-lg p-3  mt-3">
            <p className="flex items-center capitalize text-xl">
                {name}
               
            </p>
            <span className="flex items-center text-xl pl-1 capitalize"> {client} </span>
            <Link
                to={`/projects/${_id}`}
                className="ml-4  text-white bg-cyan-900 rounded-lg p-3 uppercase font-bold"
            >Ver proyecto</Link>
        </div>
    );
};

