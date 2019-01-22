import { BehaviorSubject } from 'rxjs/BehaviorSubject';



export interface Adapter {
  isInitialized: boolean;
  isLoading?: boolean;
  isLoading$?: BehaviorSubject<boolean>;
  reload: Function;
}

export enum AdapterActionType {
  reload = 'reload'
}

export interface AdapterAction {
  action: AdapterActionType;
  payload: any;
}
