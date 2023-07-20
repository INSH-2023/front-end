import jsCookies from './cookies'
import toBackEnd from './fetchToBack'
import validate from './validate'
const getRefreshToken = async refreshToken => {
    const refreshLink =`${import.meta.env.VITE_BACK_END_HOST}/authentication/refresh`
    const user = validate.getUserDataFromLocal() 
    delete user['refreshToken']
    const [status,data] = await toBackEnd.postData("refresh",refreshLink, user, refreshToken)
    if(status==200){
        jsCookies.set("data",JSON.stringify(data))
    }
    else {
        jsCookies.remove("data")
    }
}

export default getRefreshToken