import { useState } from "react";
import { Link, json } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta,setAlerta] = useState({});

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if([nombre,email,password,repetirPassword].includes('')){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return;
    }
    if(password !== repetirPassword){
      setAlerta({
        msg:"Las contraseñas no coinciden",
        error: true
      })
      return;
    }
    if(password.length < 6){
      setAlerta({
        msg:"La contraseña es demasiado corta, minimo 6 caracteres",
        error: true
      })
      return;
    }

    setAlerta({})

    // ahora se puede crear el usuario en la api
    try{
      const {data} = await clienteAxios.post(`/usuarios`,{nombre,password,email})
      setAlerta({
        msg: data.msg,
        error:false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')

    }catch(error){
      setAlerta({
        msg:error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;


  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}
      <form action="" className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Ingresa tu Nombre"
            className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={e=>setNombre(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email de registro"
            className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password de registro"
            className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
            Repetir Password
          </label>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="repetir password de registro"
            className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={e=>setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-700 mb-5 w-full uppercase py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-slate-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 text-sm" to="/">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/olvide-password"
        >
          Olvide mi Passowrd
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
