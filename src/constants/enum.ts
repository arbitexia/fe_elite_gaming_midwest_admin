export enum ActivityType {
  CHECKIN = 'CHECKIN',
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',
  GET = 'GET',
  VIEW = 'VIEW',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  REQUEST = 'DECLINE',
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
}

export enum ActivityModel {
  USER = 'USER',
  REWARD = 'REWARD',
  PRODUCT = 'PRODUCT',
  ASSET = 'ASSET',
  POINT = 'POINT',
  LOCATION = 'LOCATION',
  GALLERY = 'GALLERY',
  TRANSACTION = 'TRANSACTION',
  TABLET = 'TABLET',
  VERIFICATION = 'VERIFICATION',
  EMAIL_TEMPLATE = 'EMAIL_TEMPLATE',
  ROLE = 'ROLE',
  USE_LOCATION = 'USE_LOCATION',
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

export enum MenuAction {
  VIEW = `view`,
  EDIT = `edit`,
  DELETE = `delete`,
  CHANGE_PASSWORD = `changePassword`,
  SEND_EMAIL = 'sendEmail',
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

export enum LocationStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export enum TransactionStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  WAITING = 'WAITING',
}

export enum EmailTemplateStatusEnum {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum EmailTemplateTypeEnum {
  DEFAULT = 'DEFAULT',
  DYNAMIC = 'DYNAMIC',
}

export enum EmailTemplateCategoryEnum {
  CONFIRM_USER_REGISTER = 'CONFIRM_USER_REGISTER',
  VERIFY_FORGOT_PASSWORD = 'VERIFY_FORGOT_PASSWORD',
  CONFIRM_RESET_PASSWORD = 'CONFIRM_RESET_PASSWORD',
  FORCE_RESET_PASSWORD = 'FORCE_RESET_PASSWORD',
  ADD_POINT = 'ADD_POINT',
  ACCEPT_TRANSACTION = 'ACCEPT_TRANSACTION',
  DECLINE_TRANSACTION = 'DECLINE_TRANSACTION',
  REQUEST_TRANSACTION = 'REQUEST_TRANSACTION',
}
