
export default function logRequisicoes(req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
}

export function validarID(req, res, next) {
  const idLivro = parseInt(req.params.id);

  if (isNaN(idLivro)) {
    return res.status(400).json({mensagem: "Requisição má formada, tente rever se o que tu colocaste é um número!"})
  };
  next();
}