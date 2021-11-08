import {Router, Request, Response} from "express";
import { registerController } from "./features/register";
import { listController } from "./features/list";
import { listValidator } from "./middleware/validators";

const router = Router();

router
    .route('/')
    .get((req, res)=> {
        res.status(200).send("Ola usuarios");
    });
router
    .route('/adduser')
    .post((req, res)=> registerController.handle(req, res))
    
    
router
    .route('/list')
    .get(listValidator, (req: Request, res: Response)=> listController.handle(req, res))
export default router;

