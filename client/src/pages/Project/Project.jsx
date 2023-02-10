import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert } from "../../components/Alert/Alert";
import { Collaborator } from "../../components/Collaborator/Collaborator";
import { Task } from "../../components/Task/Task";
import { useProjects } from "../../hooks/useProjects";

export const Project = () => {

  const {id} = useParams();
  const { loading, alert, getProject, project } = useProjects();

  const { _id ,name, description, dateExpire, client } = project;

  useEffect(() => {
    getProject(id);
  }, [id]);

  if(alert.msg) return <Alert {...alert}/>

  return (
    <>
    <div className="text-white p-4 flex flex-col items-center">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="bg-cyan-600 mt-6 rounded-lg p-4 w-4/5 ">
            <div className="flex justify-between ">
              <h1 className="text-4xl uppercase font-bold">{name}</h1>
              <Link
                to={`/projects/edit-project/${_id}`}
                className="flex justify-center items-center gap-2 text-gray-500 hover:text-black uppercase font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                <p className="text-white">Editar</p>
              </Link>
            </div>
            <h2 className="text-2xl uppercase font-bold text-white mt-1">{client}</h2>
            <hr className="border-b border-white-600 mt-2"/>
            <div className="flex justify-between">
              <p>{description}</p>
              <p>fecha de entrega: {dateExpire && dateExpire.split('T')[0]}</p>
            </div>
          </div>
          <div className="w-4/5">
            <div className="mt-10 rounded-lg flex flex-col items-center ">
              <div className="flex w-full justify-between items-center ">
                <p className="font-bold text-3xl mb-5 flex items-center">Tareas del proyecto</p>
                <div
                  className="flex justify-center items-center gap-1 text-white hover:text-black cursor-pointer bg-green-600 p-3 rounded-lg"
                  /*  onClick={handleModalForm} */
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <p >Nueva Tarea</p>
                </div>
              </div>
              {[1, 2].map((task) => (
                <Task />
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-10 pb-4  " >
              <p className="font-bold text-3xl ">Colaboradores</p>

              <button
                className="flex justify-center items-center gap-1 text-white-500 hover:text-black cursor-pointer bg-green-600 p-3 rounded-lg"
                /* onClick={handleModalAddCollaborator} */
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>

                <p>Agregar Colaborador</p>
              </button>
            </div>
            {[1, 2].map((collaborator) => (
              <Collaborator />
            ))}
          </div>
        </>
      )}
      </div>
    </>
  );
};