const { select, input, checkbox } = require("@inquirer/prompts");

let meta = {
  value: "tomar 3l de agua por dia",
  checked: false,
};

let metas = [meta];

const cadastarMeta = async () => {
  const meta = await input({ message: "Digite a meta: " });

  if (meta.length == 0) {
    console.log("a meta não pode ser vazia");
    return;
  }

  metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      "use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
    choices: [...metas],
    instructions: false,
  });

  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    console.log("nenhuma meta selecionada!");
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });

    meta.checked = true;
  });
  console.log(" Meta concluída!");
};

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length == 0) {
    console.log("Não existem metas realizadas");
    return;
  }

  await select({
    message: "metas realizadas",
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
    const abertas = metas.filter((meta) =>{
        return meta.checked != true
    })

    if(abertas.length == 0){
        console.log("Não existem metas abertas")
        return
    }

    await select({
        message: "Metas abertas" + abertas.length,
        choices: [...abertas]
    })
}

const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "listar metas",
          value: "listar",
        },
        {
          name: "metas realizadas",
          value: "realizadas",
        },
        {
          name: "metas abertas",
          value: "abertas",
        },
        {
          name: "sair",
          value: "sair",
        },
      ],
    });

    switch (opcao) {
      case "cadastrar":
        await cadastarMeta();
        console.log(metas);
        break;

      case "listar":
        await listarMetas();
        break;

      case "realizadas":
        await metasRealizadas();
        break;

      case "abertas":
        await metasAbertas();
        break;

      case "sair":
        console.log("ATE A PROXIMA!");
        return;
    }
  }
};
start();
