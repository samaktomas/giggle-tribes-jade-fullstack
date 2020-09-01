import QueryHandler from './QueryHandler';

export class UserRepo extends QueryHandler {

    constructor(db,errorCodes) {
        super(db,errorCodes);
    };

    validateParams = ({userName,password}) => {
        if (!userName) throw new Error(this.errorCodes.missingUserName);
        if (userName == '') throw new Error(this.errorCodes.invalidUserName);
        if (!password) throw new Error(this.errorCodes.missingPassword);
        if (password.length < 8) throw new Error(this.errorCodes.invalidPassword);
    };

    async add({userName,password}) {
        this.validateParams({userName,password});
        const query = this.validateQuery`INSERT INTO users (name,password) VALUES(${userName},${password})`;
        try {
            return await (this.sendQuery(query));
        } catch(error) {
            if (error.code === 'ER_DUP_ENTRY') throw new Error(this.errorCodes.invalidUserName);
            throw error;
        }
    };

    async getByName({userName}) {
        if (!userName) throw new Error(this.errorCodes.missingUserName);
        const query = this.validateQuery`SELECT * FROM users WHERE name=${userName}`;
        return await (this.sendQuery(query));
    };

    async getById({userId}) {
        if (!userId) throw new Error(this.errorCodes.missingUserId);
        const query = this.validateQuery`SELECT * FROM users WHERE id=${userId}`;
        const dbData = await (this.sendQuery(query));
        if (dbData.length === 0) throw new Error(this.errorCodes.invalidUserId);
        return dbData;
    };

};
