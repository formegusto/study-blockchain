import { SHA256 } from "crypto-js";
import merkle from "merkle";
import { BlockHeader } from "./blockHeader";
import { GENESIS } from "@core/config";

export class Block extends BlockHeader implements IBlock {
  public hash: string;
  public merkleRoot: string;
  public nonce: number;
  public difficulty: number;
  public data: string[];

  constructor(_previouseBlock: Block, _data: string[]) {
    super(_previouseBlock);

    const merkleRoot = Block.getMerkleRoot(_data);

    this.merkleRoot = merkleRoot;
    this.hash = Block.createBlockHash(this);
    this.nonce = 0;
    this.difficulty = 0;
    this.data = _data;
  }

  public static getGENESIS(): Block {
    return GENESIS;
  }

  public static getMerkleRoot<T>(_data: T[]): string {
    const merkleTree = merkle("sha256").sync(_data);
    return merkleTree.root();
  }

  public static createBlockHash(_block: Block): string {
    const { version, timestamp, height, merkleRoot, previousHash } = _block;
    const values: string = [
      version,
      timestamp,
      height,
      merkleRoot,
      previousHash,
    ].join("");
    return SHA256(values).toString();
  }

  public static generateBlock(_previousBlock: Block, _data: string[]): Block {
    const generateBlock = new Block(_previousBlock, _data);
    return generateBlock;
  }

  public static isValidNewBlock(
    _newBlock: Block,
    _previousBlock: Block
  ): Failable<Block, string> {
    if (_previousBlock.height + 1 !== _newBlock.height)
      return { isError: true, error: "height error" };
    if (_previousBlock.hash !== _newBlock.previousHash)
      return { isError: true, error: "block hash error" };
    return { isError: false, value: _newBlock };
  }
}
