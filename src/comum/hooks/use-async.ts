
import {useEffect, useState} from 'react';

export interface AsyncReturnType <T> {
  isLoading:boolean;
  error:boolean;
  result: T | undefined;

}
export const useAsync = <T> (asyncFN:Promise<T>):AsyncReturnType<T> =>{
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result,setResult] = useState<T>();

  useEffect(()=>{
    const fn = async() => {
      setisLoading(true);
      setError(false);
      try{
        const result = await asyncFN;
        setisLoading(false);
        setResult(result);

      } catch (error) {
        setisLoading(false);
        setError(true);
      }
    }
    fn();
  },[setisLoading,setResult,setError,asyncFN])

  return {isLoading, error, result};

}