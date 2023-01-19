import fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client'
require('dotenv').config();


const app = fastify();
const prisma = new PrismaClient();
const PORT: any = process.env.PORT;

app.register(cors)

app.get('/hello', async () => {
    const day = await prisma.day.findMany();
    return day;
})

app.listen({
    port: PORT
}).then(() => {
    console.log('Server Running...');
})