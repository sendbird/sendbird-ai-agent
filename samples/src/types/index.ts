export interface MessengerInstance {
  initialize: (config: any) => Promise<void>;
  open: () => void;
  close: () => void;
  updateConfig: (config: any) => Promise<void>;
  updateUserSession: (session: any) => Promise<void>;
}
