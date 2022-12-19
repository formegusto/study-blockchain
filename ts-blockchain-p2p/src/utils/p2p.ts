import { WebSocket } from "ws";
import { Chain } from "@core/blockchain/chain";

enum MessageType {
  latest_block = 0,
  all_block = 1,
  receivedChain = 2,
}

interface Message {
  type: MessageType;
  payload: any;
}

export class P2PServer extends Chain {
  private sockets: WebSocket[];

  constructor() {
    super();
    this.sockets = [];
  }

  getSockets() {
    return this.sockets;
  }

  /**
   * listen()
   * 서버 입장
   * 클라이언트가 연결을 시도했을 때  실행되는 코드
   */
  listen() {
    const server = new WebSocket.Server({ port: 7545 });

    // 서버 기준 "connection"
    server.on("connection", (socket) => {
      console.log("webSocket connected");

      this.connectSocket(socket);
    });
  }

  /**
   * connectToPeer()
   * 클라이언트 입장
   * 서버쪽으로 연결 요청 시 실행되는 코드
   */
  connectToPeer(newPeer: string) {
    try {
      console.log("newPeer : " + newPeer);
      const socket = new WebSocket(newPeer);

      // 클라이언트 기준 "open"
      socket.on("open", () => {
        this.connectSocket(socket);
      });
    } catch (err) {
      console.error(err);
    }
  }

  connectSocket(socket: WebSocket) {
    this.sockets.push(socket);

    socket.on("message", (data: string) => {
      console.log(data);
    });

    socket.send("msg from server");
  }
}

/**
 * Block Chain P2P Network
 * 네트워크에 참여하는 모든 컴퓨터가 클라이언트이면서 동시에 서버로서의 역할을 담당한다.
 * 클라이언트나 서버란 개념이 없이 오로지 동등한 계층의 노드들(peer nodes)이 -
 * 서로 클라이언트와 서버 역할을 동시에 네트워크 위에서 한다.
 */
