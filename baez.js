
let config;
let result_get=[];

const SET = (chiave,value) => {
   console.log(value)
   return new Promise((resolve,reject)=>{
      try{
    fetch("https://ws.cipiaceinfo.it/cache/set", {
        headers: {
           'Content-Type': 'application/json',
           'key': config.cacheToken
        },
        method: "POST",
        body: JSON.stringify({
           key: chiave,
           value: value
        })
     }).then(r => r.json())
     .then(r => {
        resolve(r.result);
     })
     }
     catch(error){
      reject(error)
     }
   })
}

const GET = (chiave) => {
   return new Promise((resolve,reject)=>{
      try{
      fetch("https://ws.cipiaceinfo.it/cache/get", {
         headers: {
            'Content-Type': 'application/json',
            'key': config.cacheToken
         },
         method: "POST",
         body: JSON.stringify({
            key: chiave
         })
      }).then(r => r.json())
      .then(r => {
         resolve(r.result);
      })
      }catch(error) {
         reject(error)
      }
   })   
}

const Aggiorna =(nuova_riga)=>{
   GET(chiave).then(result_get => {
      console.log(result_get);
      result_get.push(nuova_riga)
      SET(chiave,result_get).then(r=>{
         console.log(r)
         if (r==="Ok"){
            GET(chiave).then((result_get) => {
               console.log("genera")
               let giorno = generaData(30,result_get)
               table.crea(giorno);
           })
         }
      })
   });
}
