export const GENESIS: IBlock = {
  version: "1.0.0",
  height: 0,
  timestamp: new Date().getTime(),
  hash: "0".repeat(64),
  previousHash: "0".repeat(64),
  merkleRoot: "0".repeat(64),
  difficulty: 0,
  nonce: 0,
  data: ["formegusto's bank welcome u, created date 2022/12/15"],
};

export const DIFFICULTY_ADJUSTMENT_INTERVAL = 10; // 난이도 조정 블록 범위 (n개)
export const BLOCK_GENERATION_INTERVAL = 10; // 블록 생성 시간 (n분)
export const BLOCK_GENERATION_TIME_UNIT = 60; // 생성 시간의 단위 (n초)
/*
timeExpected = DIFFICULTY_ADJUSTMENT_INTERVAL  * 
              BLOCK_GENERATION_INTERVAL * 
              BLOCK_GENERATION_TIME_UNIT 초
블록 한 묶음이 생성되는 예상시간

timeTaken
DIFFICULTY_ADJUSTMENT_INTERVAL 만큼의 블록이 생성되는데 걸리는 시간

timeTaken이 timeExpected / 2 보다 작은 경우 (빠른 경우) 난이도를 +1 증가시키고 
timeExpected * 2 보다 클 경우 (느린 경우) 난이도를 -1 감소시킨다.
*/
