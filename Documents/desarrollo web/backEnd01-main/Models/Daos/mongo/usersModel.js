import bcrypt from 'bcrypt';
import ContenedorMongo from "./mongoContenedor.js";
 class usersSchema extends  ContenedorMongo{ 
    constructor () {
    super ('users', {
    username : {type: String, required: true},
    password : {type: String, required: true},
    email : {type: String, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    Age: {type: Number, required: true },
    phone: {type: Number, required: true},
    Direction: {type: String, required: true},
    avatar: {type: String, required: true},
    UserCart: {type: String, required: true}
})}
 async cryptPass(password){
    const salt = bcrypt.genSaltSync(10);
    return  bcrypt.hashSync(password, salt);
}

 async comparePass(password, hash){
    return bcrypt.compareSync(password, hash);
}

 findName = async (username, done ) => {
  let existingUser
   if  (!done){

    existingUser = await this.collection.findOne({ username }).clone()
}
  else {
     existingUser=  await this.collection.findById(username, done).clone();
   
  }
  
return existingUser
}
 createUser =  async (newUser) =>{
    const createdUser = await this.collection.create(newUser);
 return createdUser
};
// deserialize = async (id, done) => {
//     const something= await this.collection.findById(id, done);
//   return something
// };


};

export  {usersSchema}