"use server";

import api from "../utils/api";

export default async function getStatus(): Promise<string> {
  const response = await api("/health");
  const { msg } = await response.json();

  return msg;
}
