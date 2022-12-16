export class BlockHeader implements IBlockHeader {
  public version: string;
  public height: number;
  public timestamp: number;
  public previousHash: string;

  constructor(_previousBlock: IBlock) {
    this.version = BlockHeader.getVersion();
    this.timestamp = BlockHeader.getTimestamp();
    this.height = _previousBlock.height + 1;
    this.previousHash = _previousBlock.hash;
  }

  public static getVersion() {
    return "1.0.0";
  }

  public static getTimestamp() {
    return new Date().getTime();
  }
}
