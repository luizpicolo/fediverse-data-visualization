// Código de Teste:

const objetos = [
    {
      ID: 1,
      nome: 'Objeto 1',
      node: 'Node 1',
      dominio: 'Domínio 1',
      atributo1: 'Valor aleatório 1',
      atributo2: 'Valor aleatório 2',
      atributo3: 'Valor aleatório 3'
    },
    {
      ID: 2,
      nome: 'Objeto 2',
      node: 'Node 2',
      dominio: 'Domínio 2',
      atributo1: 'Outro valor aleatório 1',
      atributo2: 'Outro valor aleatório 2',
      atributo3: 'Outro valor aleatório 3'
    },
    {
      ID: 3,
      nome: 'Objeto 3',
      node: 'Node 3',
      dominio: 'Domínio 3',
      atributo1: 'Mais um valor aleatório 1',
      atributo2: 'Mais um valor aleatório 2',
      atributo3: 'Mais um valor aleatório 3'
    },
    {
      ID: 4,
      nome: 'Objeto 4',
      node: 'Node 4',
      dominio: 'Domínio 4',
      atributo1: 'Novo valor aleatório 1',
      atributo2: 'Novo valor aleatório 2',
      atributo3: 'Novo valor aleatório 3'
    },
    {
      ID: 5,
      nome: 'Objeto 5',
      node: 'Node 5',
      dominio: 'Domínio 5',
      atributo1: 'Último valor aleatório 1',
      atributo2: 'Último valor aleatório 2',
      atributo3: 'Último valor aleatório 3'
    }
  ];

// for (const item of objetos) {
//     console.log(`${item.ID} - ${item.nome}`)
// }

class Filter {
    async filterJSON(lista) {
        console.log('Iniciando')

        try {
            await lista.map((item) => {
                const { ID, nome, node } = item
                return console.log({ ID, nome, node })
            })
        } catch(err) {
            console.log(err)
        }

        console.log('Finalizado')
    }
}

const teste = new Filter()
teste.filterJSON(objetos)