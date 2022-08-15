import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes';

AppDataSource.initialize().then(() => {
    const app = express()
    app.use(cors({origin: 'http://localhost:3000'}));
    app.use(express.json())
    app.use(routes)
    return app.listen(process.env.APP_PORT)
})
