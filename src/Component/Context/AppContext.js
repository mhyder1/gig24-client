import React from 'react';


const AppContext= React.createContext({

   events:[],
   users:[],
   attend:[],
   addEvent: ()=>{},
   updateEvent: ()=>{}
})

export default AppContext;