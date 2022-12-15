class BlockHeader {
  constructor(_height, _previousHash) {
    // 블록 버전 정보
    this.version = BlockHeader.getVersion();
    // 특정한 시각을 나타내는무자열
    this.timestamp = BlockHeader.getTimestamp();
    // 블록의 높이, 블록 체인에 연결된 블록의 수를 의미
    this.height = _height;
    // 이전 블록의 해시값
    this.previousHash = _previousHash || "0".repeat(64);
  }

  static getVersion() {
    return "1.0.0";
  }

  static getTimestamp() {
    return new Date().getTime();
  }
}

export default BlockHeader;
