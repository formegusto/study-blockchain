import { SHA256 } from "crypto-js";
import merkle from "merkle";
import { BlockHeader } from "./blockHeader";
import {
  BLOCK_GENERATION_INTERVAL,
  BLOCK_GENERATION_TIME_UNIT,
  DIFFICULTY_ADJUSTMENT_INTERVAL,
  GENESIS,
} from "@core/config";
import hexToBinary from "hex-to-binary";

export class Block extends BlockHeader implements IBlock {
  public hash: string;
  public merkleRoot: string;
  public nonce: number;
  public difficulty: number;
  public data: string[];

  constructor(
    _previouseBlock: Block,
    _data: string[],
    _adjustmentBlock: Block
  ) {
    super(_previouseBlock);

    const merkleRoot = Block.getMerkleRoot(_data);

    this.merkleRoot = merkleRoot;
    this.hash = Block.createBlockHash(this);
    this.nonce = 0;
    this.difficulty = Block.getDifficulty(
      this,
      _adjustmentBlock,
      _previouseBlock
    );
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
    const {
      version,
      timestamp,
      height,
      merkleRoot,
      previousHash,
      difficulty,
      nonce,
    } = _block;
    const values: string = [
      version,
      timestamp,
      height,
      merkleRoot,
      previousHash,
      difficulty,
      nonce,
    ].join("");
    return SHA256(values).toString();
  }

  public static generateBlock(
    _previousBlock: Block,
    _data: string[],
    _adjustmentBlock: Block
  ): Block {
    const generateBlock = new Block(_previousBlock, _data, _adjustmentBlock);

    const newBlock = Block.findBlock(generateBlock);

    return newBlock;
  }

  /**
   * 마이닝 작업 코드
   * 블록체인에서 "마이닝" 이라고 하면 코인이 채굴되는 것만을 생각할 수 있는데,
   * "코인의 채굴" 이라는 관점은 채굴자의 입장에서 바라본 마이닝인 것 이고
   * "PoW" 방식의 합의 알고리즘을 거쳐 블록이 생성되는 것의 의미가 개발 입장에서 바라본 마이닝이다.
   * 블록 생성의 부산물로써 보상의 개념으로 얻어지는 것이 코인일 뿐, 코인을 얻게 되는
   * 근본적인 블록 생성 자체가 마이닝인 것 이다.
   */
  public static findBlock(_generateBlock: Block) {
    let hash: string;
    let nonce: number = 0;

    while (true) {
      nonce++;
      _generateBlock.nonce = nonce;
      hash = Block.createBlockHash(_generateBlock);

      const binary: string = hexToBinary(hash);
      // const result: boolean = hash
      //   .toString()
      //   .startsWith("0".repeat(_generateBlock.difficulty));
      const result: boolean = binary.startsWith(
        "0".repeat(_generateBlock.difficulty)
      );

      if (result) {
        _generateBlock.hash = hash;
        return _generateBlock;
      }
    }
  }

  public static getDifficulty(
    _newBlock: Block,
    _adjustmentBlock: Block,
    _previousBlock: Block
  ): number {
    if (_newBlock.height <= 9) return 0;
    if (_newBlock.height <= 19) return 1;

    // 10번째 배수의 블록에 한서만 난이도 구현
    // 10개의 묶음씩 같은 난이도를 갖게 된다.
    if (_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0)
      return _previousBlock.difficulty;

    // 블록 1개당 생성시간 : 10분, 10개 생성되는데 걸리는 시간 : 6,000초
    /**
     * DIFFICULTY_ADJUSTMENT_INTERVAL = 10
     * BLOCK_GENERATION_INTERVAL = 10
     * BLOCK_GENERATION_TIME_UNIT = 60
     */
    const timeTaken: number = _newBlock.timestamp - _adjustmentBlock.timestamp;
    const timeExpected: number =
      BLOCK_GENERATION_TIME_UNIT *
      BLOCK_GENERATION_INTERVAL *
      DIFFICULTY_ADJUSTMENT_INTERVAL;

    if (timeTaken < timeExpected / 2) return _adjustmentBlock.difficulty + 1;
    else if (timeTaken > timeExpected * 2)
      return _adjustmentBlock.difficulty - 1;

    return _adjustmentBlock.difficulty;
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
