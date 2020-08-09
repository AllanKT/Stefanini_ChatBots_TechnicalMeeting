import { Router } from 'express';

import DialogflowController from './app/controllers/DialogflowController';

const routes = new Router();

routes.post('/dialogflow', DialogflowController.action);

export default routes;
