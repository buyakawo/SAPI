import express from 'express';
import { PORT } from './config/env.js';

const app = express();

// Testing
app.get('/', (req, res) => {
    res.send('Welcome to SAPI');
});

app.listen(PORT, () => {
    console.log(`SAPI is running on http://localhost:${PORT}`)
});

export default app;