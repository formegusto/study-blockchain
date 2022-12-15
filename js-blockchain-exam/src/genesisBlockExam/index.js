import BlockHeader from "./BlockHeader.js";
import Block from "./Block.js";

/*
제네시스 블록은 블록체인에서 생성된 첫번째 블록을 의미한다.
첫 번째 블록이 생성된 이후 다음 블록이 지속적으로 생성되어 마치 체인처럼 이전 블록에 연결되기 때문에 
제네시스 블록이 생성되었다는 것은 해당 블록체인 네트워크가 시작되었다는 상징적인 의미를 가지고 있다.
*/

function genesisBlockExam() {
  const data = [
    "hello my name is formegusto, 27, today is 2022/12/15 have a good day :)",
  ];

  const header = new BlockHeader(0);
  const block = new Block(header, data);

  console.log(block);
}

export default genesisBlockExam;
