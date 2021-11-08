import {repository} from "../../repositories/implementation";
import ListController from "./listController";
import ListUseCase from "./listUseCase";

const listUseCase = new ListUseCase(repository);
const listController = new ListController(listUseCase);

export {listController};