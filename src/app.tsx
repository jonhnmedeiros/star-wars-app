import React, {useEffect, useState} from 'react'
import { genericController } from './api/generic-api';
import { People } from './api/schemas/people';
import { Planet } from './api/schemas/planet';

export const App = ()=>{
  const [schema, setSchema] = useState<People>();
  const {getById} = genericController<People>('people');
  useEffect(()=>{
    getById(1).then(valor=>setSchema(valor));
  },[])
  
  return (
    <div> {schema?`O personagem ${schema.name} é do sexo ${schema.gender}`:null} </div>
  )
}