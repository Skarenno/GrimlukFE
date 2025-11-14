import { createApiClient } from "../apiClient";
import type { Card } from "../../models/User";

const api = createApiClient(import.meta.env.VITE_API_CARD_URL);

export const getCards = async (userId: number): Promise<Card[]> => {
  const res = await api.get(`/getByUser/${userId}`);
  return res.data;
};
