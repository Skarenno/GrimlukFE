import type { Card } from "../../models/User";
import type { CardCreateRequest, CardUpdateRequest } from "./requests";
import { api } from "../apiClient";

const serviceName = "card"

export const getCards = async (userId: number): Promise<Card[]> => {
  const res = await api.get(`/${serviceName}/getByUser/${userId}`);
  return res.data;
};

export const createCard = async (data: CardCreateRequest): Promise<Card> => api.post(`/${serviceName}/create`, data)

export const updateCard = async (cardId: number, data: CardUpdateRequest) => {
  const res = await api.patch(`/${serviceName}/update/${cardId}`, data);
  return res.data;
};