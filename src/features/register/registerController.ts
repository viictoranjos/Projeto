import { RegisterUseCase } from "./registerUseCase";
import { Request, Response } from "express";

export class RegisterController {
    constructor (private _useCase: RegisterUseCase){};
    async handle (req: Request, res: Response){
        try {
            const name: string = req.body.name;
            const email:string = req.body.email;
            const born: Date = req.body.born;

            let result = await this._useCase.exec(name, born, email);
            res.status(201).json(result);
        } catch (error:any) {
            return res.status(500).json({error: error.message});
        }
    }
}