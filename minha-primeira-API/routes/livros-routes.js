import Router from "express";
import {editarLivro} from "../controllers/livros-controller.js";
import {validarID} from "../controllers/livros-controller.js";
import {
  criarLivro,
  deletarLivro,
  findAll,
  findOne,
} from "../controllers/livros-controller.js";
import { verificaAdmin } from "../controllers/usuarios-controllers.js";



const router = Router();

// NOVO: o bloco solto virou um middleware (agora req, res e return existem)
function autenticar(req, res, next) {
  let auth = req.headers.authorization; // ALTERADO: era "autorization"
  console.log(auth);

  if (!auth) {
    return res.status(401).send();
  }

  let token = auth.split(" ");
  console.log(token);

  let usernameCripto = token[1]; // NOVO: antes essa variável não existia

  if (!usernameCripto) {
    return res.status(401).send();
  }

  req.usernameCripto = usernameCripto; // guarda para o próximo middleware
  next();
}

// NOVO: verificação de admin também virou middleware
function exigirAdmin(req, res, next) {
  let ehAdmin = verificaAdmin(req.usernameCripto); // ALTERADO: agora recebe o usuário
  if (!ehAdmin) {
    return res.status(403).send(); // ALTERADO: antes era res.status(400) sem enviar nada
  }
  next();
}

router.get("/", (req, res) => {
  const todosOsLivros = findAll();
  res.json(todosOsLivros);
});
router.get("/:id", (req, res) => {
  const idLivro = parseInt(req.params.id);

  if (isNaN(idLivro)) {
    return res
      .status(400)
      .json({ mensagem: "identificador deve ser um numero" });
  }

  let livro = findOne(idLivro);

  if (!livro) {
    return res.status(404).send();
  }

  res.json(livro);
});

// ALTERADO: adicionados os middlewares autenticar e exigirAdmin
router.post("/", autenticar, exigirAdmin, (req, res) => {
  let autor_enviado = req.body.dsAutor;
  let titulo_enviado = req.body.dsTitulo;

  if (!autor_enviado || !titulo_enviado) {
    return res
      .status(400)
      .json({ mensagem: "dados faltando, verifique autor e titulo" });
  }

  let livro_criado = criarLivro(titulo_enviado, autor_enviado);
  if (!livro_criado) {
    return res.status(500).json({ mensagem: "algo deu errado" });
  }

  return res.status(201).json(livro_criado);
});

// ALTERADO: adicionados os middlewares autenticar e exigirAdmin
router.delete("/:id", autenticar, exigirAdmin, (req, res) => {
  const idLivro = parseInt(req.params.id);

  if (isNaN(idLivro)) {
    return res
      .status(400)
      .json({ mensagem: "identificador deve ser um numero" });
  }

  let livro = findOne(idLivro);
  if (!livro) {
    return res.status(404).send();
  }

  deletarLivro(idLivro);
  return res.status(204).send();
});

// ALTERADO: adicionados os middlewares autenticar e exigirAdmin
router.patch("/:id", autenticar, exigirAdmin, validarID, (req, res) => {
  const idLivro = parseInt(req.params.id)
  const titulo_enviado = req.body.dsTitulo;
  const autor_enviado = req.body.dsAutor;

  let editar_livro = editarLivro(idLivro, titulo_enviado, autor_enviado)

  if (editar_livro === false) {
    return res.status(404).json({mensagem: "Recurso não encontrado, revise as credenciais!"})
  }
  else {
    return res.status(200).json({mensagem: "editado com sucesso!"})
  }
//  next()
});
export default router;