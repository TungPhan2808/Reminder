import { signInGoogle } from '../services/firebase'
import { http } from '../utils/http'
import { useNavigate } from 'react-router'
import { enqueueSnackbar } from 'notistack'

function Login() {
   const navigate = useNavigate()
   const handleLogin = async () => {
      try {
         const result = await signInGoogle()
         const {
            user: { displayName, email, photoURL, uid },
         } = result
         console.log({ displayName, email, photoURL, uid })
         const bodyRequest = {
            googleId: uid,
            name: displayName,
            email,
            picture: photoURL,
         }
         const data = await http('/auth/login', 'POST', {
            data: bodyRequest,
         })
         console.log(data)
         navigate('/', { replace: true })
      } catch (error) {
         console.log(error)
         // Toast here
         enqueueSnackbar('Something error, try again!', { variant: 'error' })
      }
   }

   return (
      <>
         <div id="container-login" className="container-login">
            <div className="wrapper">
               <div className="typing-demo">A reminder that reminds...</div>
            </div>
            <div className="content">
               <div className="arrow">
                  <div className="curve"></div>
                  <div className="point"></div>
               </div>
            </div>

            <button className="btn" onClick={handleLogin}>
               <svg
                  width="180px"
                  height="60px"
                  viewBox="0 0 180 60"
                  className="border"
               >
                  <polyline
                     points="179,1 179,59 1,59 1,1 179,1"
                     className="bg-line"
                  />
                  <polyline
                     points="179,1 179,59 1,59 1,1 179,1"
                     className="hl-line"
                  />
               </svg>
               <span>LOGIN</span>
            </button>
         </div>
      </>
   )
}

export default Login
