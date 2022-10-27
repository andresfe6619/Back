import { productService } from "../services/product.service.js";



const showAll = async(ctx) => { 
    try {
       
     
            const prods = await productService.getAll()
      console.log(prods)
         
            // res.render("products", {prods , hasAny :true})
         
            if (prods.length > 0){
                ctx.response.status= 200
                ctx.body ={
                    status: "there is  products",
                    data : prods
                }
            }else{
                    ctx.response.status= 404
                ctx.body ={
                    status: "there is no products",
                    message:"product not found"
                }
                }
            
       
        } catch (error) {
          
            console.log(error)
            
            //res.render("products", { hasAny : false})
          
        
        
        }
    };
    

    
    const newProduct= async(ctx) => {
        try {
    
         const proof= await  productService.saveObject(ctx.request.body);
    
          // res.redirect("/api/productos/Listado");
        
          if (proof){
            ctx.response.status= 200
            ctx.body ={
                status: "there is  a new product",
                data : proof
            }
        }else{
                ctx.response.status= 404
            ctx.body ={
                status: "there data is not right",
                message:"product not created"
            }
            }
        } catch (error) {
          console.log(error)
    
        }
    };
    
    
    const filterId= async(ctx) => {
         try {
             const {id} = ctx.params;
             const product = await productService.getById(id);
            
             
             if (product){
                ctx.response.status= 200
                ctx.body ={
                    status: "there is  product",
                    data : product
                }
            }else{
                    ctx.response.status= 404
                ctx.body ={
                    status: "there is no product",
                    message:"product not found"
                }
                }
         
         
            } catch (error) {
           console.log(error)
         
         }
         
     };
    
     
    const updateById= async(ctx) => {
         try {
            const {id} = ctx.params;
            const newProd = ctx.request.body;
            const proof = await productService.updateById(id, newProd);
            
            
            if (proof){
                ctx.response.status= 200
                ctx.body ={
                    status: "there is an update",
                    data : proof
                }
            }else{
                    ctx.response.status= 404
                ctx.body ={
                    status: "there is no products update",
                    message:"update was not right"
                }
                }
        
        } catch (error) {
           console.log(error)
         }
        
    }
    
    const deleteById= async(ctx) => {
        try {
            const {id} = ctx.params;
            const proof = await productService.deleteById(id);
            
          
            
            
            //res.json(`El producto con id ${id} ha sido eliminado`);
            if (proof){
                ctx.response.status= 200
                ctx.body ={
                    status: "product eliminated",
                    data : id
                }
            }else{
                    ctx.response.status= 404
                ctx.body ={
                    status: "there is no product",
                    message:"product not found"
                }
                }
        
        }catch (error) {
           console.log(error)
            
        }
    }
     
     export  { showAll, newProduct, filterId, updateById, deleteById };