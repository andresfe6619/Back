
import ContenedorMongo from "./mongoContenedor.js";

class Chat extends ContenedorMongo {
  constructor() {
    super("chats", {
      author: {
        id: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
      },
      Message: { type: String, required: true },
    });
  }
}
export default Chat;
