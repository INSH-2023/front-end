let validate={
    vUserCreate(data,lenghtOfText){
        let vStatus=false
        let organization ='@moralcenter.or.th'

        console.log(data)
        console.log(lenghtOfText)
        
        let {first_name:fname,
            last_name:lname,
            email:email,
            role:role,
            office:office,
            position:position,
            passW:password,
            group_work:group,
            status:status,
            cPassW:cPassword
            } = data
        
        let {fnameL,lnameL,emailL,passwordL,cPasswordL}= lenghtOfText
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
        if(status.length==0){
            console.log('Please input ur confirm password')
            vStatus =true
        }
        if(fname.length>fnameL){
            console.log(`lenght of last name more then ${fnameL}`)
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
        if(this.vEmail(email+organization)){
            console.log('this email invalid')
            vStatus =true
        }
        if(password.length>passwordL){
            console.log(`lenght of password more then ${passwordL}`)
            vStatus =true
        }
        if(cPassword.length>cPasswordL){
            console.log(`lenght of password more then ${cPasswordL}`)
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
    }

}

export default validate