import { useContext } from "react";
import ProyectosContext from "../context/proyectosProvider";
import clienteAxios from "../config/clienteAxios";

const useProyectos = () =>{
    return useContext(ProyectosContext)
}

export default useProyectos;