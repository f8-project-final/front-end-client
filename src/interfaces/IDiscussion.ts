import { IMessage } from "./IMessage";

export interface IDiscussion {
  _id: string;
  title: string;
  messageIds: IMessage[];
  userId: string;
  createdAt: Date;
}
