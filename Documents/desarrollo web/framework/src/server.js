import Koa from "koa"
import koabody from  "koa-body"
import router from "./rutas/index.js"
import mongoose from "mongoose"



const app = new Koa()



app.use(koabody())

app.use(router.routes())

app.use((ctx) => {
    ctx.response.status= 400
ctx.body ={
    status: "not found",
    message: "Route not found"

}
})


const PORT = 8080

app.listen(PORT)
console.log("server is working")