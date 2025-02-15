import bcrypt from 'bcrypt';


export const comparePassword = function (hash: string, password: string): boolean {
    return bcrypt.compareSync(hash, password);
};