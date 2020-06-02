import React from 'react';


const AppContext= React.createContext({

   jobs:[],
   applicants:[],
   gigs: [],
   appliedUser:[],
   jsProfile:[],
   empPros:[],
   addJob: ()=>{},
   setUserId: ()=>{},

})

export default AppContext;