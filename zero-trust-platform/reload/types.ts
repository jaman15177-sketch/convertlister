export type ServiceNode = {
  id: string;
  name: string;
  version: string;
  healthy: boolean;
};

export type ReloadResult = {
  service: string;
  success: boolean;
  timestamp: string;
};
