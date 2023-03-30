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

export enum ActivityModel {
  USER = 'USER',
  REWARD = 'REWARD',
  PRODUCT = 'PRODUCT',
  ASSET = 'ASSET',
  POINT = 'POINT',
  LOCATION = 'LOCATION',
  GALLERY = 'GALLERY',
}

export enum Assets {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
}

export enum AuthCallbackStatus {
  LOGIN = 'login',
  FORGOT = 'forgot',
  RESET = 'reset',
}

export enum AwardStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  WAITING = 'WAITING',
}

export enum MenuAction {
  VIEW = `view`,
  EDIT = `edit`,
  DELETE = `delete`,
  CHANGE_PASSWORD = `changePassword`,
}

export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  DISABLED = 'DISABLED',
  OUTOFSTOCK = 'OUTOFSTOCK',
}

export enum RequestStatus {
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
  WAITING = 'Waiting',
}

export enum ResponseStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  SUCCESS = 'success',
}

export enum RewardStatus {
  AVAILABLE = 'Available',
  OUT = 'Out of Stock',
}

export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SUPER = 'SUPER',
}

export enum UserStatus {
  ACTIVATED = 'ACTIVATED',
  DISABLED = 'DISABLED',
  ARCHIVED = 'ARCHIVED',
  VERIFY_PHONE = 'VERIFY_PHONE',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
}
