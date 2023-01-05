export enum ResponseStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  SUCCESS = 'success',
}

export enum AuthCallbackStatus {
  LOGIN = 'login',
  FORGOT = 'forgot',
  RESET = 'reset',
}

export declare namespace CommonType {
  export type Address = {
    address1?: string;
    address2?: string;
    city: string;
    state: string;
    zipcode: string;
    country?: string;
  };
}
