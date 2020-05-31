import React from 'react';


const AppContext= React.createContext({

   jobs:[],
   // users:[],
   // attend:[],
   addJob: ()=>{}
   // updateEvent: ()=>{},
   // joinEvent: ()=>{},
   // removeAttend: ()=> {}
})

export default AppContext;