// model은 interface or class 사용

export enum BoardStatus {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
