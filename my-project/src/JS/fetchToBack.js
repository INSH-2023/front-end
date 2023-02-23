let toBackEnd={
 async delete(name,link,){
      console.log(name);
      console.log(link);
 },
 async getData(name,link,id=undefined){
   let return_data =[]
   let status = undefined
   
   if(id==undefined){
      //get add data
      let data=[]
      console.log(name);
      console.log(link);
      let res =await fetch(link,{
         method:'GET'
      })
      if(res.status==200){
         data = await res.json()
         status =res.status
         return_data.push(data)
         console.log(`get data ${name} successfull`)
      }else{
         console.log('cannot get data')
         status =res.status
      }
   }else
   if(id!=undefined){
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
         console.log(`get data ${name} successfull`)
      }else{
         console.log('cannot get data')
         status =res.status
      }
   }
      return_data.push(status)
   return return_data
      
 }
}


export default toBackEnd