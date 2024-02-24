export interface IPushMessage {
  title: string;
  message: string;
  pushData?: Record<string, any>;
  bigPictureUrl?: string;
  subId?: string;
}

export interface IIndiePushPostApiBody {
  subID: string;
  appId: number;
  appToken: string;
  title: string;
  message: string;
  pushData?: Record<string, any>;
}

export interface PushPostApiBody {
  appId: number;
  appToken: string;
  title: string;
  body: string;
  dateSent: string;
  pushData?: Record<string, any>;
}
