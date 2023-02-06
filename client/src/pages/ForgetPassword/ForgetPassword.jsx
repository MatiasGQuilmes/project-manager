import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert/Alert";
import { clientAxios } from "../../config/clientAxios";
import Swal from "sweetalert2";
import clasesForget from "./forget-password.module.css"

export const ForgetPassword = () => {

    const [alert, setAlert] = useState({});
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!email) {
            handleShowAlert('el email es requerido')
            return null;
        }
        
        try {
            setSending(true)

            const {data} = await clientAxios.post('/auth/sendToken',{
                email
            })

            setSending(false)

            Swal.fire({
                icon: 'info',
                title: 'Chequea tu casilla del correo',
                text: data.msg,
                confirmButtonText: "Entendido",
                allowOutsideClick : false
              }).then(result => {
                if(result.isConfirmed){
                  navigate('/')
                }
            })

            setEmail("");
          
            
        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg)
            setEmail("");
        }

    }

    
    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })
    
        setTimeout(()=>{
            setAlert({});
        }, 3000)
      }

  return (
    <>
        <div className={clasesForget.fondoForget}>
            <h1 
                className="text-white text-center text-xl mb-5 tracking-[.15em] capitalize border-b"
            > Recupera tu acceso </h1>

            {
                alert.msg && <Alert {...alert} />
            }

            <form
                onSubmit={handleSubmit}
            >
                <div 
                     className={clasesForget.divInput}
                >
                     <img
                className={clasesForget.icons}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR1JREFUSEvdleFNw0AMhb9MABsAG8AEwAawAZ2gMAl0ArpB2QCYAEaADdoJQB+ypVNIyjVRhFT/SZSz37OffU7DxNZMjM9+EVwAj8DxSNk+gBnwIk4pkQdHI8EzXKyTNsFXnJ4B7wOJToG3iP1JvqwgCdZR4tOOJFch8eFfBIn7ANxVkug7b/n2ViDofTjbqGvAqrrMbFeAA6KVsb0EHqil4AcBftnRF32eAUk2QWLvUuqtBGZjoH04j+xugUXxnlW+AuqfVVYTlL1IfZfx8SaeEkpc2s4EBpuh4EqmKYkkXZM2iEBQNS8r6LsrgwkqJ7a+ybWAbb//q8AxyyYOzT7jPnMrl7vI22gTx25UwZ2wX+t6bNad8fv1y5xEom9+ED0ZymZNKwAAAABJRU5ErkJggg=="/>
                    {/* <label htmlFor="email" >Correo electrónico</label> */}
                    <input
                        className={clasesForget.input}
                        id="email"
                        type="email"
                        placeholder="Ingresá tu email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div 
                    className="w-100 text-center "
                >
                    <button
                        type="submit"
                        disabled={sending}
                        className="text-white mt-4 border-b"
                    >
                        Recuperar contraseña
                    </button>
                </div>
            </form>
            <nav
                 className="text-white mt-3 flex flex-col"
            >
                <Link
                    to={"/register"}
                   
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
        </div>
    </>

  )
}

