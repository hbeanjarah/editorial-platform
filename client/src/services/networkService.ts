import { api } from "./api";
import type { Network } from "@/types";

export async function getAll(): Promise<Network[]> {
  const { data } = await api.get("/networks");
  return data;
}
