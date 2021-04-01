import { genericController, SWAPIEndpoint } from "../../api/generic-api";
import { useAsync } from "../../comum/hooks/use-async";
import { AsyncReturnType } from "../../comum/hooks/use-async";
import { useMemo } from "react";

export const useDetalhe = <T>(id:number, controllerName: SWAPIEndpoint):AsyncReturnType<T> =>{
  const controller = useMemo(()=>genericController<T>(controllerName).getById(id),[controllerName,id]);
  const {error,isLoading, result} = useAsync<T>(controller);

  return {error,result,isLoading};
}