"use server";

import { healthCheck } from "@/api";
import {
  type InitiateParams,
  type InitiateResponse,
  initiate,
  type RegisterParams,
  type RegisterResponse,
  register,
  type ValidateParams,
  type ValidateResponse,
  validate,
} from "@/api/auth";
import { AuthError } from "@/lib/errors";
import type { Result } from "@/lib/types";

export async function signup(
  params: RegisterParams,
): Promise<Result<RegisterResponse, AuthError>> {
  const healthResult = await healthCheck();
  if (!healthResult.ok) {
    return {
      ok: false,
      error: new AuthError({
        message: "Service unavailable, try again later",
        cause: healthResult.error,
      }),
    };
  }

  const result = await register(params);
  if (!result.ok) {
    return {
      ok: false,
      error: new AuthError({
        message: "Account registration failed",
        cause: result.error,
      }),
    };
  }

  return {
    ok: true,
    data: result.data,
  };
}

export async function signin(
  params: InitiateParams,
): Promise<Result<InitiateResponse, AuthError>> {
  const healthResult = await healthCheck();
  if (!healthResult.ok) {
    return {
      ok: false,
      error: new AuthError({
        message: "Service unavailable, try again later",
        cause: healthResult.error,
      }),
    };
  }

  const result = await initiate(params);
  if (!result.ok) {
    return {
      ok: false,
      error: new AuthError({
        message: "Authentication initiation failed",
        cause: result.error,
      }),
    };
  }

  return {
    ok: true,
    data: result.data,
  };
}

export async function verify(
  params: ValidateParams,
): Promise<Result<ValidateResponse, AuthError>> {
  const healthResult = await healthCheck();
  if (!healthResult.ok) {
    return {
      ok: false,
      error: new AuthError({
        message: "Service unavailable, try again later",
        cause: healthResult.error,
      }),
    };
  }

  const result = await validate(params);
  if (!result.ok) {
    return {
      ok: false,
      error: new AuthError({
        message: "Authentication validation failed",
        cause: result.error,
      }),
    };
  }

  return {
    ok: true,
    data: result.data,
  };
}
