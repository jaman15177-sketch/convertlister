export interface UserContext {
  user_id: string;
  org_id: string;
  role: "admin" | "user" | "system";
}

let currentUser: UserContext | null = null;

export function setUserContext(ctx: UserContext) {
  currentUser = ctx;
}

export function getUserContext() {
  return currentUser;
}
