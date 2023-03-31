import {useRouter} from 'vue-router'
const validate={
    vUserCreate(data,lenghtOfText){
        let vStatus=false
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
            console.log('Please input ur first name')
            vStatus =true
        }
        if(lname.length==0){
            console.log('Please input ur last name')
            vStatus =true
        }
        if(email.length==0){
            console.log('Please input ur email')
            vStatus =true
        }
        if(group.length==0){
            console.log('Please input ur group')
            vStatus =true
        }
        if(position.length==0){
            console.log('Please input ur position')
            vStatus =true
        }
        if(office.length==0){
            console.log('Please input ur office')
            vStatus =true
        }
        if(role.length==0){
            console.log('Please input ur role')
            vStatus =true
        }
        if(password.length==0){
            console.log('Please input ur password')
            vStatus =true
        }
        if(cPassword.length==0){
            console.log('Please input ur confirm password')
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
            console.log(`lenght of first name more then ${fnameL}`)
            vStatus =true
        }
        if(lname.length>lnameL){
            console.log(`lenght of last name more then ${lnameL}`)
            vStatus =true
        }
        if(email.length>emailL){
            console.log(`lenght of email more then ${emailL}`)
            vStatus =true
        }
        if(!this.vEmail(email)){
            console.log('this email invalid')
            vStatus =true
        }
        if(password.length>passwordL){
            console.log(`lenght of password more then ${passwordL}`)
            vStatus =true
        }
        if(cPassword.length>passwordL){
            console.log(`lenght of password more then ${passwordL}`)
            vStatus =true
        }  
        if(password !=cPassword){
            console.log('password not match')
            vStatus =true
        }
    
        return vStatus
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
        let data = JSON.parse(localStorage.getItem('user_info'))
        console.log('data : ',data)
        if(data == null ||data == undefined){
            console.log("login first !!")
            return data
        }else{
            if(property!=undefined||property!=null){
                return data[property]
            }else{
                return data    
            }
        }
        
    }
    

}

export default validate