import { AppDataSource } from "../data-source";
import { Leitura } from "../entities/Leitura";

export const LeituraRepository = AppDataSource.getRepository(Leitura)
