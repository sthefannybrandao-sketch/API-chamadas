import express from "express"
import pool from "./db.js"



const app = express()

app.use(express.json())

app.get('/chamdos', async(req, res) =>{
try{
    const consulta = await pool.query("SELECT * FROM chamados")
    return res.status(200).json(consulta.rows)
}catch(erro){
    return res.status(500).json({mensagem: erro})
}
})

function registrarRequisicao(res, req, next){
    const data = new Date()
    console.log(data.toLocaleString() + req.method + req.path)


    next()
}

app.listen(300)