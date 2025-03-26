export interface MessengerInstance {
  initialize: (config: any) => void;
  open: () => void;
  close: () => void;
  updateConfig: (config: any) => void;
  updateUserSession: (session: any) => void;
}
