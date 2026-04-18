import testeApp from "./services/testeApp";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

testeApp.listen(PORT,() {
  console.log(`app rodando na porta ${PORT}`);
  
})
