let toBackEnd={

   async delete(name,link,id){
      // variable
      let return_data =[]
      let status =undefined
      let res = undefined
      // show log
      console.log(`delete ${name} : ${id} => ${link}`);
      // fetch
      try {
         res = await fetch(`${link}/${id}`,{
            method:'DELETE'
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
         status=500
         console.log(`cannot delete ${name} by ${id}`)
         return_data.push(status)
         return_data.push('An internal error occurred, please try again later.')
      }
      return return_data
   },

   async getData(name,link){
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
         console.log(data)
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
         status = 500
         return_data.push(status)
         return_data.push('An internal error occurred, please try again later.')
      }
      

      return return_data
         
   },

   async getDataBy(name,link,id){
      // variable
      let return_data =[]
      let status = undefined
      let res = undefined
      // show log
      console.log(`get data ${name} : ${id} => ${link}`);
      // fetch    
      try {
         res = await fetch(`${link}/${id}`,{
            method:'GET'
         })
         status=res.status
      } catch (error) {
         console.log(name,error)
      }

      if(status==200){
         let [data] = await res.json()

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
         status =500
         return_data.push(status)
         return_data.push('An internal error occurred, please try again later.')
      }
      
      return return_data
   },

   async editData(name,link,id,data){
      // variable
      let return_data =[]
      let status =undefined
      let res=undefined
      // let name =eName.value.split(' ')
      // show log
      console.log(`edit ${name} : ${id} => ${link}`)
      // fetch
      try {
         res = await fetch(`${link}/${id}`,{
            method:'PUT',
            headers:{ "content-type": "application/json"},
            body:JSON.stringify(data)
         })         
         status=res.status
      } catch (error) {
         console.log(name,error)
      }
      console.log(res.status)

      if(status==200){
         console.log(`update ${name} successful`)
         status=res.status
         return_data.push(status)
         return_data.push(await res.json())
      }else{
         console.log(`error cannot update ${name}`)
         status=500
         return_data.push(status)
         return_data.push('An internal error occurred, please try again later.')
      }
      
      return return_data
   },

   async postData(name,link,data){
      // variable
      let return_data =[]
      let status =undefined
      let res= undefined
      console.log(data)
      // show log
      console.log(`post data ${name} => ${link}`)
      // fetch
      try {
         res = await fetch(link,{
            method:'POST',
            headers:{ "content-type": "application/json"},
            body:JSON.stringify(data)
         })       
         status=res.status  
      } catch (error) {
         console.log(name,error)
      }
      
      if(status==200){
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
   }
}


export default toBackEnd