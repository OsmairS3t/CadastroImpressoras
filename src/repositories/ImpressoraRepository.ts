import { AppDataSource } from "../data-source";
import { Impressora } from "../entities/Impressora";

export const ImpressoraRepository = AppDataSource.getRepository(Impressora)