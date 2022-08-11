import { AppDataSource } from "../data-source";
import { Departamento } from "../entities/Departamento";

export const DepartamentoRepository = AppDataSource.getRepository(Departamento)