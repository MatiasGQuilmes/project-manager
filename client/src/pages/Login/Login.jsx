import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alert } from "../../components/Alert/Alert"
import { clientAxios } from "../../config/clientAxios"
import { useForm } from "../../hooks/useForm"
import { useAuth } from "../../hooks/useAuth"
import clasesLogin from "./login.module.css"
import 'boxicons'
import { Header } from "../../components/Header/Header"

export const Login = () => {

    const [alert, setAlert] = useState({});
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const handleShowAlert = (msg, time = true) => {
        setAlert({
            msg
        })

        if (time) {
            setTimeout(() => {
                setAlert({});
            }, 3000)
        }

        reset()
    }

    const { formValues, handleInputChange, reset } = useForm({
        email: "",
        password: ""
    })

    const { email, password } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            handleShowAlert("Todos los compos son obligatorios!")
            return null
        }

        try {
            const { data } = await clientAxios.post('/auth/login', {
                email,
                password
            })

            console.log(data);



            setAuth(data.user)
            sessionStorage.setItem('token', data.token)

            navigate('/projects')

        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg)

        }



    }




    return (
        <>
            <div className="flex justify-center">
                <div className={clasesLogin.fondoLogin}>




                    <h1 className="text-white text-center text-xl ">Iniciá Sesión</h1>
                    {
                        alert.msg && <Alert {...alert} />
                    }
                    <form
                        onSubmit={handleSubmit}
                        className={clasesLogin.form}
                    >
                        <div className={clasesLogin.divInput}>
                            {/* <label 
                    htmlFor="email"
                >
                    Correo electrónico
                </label> */}
                            <img
                                className={clasesLogin.icons}
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR1JREFUSEvdleFNw0AMhb9MABsAG8AEwAawAZ2gMAl0ArpB2QCYAEaADdoJQB+ypVNIyjVRhFT/SZSz37OffU7DxNZMjM9+EVwAj8DxSNk+gBnwIk4pkQdHI8EzXKyTNsFXnJ4B7wOJToG3iP1JvqwgCdZR4tOOJFch8eFfBIn7ANxVkug7b/n2ViDofTjbqGvAqrrMbFeAA6KVsb0EHqil4AcBftnRF32eAUk2QWLvUuqtBGZjoH04j+xugUXxnlW+AuqfVVYTlL1IfZfx8SaeEkpc2s4EBpuh4EqmKYkkXZM2iEBQNS8r6LsrgwkqJ7a+ybWAbb//q8AxyyYOzT7jPnMrl7vI22gTx25UwZ2wX+t6bNad8fv1y5xEom9+ED0ZymZNKwAAAABJRU5ErkJggg==" />
                            <input

                                id="email"
                                type="email"
                                placeholder="Email"
                                className={clasesLogin.input}
                                name="email"
                                value={email}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className={clasesLogin.divInput}>
                            {/* <label
                    htmlFor="password"
                >
                    Contraseña
                </label> */}
                            <img
                                className={clasesLogin.icons}
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQBJREFUSEvllesNAUEURs9WICpAB1SADnSACkQF6EAHdEAJVEAH6EAH5EtmY+3M7OzDJpuYPzvZzP3Ofc3ciJpXVLM+eQETYAGMjEMnYAPom7nyAPbA1KMiyDqLEALI84MRWAJHs58BK7MfZ0USAigFQ0Di25Sn8lyQcyJ1VjAhwMtYtIFnyroL3Mw/r05egO9c7ECzAGrFHaAUFFl3YJ4uuCs0HewUUU6clW0vaesCBPPqgTvt/gsQF18ZsooJVE5RsvhWMX8NeDjauHIEfeBiOmgAXFPdVBkgvawWbg5Ar2ar5E22auO6aGpHTbGiz4XENYi+xmjouS4ZyMesdsAb5eE6GS7S/pcAAAAASUVORK5CYII=" />
                            <input
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                className={clasesLogin.input}
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />

                        </div>
                        <Link
                            to={'/register'}
                            className="text-white  mt-4"
                        >
                            ¿No tenés una cuenta? Registrate
                        </Link>
                        <button
                            className={clasesLogin.button}
                            type="submit"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                    <nav
                        className={clasesLogin.olvidePass}
                    >

                        <Link
                            to={'/forget-password'}
                            className="text-white text-center mt-2"
                        >
                            Olvidé mi Contraseña
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}


