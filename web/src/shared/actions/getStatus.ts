"use server";

import API from "../utils/api";

export default async function getStatus(): Promise<string> {
  const data = await API.get("/health");
  const { message } = data;

  return message;
}
