import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateLogin } from '../middleware/validation';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/employee/login', validateLogin, authController.loginEmployee);
authRouter.post('/tourist/login', validateLogin, authController.loginTourist);

export default authRouter;