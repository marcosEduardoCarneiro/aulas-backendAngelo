import { livros } from "../controllers/livros-controller.js";

export function emprestarLivro(id) {
  let index_livro = livros.findIndex((livro) => {
    return livro.idLivro === id;
  });

  if (index_livro === -1) {
    return false;
  }

  if (livros[index_livro].fgDisponivel) {
    livros[index_livro].fgDisponivel = false;
    return true;
  }

  return null;
}

export function devolverLivro(id) {
  let index_livro = livros.findIndex((livro) => {
    return livro.idLivro === id;
  });

  if (index_livro === -1) {
    return false;
  }

  if (!livros[index_livro].fgDisponivel) {
    livros[index_livro].fgDisponivel = true;
    return true;
  }

  return null;
}