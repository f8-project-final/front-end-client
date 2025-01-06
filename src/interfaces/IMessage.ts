export interface IMessage {
  _id: string;
  text: string;
  discussionId: string;
  sender: string;
  timestamp: Date;
}
