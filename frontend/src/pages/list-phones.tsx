import React from "react";
import { usePhone } from "../context/use-phone";
import { Phone } from "../context/phone-context";
import { Link } from "react-router-dom";

export const ListPhones = () => {
  const { getPhonesPage, deletePhone } = usePhone();
  const [phones, setPhones] = React.useState([] as Phone[]);
  const [page, setPage] = React.useState(0);
  const limit = 10;
  React.useEffect(() => {
    console.log(getPhonesPage, typeof getPhonesPage);
    getPhonesPage(page, limit)
      .then((data) => setPhones(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen bg-gray-900 lg:w-[900px]
    mx-auto px-10
    "
    >
      <div className="w-full mt-8 border-2 border-gray-50 rounded p-4">
        <h1 className="text-4xl font-bold text-center text-gray-50 mb-8 relative top-[-45px] bg-gray-900 w-[fit-content] mx-auto px-4 py-2 rounded">
          Lista de Celulares
        </h1>
        <Link
          to="/add-phone"
          className="text-white px-4 py-2 rounded bg-gray-800"
        >
          Create Phone
        </Link>
        <table className="table-auto border-collapse border border-gray-800 w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/6">Marca</th>
              <th className="w-1/6">Modelo</th>
              <th className="w-1/6">Capacidade de Memória (GB)</th>
              <th className="w-1/6">Data de Lançamento</th>
              <th className="w-1/6">Altear</th>
              <th className="w-1/6">Excluir</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {phones.map((phone) => (
              <tr key={phone.id} className="border border-gray-800">
                <td>{phone.brand}</td>
                <td>{phone.model}</td>
                <td>{phone.memory}</td>
                <td>
                  {phone.release.toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="border border-gray-800">
                  <button>Update</button>
                </td>
                <td className="border border-gray-800">
                  <button onClick={() => deletePhone(phone.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between w-full mt-8">
          <button
            className={`text-white px-4 py-2 rounded ${
              page === 0 ? "bg-red-500" : "bg-gray-800"
            }`}
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Anterior
          </button>

          <span className="text-gray-50">Pagina {page + 1}</span>

          <button
            className="bg-blue-800 text-white px-4 py-2 rounded"
            onClick={() => setPage(page + 1)}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};
