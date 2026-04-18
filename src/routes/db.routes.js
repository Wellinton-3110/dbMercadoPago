import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/pagadores", async (req, res) => {
  try {
    const pagadores = await prisma.pagador.findMany();
    return res.json(pagadores);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar pagadores" });
  }
});

// router.post("/pagadores", async (req, res) => {
//   try {
//     const { nome, email, cpf, numero, senha } = req.body;
//     const novopagador = await prisma.pagador.create({
//       data: {
//         nome,
//         email,
//         cpf,
//         numero,
//         senha,
//       },
//     });
//     return res.status(201).json(novopagador);
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({ error: "erro ao cadastrar comprador" });
//   }
// });

router.post("/pagadores", async (req, res) => {
  try {
    const { nome, email, senha, cpf, numero } = req.body;
    const novopagador = await prisma.pagador.create({
      data: {
        nome,
        email,
        senha,
        cpf,
        numero,
      },
    });
    return res.status(201).json(novopagador);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "erro ao cadastrar comprador" });
  }
});

router.put("/altPagador/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "erro no id" });
    }

    const data = req.body;

    if (isNaN(id)) {
      res.status(400).json({ error: "id inválido" });
    }

    const pagador = await prisma.pagador.update({
      where: { id: Number(id) },
      data: data,
    });
    res.status(200).json({
      message: "nome atualizado com sucesso",
      pagador,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erro ao atualizar o usuário" });
  }
});

router.delete("/deleteUsuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioDeletado = await prisma.pagador.delete({
      where: { id: Number(id) },
    });

    res.status(200).send(usuarioDeletado);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "erro ao deletar o usuário" });
  }
});

router.post("/criarCompra/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { valor } = req.body;
    const criarCompra = await prisma.compraPix.create({
      data: {
        pagador_id: Number(id),
        valor: Number(valor),
      },
    });
    res.status(200).json({
      message: "compra criada com sucesso",
      criarCompra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erro ao gerar compra" });
  }
});

export default router;
