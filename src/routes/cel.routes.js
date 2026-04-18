import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const route = Router();
const prisma = new PrismaClient();

route.get("/celulares", async (req, res) => {
  const response = await prisma.celulares.findMany();
  res.json(response);
});

route.put("/addCelulares", async (req, res) => {
  try {
    const colecaoCelulares = req.body;

    const addCelulares = await prisma.celulares.create({
      data: {
        nome: colecaoCelulares.nome,
        marca: colecaoCelulares.marca,
        valor_item: Number(colecaoCelulares.preco),
        estoque: Number(colecaoCelulares.estoque),
        img: colecaoCelulares.imagem,
      },
    });

    res.status(201).json(addCelulares);
  } catch (error) {
    res.status(500).json({ error: "erro ao cadastrar o dispositivo" });
  }
});

route.put("/attEstoque", async (req, res) => {
  try {
    const { quantidade, id } = req.body;
    if (!id || !quantidade) {
      return res.status(400).json({ error: "id ou quantidade inválidos" });
    }
    const atualizarEstoque = await prisma.celulares.update({
      where: { id: Number(id) },
      data: {
        estoque: {
          decrement: Number(quantidade),
        },
      },
    });

    res.status(200).json(atualizarEstoque);
  } catch (error) {
    res.status(500).json({ error: "erro ao atualizar planilha" });
  }
});

export default route;
