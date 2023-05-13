import React from "react";
import { usePhone } from "../context/use-phone";
import { Phone } from "../context/phone-context";
import { Link, useNavigate } from "react-router-dom";

export const ListPhones = () => {
  const navigate = useNavigate();
  const { getPhonesPage, deletePhone } = usePhone();
  const [phones, setPhones] = React.useState([] as Phone[]);
  const [page, setPage] = React.useState(1);
  const [error, setError] = React.useState("");
  const limit = 10;
  React.useEffect(() => {
    getPhonesPage(page, limit)
      .then((data) => {
        if (data.length === 0) {
          setPage(page - 1);
          setError("Não há celulares para serem exibidos");
          return;
        }
        setPhones(data);
      })
      .catch((error) => setError(error.message));

    return () => {
      setPhones([]);
    };
  }, []);

  React.useEffect(() => {
    setError("")
    getPhonesPage(page, limit)
      .then((data) => {
        if (data.length === 0) {
          setPage(page - 1);
          setError("Não há celulares para serem exibidos");
          return;
        }
        setPhones(data);
      })
      .catch((error) => setError(error.message));
  }, [page]);

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
          className="text-white px-4 py-2 rounded bg-green-500 hover:bg-green-600 mb-4"
        >
          Create Phone
        </Link>
        <div className="h-8" />
        {error === "" ? (
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
                  <td>{phone.release.toLocaleDateString()}</td>
                  <td className="border border-gray-800">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      onClick={() => {
                        navigate(`/edit-phone/${phone.id}`);
                      }}
                    >
                      Alterar
                    </button>
                  </td>
                  <td className="border border-gray-800">
                    <button
                      className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded"
                      onClick={() => {
                        deletePhone(phone.id as string)
                          .then(() => {
                            setPhones(phones.filter((p) => p.id !== phone.id));
                          })
                          .catch((error) => setError(error.message));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-2xl font-bold text-center text-red-500 mb-8">
            {error}
          </h2>
        )}
        <div className="flex justify-between w-full mt-8">
          <button
            className={`text-white px-4 py-2 rounded ${
              page === 0
                ? "bg-gray-800 hover:bg-gray-900 cursor-not-allowed"
                : "bg-red-800 hover:bg-red-900 disabled:opacity-50"
            }`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </button>

          <span className="text-gray-50">Pagina {page}</span>

          <button
            className="text-white px-4 py-2 rounded bg-blue-800 hover:bg-blue-900 disabled:opacity-50"
            onClick={() => setPage(page + 1)}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};
