import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert } from "../../components/Alert/Alert";
import { clientAxios } from "../../config/clientAxios";
import Swal from "sweetalert2";
import clasesRecover from "./recover.module.css"

export const RecoverPassword = () => {

    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState("");
    const [tokenChecked, setTokenChecked] = useState(false)

    const {token} = useParams();
    const navigate = useNavigate();


    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })

         setTimeout(()=>{
            setAlert({});
        }, 10000)
    }


    useEffect(()=>{

        const checkToken = async () => {
            try {

                const {data} = await clientAxios.get(`/auth/reset-password?token=${token}`);
                console.log(data.msg);
                setTokenChecked(true)

            } catch (error) {
                console.error(error);
                handleShowAlert(error.response?.data.msg)
            }
        }

        checkToken();

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

      

        if(!password){
            handleShowAlert('el password es requerido')
            return null;
        }

        try {
            const {data} = await clientAxios.post(`/auth/reset-password?token=${token}`,{
                password
            })
    
            Swal.fire({
                icon: 'success',
                title: 'la contraseña se ha actualizado con exito',
                text: data.msg,
                confirmButtonText: "Inicia Sesion",
                allowOutsideClick : false
              }).then(result => {
                if(result.isConfirmed){
                    setPassword("");
                    navigate('/')
                }
              })
        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg)
            setPassword("");
        }

        

    }

    return(  
        <>

            <div className={clasesRecover.fondoRecover}>
                <h1 className="capitalize text-xl">Reestablecé tu contraseña</h1>
                {
                    alert.msg && <Alert {...alert} />
                }
                { 
                    tokenChecked ?
                
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div 
                                className={clasesRecover.divInput}
                            >
                                <img 
                                className={clasesRecover.icons}
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQBJREFUSEvllesNAUEURs9WICpAB1SADnSACkQF6EAHdEAJVEAH6EAH5EtmY+3M7OzDJpuYPzvZzP3Ofc3ciJpXVLM+eQETYAGMjEMnYAPom7nyAPbA1KMiyDqLEALI84MRWAJHs58BK7MfZ0USAigFQ0Di25Sn8lyQcyJ1VjAhwMtYtIFnyroL3Mw/r05egO9c7ECzAGrFHaAUFFl3YJ4uuCs0HewUUU6clW0vaesCBPPqgTvt/gsQF18ZsooJVE5RsvhWMX8NeDjauHIEfeBiOmgAXFPdVBkgvawWbg5Ar2ar5E22auO6aGpHTbGiz4XENYi+xmjouS4ZyMesdsAb5eE6GS7S/pcAAAAASUVORK5CYII="/>     
                                    {/* <label htmlFor="password">Nueva contraseña</label> */}
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Escribí tu nueva contraseña"
                                        value={password} 
                                        className={clasesRecover.input}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                            </div>
                            <button
                                type="submit"
                                className="mt-4"
                            >
                                Resetear contraseña
                            </button>
                        </form> 
                        :    
                        <nav className="text-white mt-4 flex flex-col">
                            <Link
                                to={"/register"}
                                className="mt-2"
                            >
                                ¿No tenés una cuenta? Registrate
                            </Link>
                            <Link
                                to={"/"}
                                className="mt-2"
                            >
                                ¿Estás registrado? Iniciá sesión
                            </Link>
                        </nav>
        
                    
                }
            </div>
           
        </>
  )
}


