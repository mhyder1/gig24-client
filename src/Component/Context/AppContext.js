import React from 'react';


const AppContext= React.createContext({

   events:[],
   addEvent: ()=>{}
})

export default AppContext;