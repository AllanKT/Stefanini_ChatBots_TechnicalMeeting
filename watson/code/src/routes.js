import { Router } from 'express';

import WatsonController from './app/controllers/WatsonController';

const routes = new Router();

routes.post('/watson', WatsonController.action);

export default routes;
