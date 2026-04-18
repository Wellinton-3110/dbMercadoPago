import { response, Router } from "express";
import dotenv from "dotenv";
dotenv.config()

const routes = Router();

routes.post("/qrCode", async (req, res) => {
  try {
    const { description, amount } = req.body;
    const response = await fetch("rota",{
      method:"POST",
      headers:{
        Authorization:{`Bearer ${process.env.MP_ACCESS_TOKEN}`},
        "Content-Type":"aplication/json",
        idenpotykey:crypto.randomUUID()
      },
      body:JSON.stringify({
        payment_id_method:"pix",
        amount:Number(amount),
        description:description,
        payer:{
          email:"wellin@hghh.com"
        }
      })
    })
    const data = await response.json()
    res.status(200).send(data)
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"requisição falhou"})
    
  }
});
