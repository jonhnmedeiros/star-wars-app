import React, {useEffect, useState} from 'react'
import { genericController } from './api/generic-api';

export const App = ()=>{
  const [schema, setSchema] = useState({name:''});
  const {getById} = genericController('people');
  useEffect(()=>{
    getById(1).then(valor=>setSchema(valor));
  },[])
  
  return (
    <div> {schema.name} </div>
  )
}