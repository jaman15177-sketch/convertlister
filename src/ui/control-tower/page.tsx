type Metrics = Record<string, number>;

type ControlTowerEvent = {
  type: string;
  organizationId: string;
  event?: Record<string, unknown>;

  state?: {
    ADS_METRICS?: Metrics;
    HEALTH?: Metrics;
  };
};
