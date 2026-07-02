export type ID = string;
export type Timestamp = number;

export interface BaseEntity {
  id: ID;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface User extends BaseEntity {
  email: string;
  role: "user" | "admin";
  organizationId: ID;
}

export interface Tenant extends BaseEntity {
  name: string;
}
