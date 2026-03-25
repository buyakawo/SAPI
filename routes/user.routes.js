import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';
const useRouter = Router();

useRouter.get('/', getUsers);

useRouter.get('/:id', authorize, getUser);

useRouter.post('/', (req, res) => res.send( {title: 'CREATE new user'}));

useRouter.put('/:id', (req, res) => res.send( {title: 'UPDATE user'}));

useRouter.delete('/:id', (req, res) => res.send( {title: 'DELETE all users'}));


export default useRouter;