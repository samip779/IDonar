import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  IIndiePushPostApiBody,
  IPushMessage,
  PushPostApiBody,
} from './interface';
import { REACT_NOTIFY } from '../environments';
import { ReactNativeNotifyApiUris } from './constants';

@Injectable()
export class PushNotificationService {
  constructor(private readonly httpService: HttpService) {}

  async pushNotification(payload: IPushMessage): Promise<void> {
    const body: PushPostApiBody = {
      appId: REACT_NOTIFY.APP_ID,
      appToken: REACT_NOTIFY.APP_TOKEN,
      title: payload.title,
      body: payload.message,
      dateSent: new Date().toDateString(),
      pushData: payload.pushData ? payload.pushData : {},
    };

    try {
      await this.httpService.axiosRef.post(
        REACT_NOTIFY.API_BASE_URL + ReactNativeNotifyApiUris.PUSH,
        body,
      );
    } catch (error) {}
  }

  async pushIndieNotification(payload: IPushMessage): Promise<void> {
    const body: IIndiePushPostApiBody = {
      subID: payload.subId,
      appId: REACT_NOTIFY.APP_ID,
      appToken: REACT_NOTIFY.APP_TOKEN,
      title: payload.title,
      message: payload.message,
      pushData: payload.pushData ? payload.pushData : {},
    };

    try {
      await this.httpService.axiosRef.post(
        REACT_NOTIFY.API_BASE_URL + ReactNativeNotifyApiUris.INDIE_PUSH,
        body,
      );
    } catch (error) {}
  }
}
