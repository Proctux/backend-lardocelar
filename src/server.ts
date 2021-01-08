import 'reflect-metadata';

import express from 'express';
import './database';
import uploadConfig from './config/upload';

import routes from './routes';

const app = express();

app.use('/files', express.static(uploadConfig.directory));
app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});

app.listen(3333, () => {
    console.log('Server is running on port 3333');
});
