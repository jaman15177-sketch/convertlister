import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);
