declare interface IBlockHeader {
  version: string;
  height: number;
  timestamp: number;
  previousHash: string;
}

declare interface IBlock extends IBlockHeader {
  merkleRoot: string;
  hash: string;
  /*
  nonce와 difficulty는 채굴난이도와 마이닝 부분을 구현할 때 사용하게 되는 속성
  */
  nonce: number;
  difficulty: number;
  data: string[];
}
