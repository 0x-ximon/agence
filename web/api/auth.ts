import type { Credentials, Role, User } from "@/lib/types";
import { apiRequest } from ".";

export type RegisterParams = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  walletAddress: string;
  password: string;
  role: Role;
};

export type RegisterResponse = Omit<User, "password">;

export const register = async (params: RegisterParams) => {
  return apiRequest<RegisterParams, RegisterResponse>({
    url: `/auth/register`,
    method: "POST",
    params,
  });
};

export type InitiateParams = Omit<Credentials, "otp">;

export type InitiateResponse = Omit<User, "password">;

export const initiate = async (params: InitiateParams) => {
  return apiRequest<InitiateParams, InitiateResponse>({
    url: `/auth/initiate`,
    method: "POST",
    params,
  });
};

export type ValidateParams = Omit<Credentials, "password">;

export type ValidateResponse = {
  user: Omit<User, "password">;
  token: string;
};

export const validate = async (params: ValidateParams) => {
  return apiRequest<ValidateParams, ValidateResponse>({
    url: `/auth/validate`,
    method: "POST",
    params,
  });
};
