import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPassworModificado] = useState(false)

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/olvide-password/${token}`
        );
        console.log(data);
        setTokenValido(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password === "" || password.length < 6) {
      setAlerta({
        msg: "Debes ingresar password y este debe ser mayor a 6 caracteres",
        error: true
      })
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`
      const { data } = await clienteAxios.post(url, password)
      setAlerta({
        msg: data.msg,
        error: false
      })

      setPassworModificado(true)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form action="" className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Escribe tu nuevo password"
              className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar nuevo password"
            className="bg-sky-700 mb-5 w-full uppercase py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-slate-800 transition-colors"
          />
        </form>
      )}
      {passwordModificado &&
        <Link className="block text-center my-5 text-slate-500 text-sm" to="/">
          Iniciar Sesión
        </Link>
      }
    </>
  );
};

export default NuevoPassword;
