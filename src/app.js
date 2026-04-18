import express from "express";
import cors from "cors";

import pixRoutes from "./routes/pix.routes.js";
import dbRoutes from "./routes/db.routes.js";
import celRoutes from "../src/routes/cel.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src"));

// rota base
app.get("/", (req, res) => {
  res.send("API Mercado Pago rodando 🚀");
});

// rotas Pix
app.use("/pix", pixRoutes);
app.use("/db", dbRoutes);
app.use("/dbProdutos", celRoutes);

export default app;
