import fastify from 'fastify';
import cors from '@fastify/cors';
import appRoutes from './lib/routes';
require('dotenv').config();


const app = fastify();
const PORT: any = process.env.PORT;

app.register(cors);
app.register(appRoutes);

app.listen({
    port: PORT
}).then(() => {
    console.log('Server Running...');
})