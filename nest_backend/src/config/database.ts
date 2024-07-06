import { createClient } from 'redis';


export const client = createClient({
    password: 'fGvI2Ge7sjkdSiMfbHznLEqxrztUpAD2',
    socket: {
        host: 'redis-11497.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 11497
    }
});


client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error(`Error connecting to Redis: ${err}`);
}); 



