import jwt from 'jsonwebtoken';


export const createAccessToken = function (userId: string) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
};