import jsCookies from 'js-cookie'
import toBackEnd from './fetchToBack'

const getRefreshToken = async refreshToken => {
    const refreshLink =`${import.meta.env.VITE_BACK_END_HOST}/authentication/refresh`
    const [status,data] = await toBackEnd.getData("refresh",refreshLink,refreshToken)
    if(status==200){
        jsCookies.set("data",JSON.stringify(data))
    } else {
        jsCookies.remove("data")
    }
}

export default getRefreshToken