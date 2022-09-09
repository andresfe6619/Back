import util from "util"
import {port, mode } from "../yargs.js" 
import {fork} from "child_process"
import {logger} from "../logs/loggers.js"
import os from "os"
const info = {
Argumentos  : port, mode, 
plataforma : process.platform ,
node: process.version ,
memoria : util.inspect(process.memoryUsage(), {showHidden: false, depth: null, color: true }) ,
path : process.execPath, 
id : process.pid,
carpeta: process.cwd(),
cpus : os.cpus().length 
}


const desafio = async (req, res) => {
logger.info("renderizando")
    res.render("desafios", {Arguments : info.Argumentos, platform: info.plataforma, node: info.node,   memory: info.memoria, path : info.path, id: info.id, carpeta: info.carpeta, cpus: info.cpus} )

// let longitudNormalized = JSON.stringify(info).length;
// console.log(longitudNormalized)
}
const numbers = async (req, res) => {
let numbers1 = req.query.cant
let cant = fork("./Controllers/fork.js")
if(isNaN(numbers1)){

numbers1 = 100000000
}
 

cant.send(numbers1)
cant.on("message", numbers=>{
    res.json(numbers)
})
}





export {desafio, numbers}