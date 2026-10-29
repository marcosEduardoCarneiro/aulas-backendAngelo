let usuarios = [
  { username: "borsonaru", isAdmin: true },
];

export function verificaAdmin(usernameCripto) {
  const usernameDescriptografado = Buffer.from(usernameCripto, "base64").toString("utf-8");

  const usuario = usuarios.find((u) => {
    return u.username === usernameDescriptografado;
  });
  if (!usuario) {
    return false;
  }

  return usuario.isAdmin;
}