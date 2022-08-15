import { Request, Response } from "express";
import { DepartamentoRepository } from "../repositories/DepartamentoRepository";
import { ImpressoraRepository } from "../repositories/ImpressoraRepository";
import { LeituraRepository } from "../repositories/LeituraRepository";

export class ImpressoraController {
    async create(req: Request, res: Response) {
        const { impressora, modelo, ip } = req.body;
        const { idDepto } = req.params;
        try {
            const depto = await DepartamentoRepository.findOneBy({id: Number(idDepto)})            
            if (!depto) {
                return res.status(404).json({message: 'Departamento não existe'});
            }
            const novaImpressora = ImpressoraRepository.create({
                impressora,
                modelo,
                ip,
                departamento: depto
            })
            await ImpressoraRepository.save(novaImpressora);
            return res.status(201).json(novaImpressora);
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async list(req: Request, res: Response) {
        try {
            const impressoras = await ImpressoraRepository
                .createQueryBuilder("impressoras")
                .getMany()

            return res.status(200).json(impressoras);
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async listLeiturasImpressora(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const leituras_impressora = await LeituraRepository
                .createQueryBuilder("leituras")
                .where("leituras.impressora_id = :id", { id: id })
                .orderBy("leituras.data")
                .getMany()

            return res.status(200).json(leituras_impressora);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async listImpressorasDepartamento(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const impressoras = await ImpressoraRepository
                .createQueryBuilder("impressoras")
                .where("impressoras.departamento_id = :id", { id: id })
                .orderBy("impressoras.ip")
                .getMany()

            return res.status(200).json(impressoras);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

}