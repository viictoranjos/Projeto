import IRepository from "../../repositories/IRepository";

export class ListUseCase {
  constructor(private repo: IRepository) {}
  async execute(
    page: number,
    limit: number,
    query?: string,
    orderBy?: string,
    orderType?: string
  ) {
    if (Number.isNaN(page)) page = 1;
    if (Number.isNaN(limit)) limit = 100;

    let queryDoc = undefined;

    if (query) {
      queryDoc = {
        $or: [{ name: { $regex: query, $options: "i" } }],
      };
    }

    let sortDoc = undefined;

    if (orderBy) {
      let order = 1;
      if (orderType === "desc") order = -1;

      sortDoc = { [orderBy]: order };
    }
    const list = await this.repo.select(
      page,
      limit,
      queryDoc,
      sortDoc
    );
    const size = await this.repo.selectCount(queryDoc);
    return { size, list };
  }
}

export default ListUseCase