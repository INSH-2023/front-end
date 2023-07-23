let toBackEnd={

   async delete(name,link,id,token){
      // variable
      let return_data =[]
      let status =undefined
      let res = undefined
      // show log
      console.log(`delete ${name} : ${id} => ${link}`);
      // fetch
      try {
         res = await fetch(`${link}/${id}`,{
            method:'DELETE',
            headers: {
               Authorization: "Bearer " + token
            }
         })         
         status=res.status
      } catch (error) {
         console.log(error) 
      }
      
      if(status==200){
         console.log(`delete ${name} sucessful by ${id} `)
         return_data.push(status)
         return_data.push(await res.json())
      }else{
         console.log(`cannot delete ${name} by ${id}`)
         return_data.push(status)
         return_data.push('An internal error occurred, please try again later.')
      }
      return return_data
   },

   async getData(name,link,token){
      // variable
      let return_data =[]
      let status = undefined
      let res
      // show log
      console.log(`get data ${name} => ${link}`)
      // fetch
      // if(header==undefined||header==null||header==''){
         try {
            res =await fetch(link,{
            method:'GET',
            headers: {
               Authorization: "Bearer " + token
            }
            })   
            status=res.status         
         } catch (error) {
            console.log(error)
         }

      // }else{
      //    res =await fetch(link,{
      //       method:'GET',
      //       headers:{
      //          "subject_type":`${header}`
      //       }
      //    })
      // }
      
      if(status==200){
         let data = await res.json()
         return_data.push(status)
         return_data.push(data)
         console.log(`get data ${name} successfull`)
         // console.log(data)
         // console.log(return_data)
      }
      // else if(res.status==404){
      //    console.log(`cannot get data ${name}`)
      //    status = res.status
      //    return_data.push(status)
      //    // return_data.push(await res.json())
      // }
      else{
         console.log(`cannot get data ${name}`)
         return_data.push(status)
         return_data.push('An internal error occurred, please try again later.')
      }
      

      return return_data
         
   },

   async getDataBy(name,link,id,token){
      // variable
      let return_data =[]
      let status = undefined
      let res = undefined
      // show log
      console.log(`get data ${name} : ${id} => ${link}`);
      // fetch    
      try {
         res = await fetch(`${link}/${id}`,{
            method:'GET',
            headers: {
               Authorization: "Bearer " + token
            }
         })
         status=res.status
      } catch (error) {
         console.log(name,error)
      }

      if(status==200){
         let [data] = await res.json()
         console.log(data)
         if(name=='request'){
            if(data.request_problems.match(","))data.request_problems = data.request_problems.split(",")
            else data.request_problems=[data.request_problems]               
         }
         status =res.status
         return_data.push(status)
         return_data.push(data)
         console.log(`get data ${name} by ${id} successfull`)
         console.log(return_data)
      }else{
         console.log(`cannot get data ${name} by ${id}`)
         return_data.push(status)
         return_data.push('An internal error occurred, please try again later.')
      }
      return return_data
   },

   async editData(name,link,data,token){
      // variable
      let return_data =[]
      let status =undefined
      let res=undefined
      // let name =eName.value.split(' ')
      // show log
      console.log(`edit ${name} : ${link}`)
      // fetch
      try {
         res = await fetch(`${link}`,{
            method:'PUT',
            headers:{ "content-type": "application/json", Authorization: "Bearer " + token},
            body:JSON.stringify(data),
         })         
         status=res.status
         console.log(res.status)
      } catch (error) {
         console.log(name,error)
      }
      

      if(status==200){
         console.log(`update ${name} successful`)
         status=res.status
         return_data.push(status)
         return_data.push(await res.json())
      }else{
         console.log(`error cannot update ${name}`)
         return_data.push(status)
         return_data.push('An internal error occurred, please try again later.')
      }
      
      return return_data
   },

   async postData(name,link,data,token){
      // variable
      let return_data =[]
      let status =undefined
      let res= undefined
      // console.log(data)
      // show log
      console.log(`post data ${name} => ${link}`)
      // fetch
      try {
         res = await fetch(link,{
            method:'POST',
            headers:{ "content-type": "application/json", Authorization: "Bearer " + token},
            body:JSON.stringify(data)
         })       
         status=res.status  
      } catch (error) {
         console.log(name,error)
      }
      
      if(status==200 || status==201){
         status=res.status
         console.log(`post ${name} successful`)
         return_data.push(status)
         return_data.push(await res.json())
      }else
      if(status==400){
         status=res.status
         return_data.push(status)
         return_data.push(await res.json())
      }else 
      if(status==401){
         status=res.status
         return_data.push(status)
      }else
      if(status==403){
         status=res.status
         return_data.push(status)
      }else
      if(status==404){
         status=res.status
         return_data.push(status)
      }else{
         status=500
         console.log(`error cannot post ${name}`)
         return_data.push(status)
         return_data.push('เกิดข้อผิดพลาดฝั่ง Server กรูณาติดต่อฝ่าย IT !!')
      }
   
      return return_data
   },
   async postFile(name,link,data){
      // variable
      let return_data =[]
      let status =undefined
      let res= undefined
      console.log(data)
      // show log
      console.log(`post file ${name} => ${link}`)
      // fetch
      try {
         res = await fetch(link,{
            method:'POST',
            body: data
         })       
         status=res.status  
      } catch (error) {
         console.log(name,error)
      }
      
      if(status==201){
         status=res.status
         console.log(`post file ${name} successful`)
         return_data.push(status)
         return_data.push(res.json())
      }else{
         status=500
         console.log(`error cannot post ${name}`)
         return_data.push(status)
         return_data.push('เกิดข้อผิดพลาดฝั่ง Server กรูณาติดต่อฝ่าย IT !!')
      }
   
      return return_data
   }
}


export default toBackEnd