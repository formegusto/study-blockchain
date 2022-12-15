import merkle from "merkle";

/*
merkle
블록 안에는 트랜잭션에 대한 내용이 데이터로 저장되는데, 트랜잭션의 내용들을 해싱하여 해시값들로 이루어진
트리구조를 만들게 된다. 이를 "머클트리"라 한다. 그리고 머클트리의 루트에 대한 해시값이 머클루트이다.

merkle.js
머클루트를 만들어주는 라이브러리 이다.
*/

function merkleExam() {
  const data = ["asdf", "asdf", "asdf", "asdfasdf", "asdfqwer", "qwerqwer"];

  const merkleTree = merkle("sha256").sync(data);
  const merkleRoot = merkleTree.root();

  console.log(`merkleRoot : ${merkleRoot}`);
}

export default merkleExam;
