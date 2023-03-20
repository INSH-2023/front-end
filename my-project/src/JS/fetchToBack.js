let toBackEnd={

   async delete(name,link,id){
      // variable
      let return_data =[]
      let status =undefined
      // show log
      console.log(`delete ${name} : ${id} => ${link}`);
      // fetch
      let res = await fetch(`${link}/${id}`,{
         method:'DELETE'
      })
      if(res.status==200){
         
         status=res.status
         console.log(`delete ${name} sucessful by ${id} `)
         return_data.push(status)
         return_data.push(await res.json())
      }else{
         status=res.status
         console.log(`cannot delete ${name} by ${id}`)
         return_data.push(status)
         return_data.push(await res.json())
      }
      
   

      return return_data
   },

   async getData(name,link,header=undefined){
      // variable
      let return_data =[]
      let status = undefined
      let res
      // show log
      console.log(`get data ${name} => ${link}`)
      // fetch
      if(header==undefined||header==null||header==''){
         res =await fetch(link,{
         method:'GET',

         })
      }else{
         res =await fetch(link,{
            method:'GET',
            headers:{
               "subject_type":`${header}`
            }
         })
      }
      
      if(res.status==200){
         let data = await res.json()
         status =res.status
         return_data.push(status)
         return_data.push(data)
         console.log(`get data ${name} successfull`)
         console.log(data)
         // console.log(return_data)
      }else{
         console.log(`cannot get data ${name}`)
         status = res.status
         return_data.push(status)
         return_data.push(await res.json())
      }
      

      return return_data
         
   },

   async getDataBy(name,link,id){
      // variable
      let return_data =[]
      let status = undefined
      // show log
      console.log(`get data ${name} : ${id} => ${link}`);
      // fetch    
      let res = await fetch(`${link}/${id}`,{
         method:'GET'
      })
      if(res.status==200){
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
         status =res.status
         return_data.push(status)
         return_data.push(await res.json())
      }
      

      return return_data
   },

   async editData(name,link,id,data){
      // variable
      let return_data =[]
      let status =undefined
      // let name =eName.value.split(' ')
      // show log
      console.log(`edit ${name} : ${id} => ${link}`)
      // fetch
      let res = await fetch(`${link}/${id}`,{
         method:'PUT',
         headers:{ "content-type": "application/json"},
         body:JSON.stringify(data)
      })

      if(res.status==200){
         console.log(`update ${name} successful`)
         status=res.status
      }else{
         console.log(`error cannot update ${name}`)
         status=res.status
      }
      return_data.push(status)
      return_data.push(await res.json())

      return return_data
   },

   async postData(name,link,data){
      // variable
      let return_data =[]
      let status =undefined
      console.log(data)
      // show log
      console.log(`post data ${name} => ${link}`)
      // fetch
      let res = await fetch(link,{
         method:'POST',
         headers:{ "content-type": "application/json"},
         body:JSON.stringify(data)
      })

      if(res.status==200){
         status=res.status
         console.log(`post ${name} successful`)
      }else{
         status=res.status
         console.log(`error cannot post ${name}`)
      }
      return_data.push(status)
      return_data.push(await res.json())

      return return_data
   }
}


export default toBackEnd