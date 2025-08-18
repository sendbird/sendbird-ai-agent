export interface Config {
  hasSession: boolean;
  language: string;
  context: Record<string, string> | null;
  enableRuntimeUpdate: boolean;
}

export type ConfigKey = keyof Pick<Config, 'hasSession' | 'language' | 'enableRuntimeUpdate'>;

export type ConfigValue<K extends ConfigKey> = Config[K];

export const DEFAULT_PLAYGROUND_CONFIG: Config = {
  hasSession: false,
  language: 'en-US',
  context: null,
  enableRuntimeUpdate: false,
};
