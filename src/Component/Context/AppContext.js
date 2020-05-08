import React from 'react';


const AppContext= React.createContext({

   events:[],
   users:[],
   addEvent: ()=>{}
})

export default AppContext;