import { Request, Response } from "express";
import { ImpressoraRepository } from "../repositories/ImpressoraRepository";
import { LeituraRepository } from "../repositories/LeituraRepository";

interface LeituraProps {
    id: number;
    data: string;
    leitura: number;
    impressora: {
        id: number;
        impressora: string;
        modelo: string;
        ip: string;
    }
}
export class LeituraController {
    async create(req: Request, res: Response) {
        const { data, leitura } = req.body;
        const { idImpressora } = req.params;

        try {
            const impress = await ImpressoraRepository.findOneBy({ id: Number(idImpressora) });
            if (!impress) {
                return res.status(404).json({ message: 'Impressora não encontrada' });
            }
            const novaLeitura = LeituraRepository.create({
                data,
                leitura,
                impressora: impress
            })
            await LeituraRepository.save(novaLeitura);
            return res.status(201).json(novaLeitura);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async list(req: Request, res: Response) {
        try {
            const leituras = await LeituraRepository
                .createQueryBuilder("impressoras")
                .innerJoinAndSelect("leituras", "leituras", "leituras.impressora_id=impressoras.id")
                .getMany()
            return res.status(200).json(leituras);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async listByImp(req: Request, res: Response) {
        const { idImpressora } = req.params;
        try {
            const leituras = await LeituraRepository
                .createQueryBuilder("leituras")
                .where('leituras.impressora_id=:id', { id: idImpressora })
                .orderBy('leituras.data', 'DESC')
                .limit(2)
                .getMany()

            return res.status(200).json(leituras);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

}