export type ServerData = {
  online: boolean;
  host: string;
  port: number;
  ip_address?: string;
  version?: {
    name_clean: string;
    protocol: number;
  };
  players?: {
    online: number;
    max: number;
  };
  motd?: {
    clean: string;
  };
  icon?: string;
};

export type FetchResult =
  | { success: true; data: ServerData }
  | { success: false; error: string };
