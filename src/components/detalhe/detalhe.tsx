import React from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { SWAPIEndpoint } from "../../api/generic-api";
import { getDetailData} from "../../api/controller-defs";
import { Field } from "./field"
import { useDetalhe } from "./use-detalhe";
import {People} from "../../api/schemas/people";
import { GenericSchema } from "../../api/schemas/generic-schema";


interface DetalheProps {
  id : number;
  controller : SWAPIEndpoint;
}

export const Detalhe = <T extends GenericSchema>(props:DetalheProps) => {
  const {id,controller} = props;
  const {isLoading, result,error} = useDetalhe<T>(id, controller);
  const colunas = getDetailData(controller);

  if (isLoading) return <div className="centralizado"><CircularProgress/></div>
  if (!result) return null;

  return (
    <>
      <Grid container direction={"column"} spacing={2} alignItems={"stretch"}>
        <Grid>
          {Object
            .entries(result)
            .filter(item=>{
              const [key] = item;
              return colunas?.find(campo=>campo===key);
            })
            .map(item=>{
              const [key,value] = item;
              return <Field nome={key} valor={value}/>
            })}
        </Grid>
        <Grid>
          <Button variant={'outlined'}>Voltar</Button>
        </Grid>
      </Grid>
    </>
  )
  
}