import jsCookies from './cookies'
import toBackEnd from './fetchToBack'
import validate from './validate'
import cryptoJs from 'crypto-js'
const getRefreshToken = async () => {
    const refreshLink =`${import.meta.env.VITE_BACK_END_HOST}/authentication/refresh`
    const user = validate.getUserDataFromLocal()
    const [status,data] = await toBackEnd.postData("refresh",refreshLink, user)
    if(status==200){
        let ciphertext = cryptoJs.AES.encrypt(JSON.stringify(data),import.meta.env.VITE_PERSONAL_SECRET)
        jsCookies.set("data",ciphertext)
    }
    else {
        jsCookies.remove("data")
    }
}

export default getRefreshToken