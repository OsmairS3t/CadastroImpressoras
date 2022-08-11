import { Request, Response } from "express";
import { DepartamentoRepository } from "../repositories/DepartamentoRepository";

export class DepartamentoController {
    async create(req: Request, res: Response) {
        const { departamento } = req.body;
        if (!departamento) {
            return res.status(400).json({message: 'O nome do departamento é obrigatório'})
        }
        try {
            const novoDepartamento = DepartamentoRepository.create({departamento});
            await DepartamentoRepository.save(novoDepartamento);
            return res.status(201).json(novoDepartamento);
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async list(req: Request, res: Response) {
        try {
            const departamentos = await DepartamentoRepository.find();
            return res.status(200).json(departamentos);
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

}