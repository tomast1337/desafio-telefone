import axios from "axios";
import React from "react";
export type Phone = {
  id: number;
  brand: string;
  model: string;
  memory: number;
  release: Date;
};

export type PhoneContextType = {
  getPhonesPage: (page: number, limit: number) => Promise<Phone[]>;
  addPhone: (phone: Phone) => Promise<void>;
  deletePhone: (id: number) => Promise<void>;
  updatePhone: (phone: Phone) => Promise<void>;
};

export const PhoneContext = React.createContext({} as PhoneContextType);

export const PhoneProvider = ({ children }: { children: React.ReactNode }) => {
  const [phones, setPhones] = React.useState<Phone[]>([
    {
      id: 0,
      brand: "Samsung",
      model: "Galaxy S21",
      memory: 128,
      release: new Date("2021-01-29"),
    },
  ]);
  const getPhonesPage = async (page = 1, limit = 10): Promise<Phone[]> => {
    const url = `/phones/${page}/${limit}`;
    const response = await axios.get(url);
    const { data } = await response;
    setPhones(data);
    return phones;
  };
  const addPhone = async (phone: Phone) => {
    const response = await axios.post("/phones", phone);
    const { data } = await response;
    setPhones([...phones, data]);
  };
  const deletePhone = async (id: number) => {
    await axios.delete(`/phones/${id}`);
    setPhones(phones.filter((phone) => phone.id !== id));
  };
  const updatePhone = async (phone: Phone) => {
    const response = await axios.put(`/phones/${phone.id}`, phone);
    const { data } = await response;
    setPhones(phones.map((phone) => (phone.id === data.id ? data : phone)));
  };
  return (
    <PhoneContext.Provider
      value={{ getPhonesPage, addPhone, deletePhone, updatePhone }}
    >
      {children}
    </PhoneContext.Provider>
  );
};
