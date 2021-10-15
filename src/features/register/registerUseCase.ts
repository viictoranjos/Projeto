import { IRepository } from "../../repositories/IRepository";

export class RegisterUseCase {
    private _collection: string;
    constructor (private repo: IRepository) {
        this._collection= process.env.USER_COLLECTION || "User";
    }

    async exec (name: string, born: Date, email: string){
        let result= await this.repo.save(this._collection,{
            name,
            born,
            email
        });
        return result;
    }
}