import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import pkg from '../package.json';

import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/user.routes';

import {createRoles, createAdmin} from './libs/initialSetup';

//Initialization
const app = express();
createRoles();
createAdmin();

//Settings
app.set('pkg',pkg);
app.set('port', process.env.PORT  || 4000);
app.set('json spaces', 4);

//Middleware
const corsOptions = {
    //origin: 'http://localhost:3000';
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Routes
app.get('/', (req,res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/products',productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

export default app;