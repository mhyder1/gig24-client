import React from 'react';


const AppContext= React.createContext({

   jobs:[],
   applicants:[],
   addJob: ()=>{},
   gigs: []

})

export default AppContext;