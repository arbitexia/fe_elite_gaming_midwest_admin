export type RequestItemType = {
  id: number;
  item: { name: string; price: number; color: string; point: number };
  user: { name: string; phone: string };
  location: string;
  status: string;
  requestedAt: string;
};
