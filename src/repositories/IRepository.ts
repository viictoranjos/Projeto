export interface IRepository {
    save(collection: string, data: object): Promise<object>
    update(collection: string, data: object, id: string): Promise<number>
    find(collection: string, query: object): Promise<any>
    delete(collection: string, id: string): Promise<any>
}