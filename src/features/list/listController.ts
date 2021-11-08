import {ListUseCase} from "./listUseCase";
import {Request, Response} from "express";

export default class ListController {
  constructor(private _listUseCase: ListUseCase) {}
  async handle(request: Request, response: Response) {

    try {
      const { page, limit, query, orderby, ordertype } = request.query

      let queryParam = query? String(query): undefined
      let orderbyParam = orderby? String(orderby): undefined
      let ordertypeParam = ordertype? String(ordertype): undefined

      const listResult = await this._listUseCase.execute(
        Number(page),
        Number(limit),
        queryParam,
        orderbyParam,
        ordertypeParam
      );

      return response.status(200).json(listResult)
    } catch (error) {
        return response.status(500).json({ error: String(error) })
    }
  }
}