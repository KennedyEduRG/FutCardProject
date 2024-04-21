export class Player {
  public nickName: string;
  public readyToBattle: boolean;

  constructor(nickName: string) {
    this.nickName = nickName;
    this.readyToBattle = false;
  }
}
