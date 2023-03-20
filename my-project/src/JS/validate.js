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
    splitProblem (problem){
        let problemArr = problem.split(",")
        return problemArr
    }
    ,
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
    }
}

export default validate