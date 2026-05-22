export type Role = "ADMIN" | "USER";

export type User = {
  id: string;
  email: string;
  password: string;
  tenantId: string;
  role: Role;
};

export type Tenant = {
  id: string;
  name: string;
};

export type JwtPayload = {
  userId: string;
  tenantId: string;
  role: Role;
};
