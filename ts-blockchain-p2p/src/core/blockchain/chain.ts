import { Block } from "@core/blockchain/block";
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from "@core/config";

/*
block.ts와 blockHeader.ts만으로 이미 block들의 체이닝 작업은 정상적으로 진행이된다.
모든 블록 객체들이 previousHash 값을 속성으로 가지고 있기 때문에 특정 블록을 기준으로 
이전 블록의 hash값이 달라질 경우 현재 블록의 previousHash값과의 불일치가 발생하여 연결 고리가 끊기게 된다.

Chain 클래스를 따로 만들어서 생성된 블록들을 하나의 배열안에 담아두는 이유는
PoW 구현을 위한 '난이도(difficulty)'를 계산하기 위함이다.
*/

export class Chain {
  private blockchain: Block[];

  constructor() {
    this.blockchain = [Block.getGENESIS()];
  }

  get chain(): Block[] {
    return this.blockchain;
  }

  get length(): number {
    return this.blockchain.length;
  }

  get latestBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }

  public addBlock(data: string[]): Failable<Block, string> {
    const previousBlock = this.latestBlock;

    const adjustmentBlock: Block = this.getAdjustmentBlock();

    const newBlock = Block.generateBlock(previousBlock, data, adjustmentBlock);
    const isValid = Block.isValidNewBlock(newBlock, previousBlock);

    if (isValid.isError) return { isError: true, error: isValid.error };

    this.blockchain.push(newBlock);

    return { isError: false, value: newBlock };
  }

  /**
   * getAdjustmentBlock()
   * 생성 시점 기준으로 블록 높이가 -10인 블록 구하기
   * 1. 현재 높이값 < DIFFICULTY_ADJUSTMENT_INTERVAL : 제네시스 블록 반환
   * 2. 현재 높이값 > DIFFICULTY_ADJUSTMENT_INTERVAL : -10번째 블록 반환
   */
  public getAdjustmentBlock() {
    const currentLength = this.length;
    const adjustmentBlock: Block =
      this.length < DIFFICULTY_ADJUSTMENT_INTERVAL
        ? Block.getGENESIS()
        : this.blockchain[currentLength - DIFFICULTY_ADJUSTMENT_INTERVAL];

    return adjustmentBlock;
  }
}
