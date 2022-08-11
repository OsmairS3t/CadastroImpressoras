import { Router } from "express";
import { DepartamentoController } from "./controllers/DepartamentoControler";
import { ImpressoraController } from "./controllers/ImpressoraControler";
import { LeituraController } from "./controllers/LeituraControler";

const routes = Router();

routes.post('/departamentos', new DepartamentoController().create)
routes.get('/departamentos', new DepartamentoController().list)

routes.post('/impressoras/:idDepto/create', new ImpressoraController().create)
routes.get('/impressoras', new ImpressoraController().list)
routes.get('/impressoras/:id/leituras', new ImpressoraController().listLeiturasImpressora)

routes.post('/leituras/:idImpressora/create', new LeituraController().create)
routes.get('/leituras/:idImpressora', new LeituraController().list)

export default routes;