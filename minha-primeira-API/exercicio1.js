let carros  = [
    {id: 1, modelo:"corsa"},
    {id: 2, modelo: "gol"},
    {id: 3, modelo: "ka"}
]

try {
    let carro = carros.find((carro => {
        return carro.modelo ==="corsa"
    })
)
      
if (carro === undefined) {
    throw new Error("corsa n encontrado!")
}
}

console.log(carro)