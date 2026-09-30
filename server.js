import express from "express"
import pool from "./db.js"


const app = express()

app.use(express.json())
app.use(registrarRequisicao)
app.use(validarChamado)
app.use(validarPrioridade)

// Middleware de log
// req 1 e res 2
function registrarRequisicao(req, res, next){
    const data = new Date()
    //pegar a sua localizacao e converte a data com base no padrao do pais
    console.log(data.toLocaleString()+ " " + req.method + " " + req.path)
// req.method pegar a url atraves da requisicao e o req.path retorna o recurso(caminho da URL)

    next()
}

//8 // next faz com que a requisiçao fique viajando e nao trave
function validarChamado(req, res, next){
    const {titulo, descricao,setor,prioridade} = req.body;
    if(!titulo){
        return res.status(400).json({mensagem:"o campo titulo e obrigatorio"}) 
    }
    if(!descricao){
        return res.status(400).json({mensagem: "o campo descricao e obrigatorio"})
    }
    if(!setor){
        return res.status(400).json({mensagem: " o campo setor e obrigatoro"})
    }
    if(!prioridade){
        return res.status(400).json({mensagem: "o campo prioridade e obrigatorio"})
    }
    next()
 }

 //9
 function validarPrioridade( req, res, next){
     const{prioridade} = req.body;
     const permitidas = ["baixa", "media", "valor"]
    if(!permitidas.includes(prioridade)){
        return res.status(400).json({mensagem: "erro tente novamente"})
    }

    next()
 }


// ========================== APIS =================================
app.get('/chamados', async(req, res) =>{
try{// tentar executar esse codigo se nao conseguir
    const consulta = await pool.query("SELECT * FROM chamados")
    return res.status(200).json(consulta.rows)
}catch(erro){
    return res.status(500).json({mensagem: erro})
}

})

// 7
app.get('/chamados/:id', async (req, res) => {
    const {id} = req.params;
try{
    const chamadosId = await pool.query("SELECT * FROM chamados where id = $1",[id])
    return res.status(200).json(chamadosId.rows)
}catch(err){
    return res.status(404).json({mensagem: "erro"})
}
});

//10
app.post('/chamados', validarChamado, validarPrioridade, async (req,res) => {
    const {titulo, descricao,setor,prioridade} = req.body;
    try{
        
    }
})
 

// comando para atualizar a tela automaticamente e node ---watch NOME DO ARQUIVO
app.listen(3000, ()=>{console.log("Servidor online")})