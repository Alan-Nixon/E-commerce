import { createClient } from 'redis';


export const client = createClient({
    password: process.env.REDDIS_PASSWORD,
    socket: {
        host: process.env.REDDIS_HOST,
        port: Number(process.env.REDDIS_PORT)
    }
});



client.on('connect', () => console.log('Connected to Redis'));

client.on('error', (err) => console.error(`Error connecting to Redis: ${err}`));



