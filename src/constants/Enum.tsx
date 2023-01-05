export enum UserStatus {
  ACTIVATED = 'ACTIVATED',
  DISABLED = 'DISABLED',
  ARCHIVED = 'ARCHIVED',
  VERIFY_PHONE = 'VERIFY_PHONE',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
}

export enum AssetType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
}

export enum RequestStatus {
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
  WAITING = 'Waiting',
}

export enum RewardStatus {
  AVAILABLE = 'Available',
  OUT = 'Out of Stock',
}

export enum MenuAction {
  VIEW = `view`,
  EDIT = `edit`,
  DELETE = `delete`,
}

export enum ActivityModel {
  USER = 'USER',
  REWARD = 'REWARD',
  POINT = 'POINT',
  ASSET = 'ASSET',
  REQUEST = 'REQUEST',
  LOCATION = 'LOCATION',
}

export enum ActivityType {
  CHECKIN = 'CHECKIN',
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',
  GET = 'GET',
  VIEW = 'VIEW',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
