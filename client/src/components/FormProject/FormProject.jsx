import { get } from "mongoose";
import React, { useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useProjects } from "../../hooks/useProjects";
import { Alert } from "../Alert/Alert";

export const FormProject = () => {


    const { alert, showAlert, storeProject, project } =  useProjects()

    const {id} = useParams();

    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputDateExpire = useRef(null);
    const inputClient = useRef(null);



   

    const {formValues, handleInputChange, reset, setFormValues} = useForm({
        name: "",
        description: "",
        dateExpire: "",
        client: ""
    })

    let {name, description, dateExpire, client} = formValues;
    
    //const {name, description, dateExpire, client} = project;

    useEffect(() => {
        if(id){
 
            inputName.current.value = project.name;
            inputDescription.current.value = project.description;
            inputDateExpire.current.value = project.dateExpire.split('T')[0];
            inputClient.current.value = project.client;       

            setFormValues({
                name : project.name,
                description : project.description,
                dateExpire : project.dateExpire.split('T')[0],
                client : project.client,
            })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if([name, description, dateExpire, client].includes("")){
            showAlert("Todos los compos son obligatorios!")
            return null
        }

   

        storeProject({
            id: id ? id : null,
            name,
            description,
            dateExpire,
            client
        })

    }
    
    return (
        <form
            onSubmit={handleSubmit} 
            className="flex flex-col mt-5 rounded-lg bg-white p-5"
        >
            {
                alert.msg && <Alert {...alert}/>
            }

            <div>
                <label
                    htmlFor="name"
                    className="font-bold"
                >
                    Nombre Proyecto
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del proyecto"
                    className="border-2 w-full border-cyan-600 rounded-lg p-2 outline-cyan-500"
                    value={name}
                    name="name"
                    onChange={handleInputChange}
                    ref={inputName}
                />
            </div>
            <div  className="mt-2 ">
                <label
                    htmlFor="description"
                    className="font-bold"
                
                >
                    Descripción
                </label>
                <textarea
                    id="description"
                    type="text"
                    style={{ resize: "none" }}
                    placeholder="Descripción del proyecto"
                    className="border-2 border-cyan-600 rounded-lg p-2 w-100 w-full outline-cyan-500 "
                    value={description}
                    name="description"
                    onChange={handleInputChange}
                    ref={inputDescription}
                />
            </div>
            <div className="mt-2">
                <label
                    htmlFor="date-expire"
                    className="font-bold"
                >
                    Fecha de entrega
                </label>
                <input
                    id="date-expire"
                    type="date"
                    className="border-2 border-cyan-600 rounded-lg p-2 w-100  w-full outline-cyan-500 "
                    value={dateExpire}
                    name="dateExpire"
                    onChange={handleInputChange}
                    ref={inputDateExpire}
                />
            </div>
            <div className="mt-2">
                <label
                    htmlFor="client"
                    className="font-bold "
                >
                    Nombre del Cliente
                </label>
                <input
                    id="client"
                    type="text"
                    placeholder="Nombre del cliente"
                    className="border-2 border-cyan-600 rounded-lg p-2 w-100  w-full outline-cyan-500 "
                    value={client}
                    name="client"
                    onChange={handleInputChange}
                    ref={inputClient}
                />
            </div>
            <button className="text-white font-bold text-lg bg-cyan-600 rounded-lg border-cyan-900 p-2 mt-4">
             {/*   {_id ? "guardar" : "actualizar"}  */}
                guardar
            </button>
        </form>
    );
};