import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { Alert } from "../../components/Alert/Alert"
import clasesRegister from "./register.module.css"
import { clientAxios } from "../../config/clientAxios"
import Swal from 'sweetalert2'
import 'animate.css';
import 'boxicons'


const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;


export const Register = () => {

    const [alert, setAlert] = useState({});
    const [sending, setSending] = useState(false)

    const { formValues, setFormValues, handleInputChange, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const { name, email, password, password2 } = formValues

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([name, email, password, password2].includes("")) {
            handleShowAlert("Todos los compos son obligatorios!")
            return null
        }

        if (!exRegEmail.test(email)) {
            handleShowAlert("El email tiene un formato invalido!")
            return null
        }

        if (password !== password2) {
            handleShowAlert("Las contraseñas no coinciden!!")
            return null
        }

        try {

            setSending(true)

            const { data } = await clientAxios.post('/auth/register', {
                name: name,
                email: email,
                password: password
            })

            // Swal.fire({
            //     title: `Gracias por registrarte, ${data.msg}`,
            //     showClass: {
            //     popup: 'animate__animated animate__fadeInDown'
            //     },
            //     hideClass: {
            //     popup: 'animate__animated animate__fadeOutUp'
            //     }
            // })

            setSending(false)

            Swal.fire({
                icon: 'info',
                title: 'Gracias por registrarte',
                text: data.msg,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            reset();

        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg)
            reset();
        }

    }

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })

        setTimeout(() => {
            setAlert({});
        }, 20000)
    }

    return (
        <>
            <div className="flex justify-center">
                <div
                    className={clasesRegister.fondoLogin}
                >
                    <h1
                        className="text-white text-center text-xl mb-4"
                    >Creá tu cuenta</h1>
                    {
                        alert.msg && <Alert {...alert} />
                    }
                    <form
                        action=""
                        onSubmit={handleSubmit}
                        noValidate
                        className={clasesRegister.form}

                    >
                        <div className={clasesRegister.divInput}>
                            <img
                                className={clasesRegister.icons}
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPxJREFUSEu1leERATEQRt9VQAk6oAQqoBQdoAKtUAEdoBM6MJ/JmVxcLrlN3Mz9ifFevs1uruHPT/NnPjUEU2DnNnoAnv6mSwWCX4CFg96BlS8pEfjwhxPMgY7EKgjhSye4ApKoVHutWQSxsojXlsssGCqLBDoLlUuJPoc9JkGqLOJ14GMEfXDtMLb+7dScBGZ4ToIieEpQDB8SVIHHBNXgMYFGXdPot1yyW2K3cthFGpQb8AJmbljM8L4EW+AInIFNTp+nvidhghOwBnRpaZCUSEl+JjQFbn8PBYJOgj+b4X0l0gFrx0rQvlozPzlXhRmemuQicOwMqkB9yBsiiFwZ9yMQWQAAAABJRU5ErkJggg==" />
                            {/* <label htmlFor="name"> Nombre </label> */}
                            <input
                                id="name"
                                className={clasesRegister.input}
                                type="text"
                                placeholder="Ingresá tu nombre"
                                autoComplete='off'
                                value={name}
                                name="name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={clasesRegister.divInput}>
                            <img
                                className={clasesRegister.icons}
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR1JREFUSEvdleFNw0AMhb9MABsAG8AEwAawAZ2gMAl0ArpB2QCYAEaADdoJQB+ypVNIyjVRhFT/SZSz37OffU7DxNZMjM9+EVwAj8DxSNk+gBnwIk4pkQdHI8EzXKyTNsFXnJ4B7wOJToG3iP1JvqwgCdZR4tOOJFch8eFfBIn7ANxVkug7b/n2ViDofTjbqGvAqrrMbFeAA6KVsb0EHqil4AcBftnRF32eAUk2QWLvUuqtBGZjoH04j+xugUXxnlW+AuqfVVYTlL1IfZfx8SaeEkpc2s4EBpuh4EqmKYkkXZM2iEBQNS8r6LsrgwkqJ7a+ybWAbb//q8AxyyYOzT7jPnMrl7vI22gTx25UwZ2wX+t6bNad8fv1y5xEom9+ED0ZymZNKwAAAABJRU5ErkJggg==" />
                            {/* <label htmlFor="email">Correo electrónico</label> */}
                            <input
                                id="email"
                                type="email"
                                className={clasesRegister.input}
                                placeholder="Ingresá tu email"
                                value={email}
                                name="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={clasesRegister.divInput}>
                            <img
                                className={clasesRegister.icons}
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQBJREFUSEvllesNAUEURs9WICpAB1SADnSACkQF6EAHdEAJVEAH6EAH5EtmY+3M7OzDJpuYPzvZzP3Ofc3ciJpXVLM+eQETYAGMjEMnYAPom7nyAPbA1KMiyDqLEALI84MRWAJHs58BK7MfZ0USAigFQ0Di25Sn8lyQcyJ1VjAhwMtYtIFnyroL3Mw/r05egO9c7ECzAGrFHaAUFFl3YJ4uuCs0HewUUU6clW0vaesCBPPqgTvt/gsQF18ZsooJVE5RsvhWMX8NeDjauHIEfeBiOmgAXFPdVBkgvawWbg5Ar2ar5E22auO6aGpHTbGiz4XENYi+xmjouS4ZyMesdsAb5eE6GS7S/pcAAAAASUVORK5CYII=" />
                            {/* <label htmlFor="password">Contraseña</label> */}
                            <input
                                id="password"
                                type="password"
                                className={clasesRegister.input}
                                placeholder="Ingrese su contraseña"
                                value={password}
                                name="password"
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className={clasesRegister.divInput}>
                            <img
                                className={clasesRegister.icons}
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQBJREFUSEvllesNAUEURs9WICpAB1SADnSACkQF6EAHdEAJVEAH6EAH5EtmY+3M7OzDJpuYPzvZzP3Ofc3ciJpXVLM+eQETYAGMjEMnYAPom7nyAPbA1KMiyDqLEALI84MRWAJHs58BK7MfZ0USAigFQ0Di25Sn8lyQcyJ1VjAhwMtYtIFnyroL3Mw/r05egO9c7ECzAGrFHaAUFFl3YJ4uuCs0HewUUU6clW0vaesCBPPqgTvt/gsQF18ZsooJVE5RsvhWMX8NeDjauHIEfeBiOmgAXFPdVBkgvawWbg5Ar2ar5E22auO6aGpHTbGiz4XENYi+xmjouS4ZyMesdsAb5eE6GS7S/pcAAAAASUVORK5CYII=" />
                            {/* <label htmlFor="password2">Confirma tu contraseña</label> */}
                            <input
                                id="password2"
                                type="password"
                                className={clasesRegister.input}
                                placeholder="reingrese su contraseña"
                                value={password2}
                                name="password2"
                                onChange={handleInputChange}
                            />
                        </div>


                        <button
                            type="submit"
                            disabled={sending}
                            className={clasesRegister.button}
                        >
                            Crear cuenta
                        </button>

                        <nav
                            className="mt-5"
                        >
                            <Link
                                to={'/'}
                                className="text-white text-center "
                            >
                                ¿Estás registrado? Iniciá sesión
                            </Link>
                        </nav>

                    </form>

                </div>
            </div>
        </>

    )
}


