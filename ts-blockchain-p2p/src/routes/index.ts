import { P2PServer } from "@utils";
import { Router } from "express";

const routes: Router = Router();
const ws = new P2PServer();

routes.get("/", (req, res) => {
  return res.send("bit-coin");
});

// 블록 내용 조회 api
routes.post("/chains", (req, res) => {
  return res.json(ws.chain);
});

// 블록 채굴 api
routes.post("/mainBlock", (req, res) => {
  const { data } = req.body;
  const newBlock = ws.addBlock(data);

  if (newBlock.isError) return res.status(500).send(newBlock.error);

  return res.json(newBlock.value);
});

// ws 연결 요청 api
routes.post("/addToPeer", (req, res) => {
  const { peer } = req.body;

  ws.connectToPeer(peer);
});

// 연결된 sockets 조회
routes.get("/peers", (req, res) => {
  const sockets = ws.chain.map(
    (s: any) => s._socket.remoteAddress + ":" + s._socket.remotePort
  );

  return res.json(sockets);
});

export default routes;
