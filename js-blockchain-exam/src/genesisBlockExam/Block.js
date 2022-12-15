import merkle from "merkle";
import SHA256 from "crypto-js/sha256.js";

class Block {
  constructor(_header, _data) {
    Object.assign(this, _header);
    // 머클 루트
    const merkleRoot = Block.getMerkleRoot(_data);
    // 특정 블록을 식별하는데에 사용되는 고유 식별자
    /*
    [ 블록 해시값의 구성 ]
    해당 블록의 생성일 (header.timestamp)
    버전 (header.version)
    이전 블록의 해시 (header.previousHash)
    비트 (bits)
    머클루트 (merkleRoot)
    논스 (nonce)
     -> 이들의 조합을 해싱하여 생성한다.
     */
    this.hash = Block.createBlockHash(_header, merkleRoot);
    this.merkleRoot = merkleRoot;
    this.data = _data;
    /*
    // 채굴 난이도
    this.difficulty = ?
    // 논스라는 임시값
    this.nonce = ""
    */
  }

  static getMerkleRoot(_data) {
    const merkleTree = merkle("sha256").sync(_data);
    const merkleRoot = merkleTree.root();
    return merkleRoot;
  }

  static createBlockHash(_header, _merkleRoot) {
    const values = Object.values(_header);
    const data = values.join("") + _merkleRoot;
    return SHA256(data).toString();
  }
}

export default Block;
