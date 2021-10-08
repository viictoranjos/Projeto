import {Router} from "express"
const router = Router();

router
    .route('/')
    .get((req, res)=> {
        res.status(200).send("Ola usuarios");
    })


export default router;