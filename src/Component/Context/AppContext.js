import React from 'react';


const AppContext= React.createContext({

   events:[],
   users:[],
   addEvent: ()=>{},
   updateEvent: ()=>{}
})

export default AppContext;