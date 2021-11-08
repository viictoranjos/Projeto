import IRepository from "../IRepository";
import * as db from "../../infra/database/MongoConnection";

export class MongoRepository implements IRepository {
    async save(collection: string, data: object): Promise<object> {
        let result = await db.insertOne(collection, data);
        return result;
    }
    async update(collection: string, data: object, id: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async find(collection: string, query: object): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async delete(collection: string, id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async select(page: number, limit: number,query?: object,sort?: object): Promise<any>{
        throw new Error("Method not implemented");
    }
    async selectCount(query?: object): Promise<number>{
        throw new Error("Method not implemented");
    }
    
}