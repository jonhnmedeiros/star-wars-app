import { getAxiosInstance } from "./axios-instance";
import {AxiosResponse} from "axios";

export type SWAPIEndpoint = 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets';

export interface ResourceReturn<T> {
  getSchema:()=>void;
  getById:(id:number)=>Promise<T>;
  getAll:(page:number) => Promise<PageableResponse<T>>;
  getByPartialName: (search: string, pageNumber: number) => Promise<PageableResponse<T>>;
}

export interface PageData {
  proximo: number | null | undefined;
  anterior: number | null;
  total: number;
  totalRegistros: number;
}

export interface PageableResponse <T> {
  dados: T[];
  page: PageData;
}

export const genericController = <T>(endpoint:SWAPIEndpoint):ResourceReturn<T> => {
  const axios = getAxiosInstance();

  const getSchema = async () => {
    const response = await axios.get(`/${endpoint}/schema`);
    return response.data;
     
  }

  const getById = async (id:number):Promise<T> =>{
    const response = await axios.get(`/${endpoint}/${id}`)
    return response.data;
  }

  const getAll = async (pageNumber:number) : Promise<PageableResponse<T>> => {
    const response = await axios.get(`/${endpoint}/?page=${pageNumber}`);
    const dados: T[] = response.data.results;
    const page: PageData = getPageData(response);
    return {page,dados}

  } 

  const getByPartialName = async (search: string, pageNumber: number): Promise<PageableResponse<T>> => {
    const response = await axios.get(`/${endpoint}/?search=${search}&page=${pageNumber}`)
    const dados: T[] = (response.data.results);
    const page: PageData = getPageData(response);
    return {page, dados};
  }

  const getPageData = (response: AxiosResponse):PageData =>{
    const proximo: number | null = getPageNumber(response.data.next);
    const anterior: number | null = getPageNumber(response.data.previous);
    const resultSize = response.data.results.length;
    const count = response.data.results.count;
    const total: number = (count % resultSize) === 0? (count / resultSize) : Math.floor(count / resultSize) + 1; 

    return {proximo,anterior, total, totalRegistros:count}
  }

  const getPageNumber = (url:string|null):number|null =>{
    if (!url) return null;
    const matchs = url.match('page=\\d+');
    if (matchs) return parseInt(matchs[0].replace('page=',''));
    return null;
  }

  return {getSchema, getById, getAll, getByPartialName}

}