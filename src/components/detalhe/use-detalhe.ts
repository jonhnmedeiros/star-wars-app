import { genericController, SWAPIEndpoint } from "../../api/generic-api";
import { useAsync } from "../../comum/hooks/use-async";
import {AsyncReturnType} from "../../comum/hooks/use-async"

export const useDetalhe = <T>(id:number, controllerName: SWAPIEndpoint):AsyncReturnType<T> =>{
  const controller = genericController<T>(controllerName).getById(id);
  const {error,isLoading, result} = useAsync<T>(controller);

  return {error,result, isLoading};
}