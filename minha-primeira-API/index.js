import express from "express";
import "dotenv/config";
import livrosRouter from "./routes/livros-routes.js";
import logRequisicoes from "./middlewares/log-requisicoes.js";

const app = express();

app.use(logRequisicoes);
app.use(express.json());

app.use("/livros", livrosRouter);

console.log("NOME", process.env.NOME)
console.log("PORT", process.env.PORT)
console.log("APP_NAME", process.env.APP_NAME)

app.listen(3000);