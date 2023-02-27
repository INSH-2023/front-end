let toBackEnd={

   async delete(name,link,id){
      let status =undefined
         console.log('this delete function name :'+name);
         console.log('this delete function link :'+link);
         console.log('this delete function id :'+id)

         let res = await fetch(`${link}/${id}`,{
            method:'DELETE'
        })
        if(res.status==200){
            status=res.status
            console.log('delete sucessful by ID : '+id)
        }else{
            status=res.status
            console.log('error cannot delete data by ID :'+id)
        }
      
      return status
   },

   async getData(name,link){
      let return_data =[]
      let status = undefined
      
         //get add data
         console.log(name);
         console.log(link);
         let res =await fetch(link,{
            method:'GET'
         })
         if(res.status==200){
            status =res.status
            return_data.push(await res.json())
            console.log(`get data ${name} successfull`)
            console.log(return_data)
         }else{
            console.log('cannot get data')
            status = res.status
         }

      return_data.push(status)
      return return_data
         
   },

   async getDataBy(name,link,id){
      let return_data =[]
      let status = undefined
         // get data by id
         let data = {}
         console.log(name);
         console.log(link);
         console.log(id);
         
         let res = await fetch(`${link}/${id}`,{
            method:'GET'
         })
         if(res.status==200){
            data = await res.json()
            status =res.status
            return_data.push(data)
            console.log(`get data ${name} by ${id} successfull`)
            console.log(return_data)
         }else{
            console.log('cannot get data')
            status =res.status
         }
      return_data.push(status)
      return return_data
   },

   async editData(name,link,id,data){
      let ss =undefined
      // let name =eName.value.split(' ')
      console.log(name)

      let {
         first_name:first_name,
         last_name:last_name,
         email:email,
         role:role,
         office:office,
         position:position,
         passW:passW,
         group_work:group_work,
         status:status
      }=data
      // let {fname,lname,email,role,office,position,passW,group,s}=data

        let res = await fetch(`${link}/${id}`,{
            method:'PUT',
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({
               first_name: first_name,
               last_name: last_name,
               email: email,
               role: role,
               office: office,
               position: position,
               passW: passW,
               group_work: group_work,
               status: status
            })
        })
        if(res.status==200){
            console.log('update successful user')
            ss=res.status
        }else{
            console.log('error cannot update user')
            ss=res.status
        }
      
      return ss
   }
}


export default toBackEnd