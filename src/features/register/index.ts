import { repository } from "../../repositories/implementation";
import { RegisterController } from "./registerController";
import { RegisterUseCase } from "./registerUseCase";

const registerUseCase = new RegisterUseCase(repository);
const registerController = new RegisterController(registerUseCase);

export {registerController};