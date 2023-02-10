import React from "react";
import { Link } from "react-router-dom";
export const ProjectPreview = ({name, _id, client}) => {
    return (
        <div className="  bg-cyan-600 text-white min-[440px]:flex justify-between rounded-lg p-3  mt-3 ">
            <p className="flex items-center justify-center capitalize text-xl m-2">
                {name}
               
            </p>
            <span className="flex justify-center items-center text-xl pl-1 capitalize m-2"> {client} </span>
            <Link
                to={`/projects/${_id}`}
                className="ml-4 flex justify-center text-white bg-cyan-900 rounded-lg p-3 uppercase font-bold m-2"
            >Ver proyecto</Link>
        </div>
    );
};

