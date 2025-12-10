/*//////////////////////////////////////////////////////////////
                          GENERIC TYPES
//////////////////////////////////////////////////////////////*/

export type Result<T, E extends Error> =
  | { ok: true; data: T }
  | { ok: false; error: E };

export type Body<T> = {
  message: string;
  error?: string;
  data?: T;
};

/*//////////////////////////////////////////////////////////////
                          APP TYPES
//////////////////////////////////////////////////////////////*/

export type Credentials = {
  emailAddress: string;
  password: string;
  otp: string;
};

/*//////////////////////////////////////////////////////////////
                          USER TYPES
//////////////////////////////////////////////////////////////*/

export enum Role {
  Professional = "PROFESSIONAL",
  Proprietor = "PROPRIETOR",
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  walletAddress: string;
  password: string;
  role: Role;
};
