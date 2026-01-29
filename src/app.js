import express from "express";
import cors from "cors";

import pixRoutes from "./routes/pix.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// rota base
app.get("/", (req, res) => {
  res.send("API Mercado Pago rodando 🚀");
});

// rotas Pix
app.use("/pix", pixRoutes);

export default app;
