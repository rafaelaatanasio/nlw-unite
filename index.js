// array
let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 19, 23),
    dataCheckIn: new Date(2024, 2, 19, 22, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 10)
  },
  {
    nome: "Lucas Silva",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 15, 45),
    dataCheckIn: new Date(2024, 2, 24, 18, 30)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 10),
    dataCheckIn: new Date(2024, 2, 26, 12, 40)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 19, 21, 30),
    dataCheckIn: new Date(2024, 2, 23, 23, 15)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 8, 55),
    dataCheckIn: new Date(2024, 2, 25, 10, 20)
  },
  {
    nome: "Carlos Pereira",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 17, 10),
    dataCheckIn: new Date(2024, 2, 27, 19, 45)
  },
  {
    nome: "Juliana Lima",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 14, 20),
    dataCheckIn: new Date(2024, 2, 21, 16, 55)
  },
  {
    nome: "Rafaela Santos",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 12, 40),
    dataCheckIn: new Date(2024, 2, 28, 14, 30)
  },
  {
    nome: "Gustavo Almeida",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 20, 15),
    dataCheckIn: new Date(2024, 2, 26, 22, 10)
  }
];

// criação de variáveis e interpolação das templates strings/literals
const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  // condicional
  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button data-email="${participante.email}"
    onclick="fazerCheckIn(event)"
    >Confirmar check-in</button>
    `

  }

  return `
    <tr>
        <td>
            <strong> ${participante.nome}</strong>
        <br>
            <small>${participante.email}</small>
            </td>
            <td>${dataInscricao}</td>
            <td>${dataCheckIn}</td>
        </tr>
`
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop for
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  // substituir informação do html
  document.querySelector('tbody').innerHTML = output
}


atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se participante já existe
  const participanteExiste = participantes.find((p) => p.email == participante.email

  )

  if (participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = "" // seletor de atributo
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se ralmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o ckeck-in?'

  if (confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => p.email == event.target.dataset.email
  )

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  // atualizar a lista de participantes
  atualizarLista(participantes)
}