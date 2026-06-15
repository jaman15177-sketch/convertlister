export interface Settings {
  alert_threshold: number;
  severity_multiplier: number;
  realtime_enabled: boolean;
}

export const defaultSettings: Settings = {
  alert_threshold: 5,
  severity_multiplier: 2,
  realtime_enabled: true,
};

let runtimeSettings = { ...defaultSettings };

export function getSettings() {
  return runtimeSettings;
}

export function updateSettings(partial: Partial<Settings>) {
  runtimeSettings = {
    ...runtimeSettings,
    ...partial,
  };
}
