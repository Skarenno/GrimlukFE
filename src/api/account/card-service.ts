import { createApiClient } from "../apiClient";
import type { Card } from "../../models/User";
import type { CardCreateRequest, CardUpdateRequest } from "./requests";

const api = createApiClient(import.meta.env.VITE_API_CARD_URL);

export const getCards = async (userId: number): Promise<Card[]> => {
  const res = await api.get(`/getByUser/${userId}`);
  return res.data;
};

export const createCard = async (data: CardCreateRequest): Promise<Card> => api.post("/create", data)

export const updateCard = async (cardId: number, data: CardUpdateRequest) => {
  const res = await api.patch(`/update/${cardId}`, data);
  return res.data;
};