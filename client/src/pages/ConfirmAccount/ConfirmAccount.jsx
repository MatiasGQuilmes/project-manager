import { useEffect, useState } from "react" 
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import clasesConfirm from './confirm.module.css'
import { Alert } from "../../components/Alert/Alert";
import { clientAxios } from "../../config/clientAxios";


export const ConfirmAccount = () => {

  const params = useParams();
  const {token} = params; //capturar el parametro de la url

  const navigate = useNavigate()

  const [alert, setAlert] = useState({});
  
  const handleShowAlert = (msg) => {
    setAlert({
        msg
    })

    // setTimeout(()=>{
    //     setAlert({});
    // }, 20000)
  }


  useEffect(() => {
    
    const confirmAccount = async () => {
        try {
            const {data} = await clientAxios.get(`/auth/checked?token=${token}`)

            Swal.fire({
              icon: 'info',
              title: 'Tu cuenta ha sido confirmada',
              text: data.msg,
              confirmButtonText: "Inicia Sesion",
              allowOutsideClick : false
            }).then(result => {
              if(result.isConfirmed){
                navigate('/')
              }
            })

        } catch(err){
          console.log(err);
          handleShowAlert(err.response?.data.msg)
        }
    }

    confirmAccount();
    
  }, [])

  return (
      <>
        <div 
              className={clasesConfirm.fondoConfirm}
          >

          <h1 className="text-white font-black tracking-[.15em] text-center text-3xl capitalize">
            Confirma tu cuenta
          </h1>
            <div className='mt-10  px-5  '>

            {
              alert.msg &&  (
                <>
                  <Alert {...alert} />
                  <nav
                    className="flex flex-col text-center text-white"
                  >
                    <Link
                      to={"/register"}
                    
                    >
                      ¿No tenés una cuenta? Registrate
                    </Link>
                    <Link
                      to={"/"}
                      className="mt-3"
                    >
                      ¿Estás registrado? Iniciá sesión
                    </Link>
                  </nav>
                </>
              )
            }
          
            </div>
        </div>
      </>
    )
  }