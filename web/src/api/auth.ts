import axios from "axios";
import { ILoginResponse } from "../interfaces";

export const loginAPI = async (email: string, password: string) => {
  const response = await axios.post<ILoginResponse>("/auth/login", {
    email,
    password,
  });

  return response;
};
