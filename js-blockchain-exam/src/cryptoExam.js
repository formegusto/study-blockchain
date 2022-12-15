import SHA256 from "crypto-js/sha256.js";

/*
Hash
BlockChain 에서 Block들이 Chain되는 형태의 핵심 기술

1. 단방향
2. 결정론적
*/

function cryptoExam() {
  const hash = "my first block";

  console.log(`input : ${hash}`);
  console.log(`result : ${SHA256(hash).toString()}`);
  console.log(`length : ${SHA256(hash).toString().length}`);
}

export default cryptoExam;
