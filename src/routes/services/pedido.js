import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const route = Router();
const prisma = new PrismaClient();
