import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const { amount, description } = req.body;

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        transaction_amount: Number(amount),
        description: description || "Pagamento Pix",
        payment_method_id: "pix",
        payer: {
          email: "test_user_123@test.com",
        },
      }),
    });

    const data = await response.json();
    console.log("Resposta Mercado Pago:", data);

    // 🔴 SE DER ERRO, DEVOLVE O ERRO REAL
    if (!response.ok) {
      return res.status(400).json(data);
    }

    // ✅ SUCESSO
    res.json({
      id: data.id,
      qr_code: data.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: data.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (err) {
    console.error("Erro real:", err);
    res.status(500).json({ error: "Erro ao gerar Pix" });
  }
});

// webhook (futuro)
router.post("/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.sendStatus(200);
});

export default router;
