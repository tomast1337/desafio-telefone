import axios from "axios";
import React from "react";
export type Phone = {
  id: string | undefined;
  brand: string;
  model: string;
  memory: number;
  release: Date;
};

export type PhoneContextType = {
  getPhonesPage: (page: number, limit: number) => Promise<Phone[]>;
  addPhone: (phone: Phone) => Promise<void>;
  deletePhone: (id: string) => Promise<void>;
  updatePhone: (phone: Phone) => Promise<void>;
  getPhoneById: (id: string) => Promise<Phone>;
};

export const PhoneContext = React.createContext({} as PhoneContextType);

export const PhoneProvider = ({ children }: { children: React.ReactNode }) => {
  const [phones, setPhones] = React.useState<Phone[]>([]);
  const getPhonesPage = async (page = 1, limit = 10): Promise<Phone[]> => {
    const url = `/phones/${page}/${limit}`;
    try {
      const response = await axios.get(url);
      const { data } = await response;
      const phones = [] as Phone[];
      data.forEach((phone: Phone) => {
        phones.push({
          id: phone.id,
          brand: phone.brand,
          model: phone.model,
          memory: phone.memory,
          release: new Date(phone.release),
        });
      });
      setPhones(phones);
      return phones;
    } catch (error) {
      throw new Error("Não foi possível obter os celulares");
    }
  };
  const addPhone = async (phone: Phone) => {
    try {
      const response = await axios.post("/phones", phone);
      const { data } = await response;
      setPhones([...phones, data]);
    } catch (error) {
      throw new Error("Não foi possível adicionar o celular");
    }
  };
  const deletePhone = async (id: string) => {
    try {
      await axios.delete(`/phones/${id}`);
      setPhones(phones.filter((phone) => phone.id !== id));
    } catch (error) {
      throw new Error("Não foi possível excluir o celular");
    }
  };
  const updatePhone = async (phone: Phone) => {
    try {
      const response = await axios.put(`/phones/${phone.id}`, phone);
      const { data } = await response;
      setPhones(phones.map((phone) => (phone.id === data.id ? data : phone)));
    } catch (error) {
      throw new Error("Não foi possível atualizar o celular");
    }
  };

  const getPhoneById = async (id: string): Promise<Phone> => {
    try {
      const response = await axios.get(`/phones/${id}`);
      const { data } = await response;
      return {
        id: data.id,
        brand: data.brand,
        model: data.model,
        memory: data.memory,
        release: new Date(data.release),
      };
    } catch (error) {
      throw new Error("Não foi possível obter o celular");
    }
  };
  return (
    <PhoneContext.Provider
      value={{
        getPhonesPage,
        addPhone,
        deletePhone,
        updatePhone,
        getPhoneById,
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};
