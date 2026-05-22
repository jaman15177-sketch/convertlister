import { authService } from "./service";

export const register = async (req: any, res: any) => {
  try {
    const result = await authService.register(req.body.email, req.body.password);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const refresh = async (req: any, res: any) => {
  try {
    const result = await authService.refresh(req.body.refreshToken);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
