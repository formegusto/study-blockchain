import { Chain } from "@core/blockchain/chain";

describe("Chain 함수 테스트", () => {
  let node: Chain = new Chain();

  it("chain getter 테스트", () => {
    console.log(node.chain);
  });

  it("length getter 테스트", () => {
    console.log(node.length);
  });

  it("latestBlock getter 테스트", () => {
    console.log(node.latestBlock);
  });

  it("addBlock() 함수 테스트", () => {
    for (let i = 1; i <= 300; i++) node.addBlock([`Block #${i}`]);

    console.log(node.chain);
  });
});
