type Session = {
  userId: string;
  tenantId: string;
  createdAt: number;
};

const sessions = new Map<string, Session>();

export function createSession(token: string, session: Session) {
  sessions.set(token, session);
}

export function getSession(token: string) {
  return sessions.get(token);
}

export function deleteSession(token: string) {
  sessions.delete(token);
}
