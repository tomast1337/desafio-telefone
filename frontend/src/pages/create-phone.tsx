import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone } from "../context/phone-context";
import { usePhone } from "../context/use-phone";

export const CreatePhone = () => {
  const { addPhone } = usePhone();

  const navigate = useNavigate();

  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [memory, setMemory] = React.useState(16);
  const [release, setRelease] = React.useState(new Date());

  const [error, setError] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPhone({
      brand,
      model,
      memory,
      release,
    } as Phone).catch((error) => {
      setError(error.message);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900 lg:w-[900px] mx-auto px-10">
      <div className="w-full mt-8 border-2 border-gray-50 rounded p-4">
        <h1 className="text-4xl font-bold text-center text-gray-50 mb-8 relative top-[-45px] bg-gray-900 w-[fit-content] mx-auto px-4 py-2 rounded">
          Celular
        </h1>
        <h2 className="text-2xl font-bold text-center text-red-500 mb-8">
          {error}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col w-full mt-8">
          <label htmlFor="brand" className="text-gray-50">
            Marca
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="px-4 py-2 rounded bg-gray-800 text-gray-50"
            onChange={(event) => setBrand(event.target.value)}
          />
          <label htmlFor="model" className="text-gray-50">
            Modelo
          </label>
          <input
            type="text"
            id="model"
            name="model"
            className="px-4 py-2 rounded bg-gray-800 text-gray-50"
            onChange={(event) => setModel(event.target.value)}
          />
          <label htmlFor="memory" className="text-gray-50">
            Memória
          </label>
          <input
            type="text"
            id="memory"
            name="memory"
            className="px-4 py-2 rounded bg-gray-800 text-gray-50"
            onChange={(event) => {
              const value = Number(event.target.value);
              if (value > 0) {
                setMemory(value);
              }
            }}
          />
          <label htmlFor="release" className="text-gray-50">
            Lançamento
          </label>
          <input
            type="date"
            id="release_date"
            name="release_date"
            className="px-4 py-2 rounded bg-gray-800 text-gray-50"
            onChange={(event) => setRelease(new Date(event.target.value))}
          />
          <div className="flex justify-between w-full mt-8">
            <button
              className="text-white px-4 py-2 rounded bg-gray-800 mt-8"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white px-4 py-2 rounded bg-gray-800 mt-8"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
