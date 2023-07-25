import Cookies from './cookies'
import {useRouter} from 'vue-router'
import cryptoJs from 'crypto-js';
const validate={
    vUser(data,lenghtOfText,passw=false,oldData=undefined){
        let vStatus=false
        let return_data=[]
        let organization ='@moralcenter.or.th'

        console.log(data)
        console.log(lenghtOfText)
        
        let {user_first_name:fname,
            user_last_name:lname,
            user_email:email,
            user_role:role,
            user_office:office,
            user_position:position,
            user_password:password,
            user_group:group,
            user_status:status,
            user_cPassW:cPassword
            } = data
        

        let {fnameL,lnameL,emailL,passwordL,empCodeL}= lenghtOfText

        let {user_first_name:old_fname,
            user_last_name:old_lname,
            user_email:old_email,
            user_role:old_role,
            user_office:old_office,
            user_position:old_position,
            user_group:old_group,
            user_status:old_status,
            }=oldData
        
        if(oldData!=undefined){
            if( old_fname==fname&&
                old_lname==lname&&
                old_email==email&&
                old_role==role&&
                old_office==office&&
                old_position==position&&
                old_group==group&&
                old_status==status
              ){
                vStatus=true
                return_data.push('Infomation not change.')
            }
           return {status:vStatus,msg: return_data}
        }
    //     let email = eEmail.value+organization
    //     // fNameS.value=undefined
    //     // eNameS.value=undefined
    //     // emailS.value=undefined
    //     // groupS.value =undefined
    //     // passWS.value =undefined
    //     // cPassWS.value =undefined
    //     // positionS.value=undefined
    //     // officeS.value =undefined
    //     // roleS.value =undefined
    //     // eEmail.value=email.value+organization
        
        // if(empCode.length == 0){
        //     console.log('Please input ur employee code')
        //     vStatus =true
        // }
        if(fname.length == 0){
            let msg='First name is Null'
            console.log('First name ')
            return_data.push(msg)
            vStatus =true
        }
        if(lname.length==0){
            let msg='Last name is Null'
            console.log('Last name ')
            return_data.push(msg)
            vStatus =true
        }
        if(email.length==0){
            let msg='Email is Null'
            console.log('Please input ur email')
            return_data.push(msg)
            vStatus =true
        }
        if(group.length==0){
            let msg='Group is Null'
            console.log('Please input ur group ')
            return_data.push(msg)
            vStatus =true
        }
        if(position.length==0){
            let msg='Position is Null'
            console.log('Please input ur position ')
            return_data.push(msg)
            vStatus =true
        }
        if(office.length==0){
            let msg='Office is Null'
            console.log('Please input ur office ')
            return_data.push(msg)
            vStatus =true
        }
        if(role.length==0){
            let msg='Role is Null'
            console.log('Please input ur role ')
            return_data.push(msg)
            vStatus =true
        }
        if(passw!=false&&([null,undefined].includes(password) || password.length==0)){
            let msg='Password is Null'
            console.log('Please input ur password ')
            return_data.push(msg)
            vStatus =true
        }
        if(passw!=false&&([null,undefined].includes(cPassword) || cPassword.length==0)){
            let msg='Confirm password is Null'
            console.log('Please input ur confirm password ')
            return_data.push(msg)
            vStatus =true
        }
        // if(status.length==0){
        //     console.log('Please input ur confirm password')
        //     vStatus =true
        // }
        // if(empCode.length>empCodeL){
        //     console.log(`lenght of employee code more then ${empCodeL}`)
        //     vStatus =true
        // }
        if(fname.length>fnameL){
            let msg=`lenght of first name more then ${fnameL}`
            console.log(msg)
            return_data.push(msg)
            vStatus =true
        }
        if(lname.length>lnameL){
            let msg=`lenght of last name more then ${lnameL}`
            console.log(msg)
            return_data.push(msg)
            vStatus =true
        }
        if(email.length>emailL){
            let msg=`lenght of email more then ${emailL}`
            console.log(msg)
            return_data.push(msg)
            vStatus =true
        }
        if(!this.vEmail(email)){
            let msg=`this email invalid`
            console.log(msg)
            return_data.push(msg)
            vStatus =true
        }
        if(passw!=false&&(password.length>passwordL)){
            let msg=`lenght of password more then ${passwordL}`
            console.log(msg)
            return_data.push(msg)
            vStatus =true
        }
        if(passw!=false&&(cPassword.length>passwordL)){
            let msg=`lenght of password more then ${passwordL}`
            console.log(msg)
            return_data.push(msg)
            vStatus =true
        }  
        if(passw!=false&&(password !=cPassword)){
            let msg=` password not match`
            console.log(msg)
            return_data.push(msg)
            vStatus =true
        }

        
    
        return {status:vStatus,msg: return_data}
    },

    vEmail(email){
        let valid =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        if (email.match(valid)) {
            return true;
        } else {
            return false;
        }
    },
    
    vRequestEdit(data){
        let status=undefined
        let { 
            request_status:status_ch,
            request_assign:assign_ch    
        }=data

        if(status_ch.length==0 || status_ch==null || status_ch == undefined){
            
            console.log("request status_ch invalid")
            return status=true
    
        }else
        if(assign_ch.length==0 || assign_ch==null || assign_ch==undefined){
            
            console.log("request assign_ch invalid")
            return status=true
        }
        status =false
        return status
    },
    vLogin(){
        let myRouter = useRouter()
        let status=undefined
        let user_info =this.getUserDataFromLocal()

        if(user_info==null||user_info==undefined){
           return myRouter.push({name:'signIn'})
           status=false
        }else{
            status=true
        }
        return status
    },
    vSection_I(typeOfUse){
        let status =undefined
        if(typeOfUse.type==null||typeOfUse.type==undefined||typeOfUse.type.length==0){
            console.log('please input ur data section 1')
            status=false
        }else
        if((typeOfUse.type=='sf'&& (typeOfUse.brand_sf==null||typeOfUse.brand_sf==undefined|| typeOfUse.brand_sf.length==0))){
            console.log('please input ur brand name !!')
            status=false
        }else{
            status=true
        }
        return status
    },
    vSection_II(typeOfMachine,typeOfUse,user){
        let status = undefined
        let {first_name,last_name,email,group}=user
        if(typeOfMachine.typeM.length==0||typeOfMachine.typeM==undefined||typeOfMachine.typeM==null){
            console.log('please input ur data section 2')
            status=false
        }else{
            if(
                typeOfUse.type=='or' && 
                (typeOfMachine.brand_or.length==0 || typeOfMachine.sn.length==0 ) &&
                (first_name.length==0 ||last_name.length==0 || email.length==0 ||group.length==0)
            ){
                status=false
                console.log('please input ur data section 22')
            }else{
                status=true
            }
        }
        return status
    },
    vSection_III(problems,is_other){
        let status=undefined
        if(problems.length==0&&is_other==false){
            console.log('please input ur problem section 3')
            status=false
        }else{
            status=true
        }
        return status
    },
    vSection_IIII(otherAndMsg,is_other){
        let status =undefined
        if(is_other==true && otherAndMsg.msg_other.length==0){
            console.log('please input ur data section 4')
            status=false
        }else{
            status=true
        }
        return status 
    },
    splitProblem (problem){
        let problemArr = problem.split(",")
        return problemArr
    },
    getUserDataFromLocal(property=undefined){
        let cookie = Cookies.get("data")
        // console.log(cookie)
        if(cookie == null ||cookie == undefined||cookie == NaN||cookie.length==0){
            console.log("login first !!")
            return null
        }else{
            // console.log(cookie)

            let data = JSON.parse(cryptoJs.AES.decrypt(
                    Cookies.get("data"),
                    import.meta.env.VITE_PERSONAL_SECRET ).toString(cryptoJs.enc.Utf8))
            if(property!=undefined||property!=null){
                return data[property]
            }else{
                return data    
            }
        }
    }
}

export default validate