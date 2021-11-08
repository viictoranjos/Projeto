import {check, validationResult, body} from "express-validator";
import {Request, Response, NextFunction} from "express";
const listValidator = [
    check('page', 'A pagina precisa ser informada e precisa ser numerico.').exists().isInt({min: 1}),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next(); 
    },

    check('limit', 'O limite precisa ser infomado e precisa ser numerico').exists().isInt({min: 1}),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult (req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },

    check('query', 'Caso queira, informe se deseja realizar uma consulta').optional(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult (req);
        if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
        next();
    },

    check('orderBy', 'Caso queira ').optional(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult (req);
        if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
        next();
    },

    check('orderType', 'Caso queira, informe deseja organizar de forma Crescente ou Decrescente').optional().isIn(["Decrecente","Crescente"]),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult (req);
        if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
        next();
    },

    check('Name', 'O nome precisa ser informado e precisa conter no minimo tres letras.').exists().isLength({min: 3}),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next(); 
    },

    check('born', 'Informe qual a sua data de nascimento.').exists().isDate(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next(); 
    },

    check('email', 'Informe um e-mail valido.').exists().isEmail,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next(); 
    },
]

export {listValidator};


