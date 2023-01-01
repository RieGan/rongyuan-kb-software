import { toast } from 'react-toastify'

let errMsg = ''
let timer: NodeJS.Timeout | undefined
export const toToast = (type: 'error' | 'info', msg: string) => {
  //console.log(msg)
  if (errMsg !== msg) {
    
    errMsg = msg

    if (timer != undefined) clearTimeout(timer)

    timer = setTimeout(() => {
      errMsg = ''
    }, 2000)

    type === 'error'
      ? toast.error(msg, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
      : toast.info(msg, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
  }

}
