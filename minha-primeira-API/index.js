import express from "express";
import livrosRouter from "./routes/livros-routes.js";
import logRequisicoes from "./middlewares/log-requisicoes.js";

const app = express();

app.use(logRequisicoes);
app.use(express.json());

app.use("/livros", livrosRouter);

app.listen(3000);