export declare namespace RoleType {
  enum UserRoleType {
    SUPER = 'SUPER',
    ADMIN = 'ADMIN',
    TABLET = 'TABLET',
    USER = 'USER',
    GUEST = 'GUEST',
  }

  type Role = {
    name: string;
    permissions: null;
    shortCode: UserRoleType;
  };
}
