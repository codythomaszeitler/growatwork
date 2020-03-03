
export class GetCommand {
    constructor(type, id) {
        this._type = type;
        this._id = id;
    }

    type() {
        return this._type;
    }

    id() {
        return this._id;
    }
};