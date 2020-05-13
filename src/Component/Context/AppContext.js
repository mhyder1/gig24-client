import React from 'react';


const AppContext= React.createContext({

   events:[],
   users:[],
   attend:[],
   addEvent: ()=>{},
   updateEvent: ()=>{},
   joinEvent: ()=>{},
   removeAttend: ()=> {}
})

export default AppContext;