
import { Film } from "./api/schemas/films"
import {People} from "./api/schemas/people"
import {Detalhe} from "./components/detalhe/detalhe"
import "./styles.css";


export const App = ()=>{

     return (
       <Detalhe<Film> id={3} controller={"films"}/>
     )
}