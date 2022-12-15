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
