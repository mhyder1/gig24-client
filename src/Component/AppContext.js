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
   clearContext: ()=>{},
   createUserProfile: ()=>{},
   updateApplications: ()=>{},
   updateGigs: ()=>{},
   createEmpProfile: ()=>{},
   deleteEmpJob: ()=>{}
})

export default AppContext;