import React, {useEffect, useState} from 'react'
import { genericController, PageData } from './api/generic-api';
import {People} from './api/schemas/people'


export const App = ()=>{
   const {getAll} = genericController<People>('people');
   const [people, setPeople] = useState<People[]>();
   const [page, setPage] = useState<PageData>();
   useEffect(()=>{
    getAll(1).then(valor=>{
      setPeople(valor.dados)
      setPage(valor.page);
    });
   },[])

   if (people){
     return (
       <>
       <div>Paginação anterior: {page?.anterior} - Próximo: {page?.proximo}</div>
       {people.map(person=><div>{person.name}</div>)}
       </>
     )
   } else {
    return (<div></div>)
   }
}