import { cookies } from "next/headers";
import { env } from "@/lib/env";
import "server-only";
import { ApiError } from "@/lib/errors";
import type { Body, Result } from "@/lib/types";

interface RequestConfig<T> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  params?: T;
  headers?: never;
}

export async function apiRequest<P = unknown, R = unknown>({
  url,
  method,
  params,
}: RequestConfig<P>): Promise<Result<R, ApiError>> {
  const body = JSON.stringify(params);
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };

  const c = await cookies();
  const token = c.get("session")?.value;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method,
    headers,
    body: method === "GET" ? undefined : body,
  };

  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${url}`, init);
  const value: Body<R> = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      error: new ApiError({
        message: value.error ?? response.statusText,
      }),
    };
  }

  if (!value.data) {
    return {
      ok: false,
      error: new ApiError({
        message: value.error ?? "No data received",
      }),
    };
  }

  return {
    ok: true,
    data: value.data,
  };
}

export const healthCheck = () => {
  return apiRequest<never, unknown>({
    url: `/health`,
    method: "GET",
  });
};
