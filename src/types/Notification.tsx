export type NotificationType = {
  id: number;
  model: string;
  type: string;
  data: any;
  createdAt: string;
  updatedAt?: string;
};

export interface NotificationMenuItemProps {
  notification: NotificationType;
}
