import React from 'react';


const AppContext= React.createContext({

   jobs:[],
   applicants:[],
   addJob: ()=>{},
   gigs: [],
   appliedUser:[],
   jsProfile:[]

})

export default AppContext;