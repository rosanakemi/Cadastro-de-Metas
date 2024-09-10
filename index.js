const { select, input} = require('@inquirer/prompts')

let meta = {
    value: "tomar 3l de agua por dia",
    checked: false,
}

let metas = [ meta ]

const cadastarMeta = async () => {
    const meta = await input({ message: "Digite a meta: "})

    if(meta.length == 0) {
        console.log("a meta não pode ser vazia")
        return
    }

    metas.push(
        { value: meta, checked: false },
    )
}

const start = async() => {

    while (true){
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "listar metas",
                    value: "listar"
                },
                {
                  name: "sair",
                  value: "sair"  
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
             await cadastarMeta()
             console.log(metas)
            break
            case "listar":
            console.log("vamos listar")
            break
            case "sair":
                console.log("ATE A PROXIMA!")
            return
        }
    }
    
}
start()