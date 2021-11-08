export default class EmailAlreadyExistException extends Error {
    constructor() {
        super('Email address already exist');
    }
}