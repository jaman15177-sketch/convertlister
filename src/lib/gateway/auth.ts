import { getUser } from "../auth";

export async function authGuard(req: Request) {
  const user = await getUser(req);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return {
    userId: user.id,
  };
}
