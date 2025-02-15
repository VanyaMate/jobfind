import jwt from 'jsonwebtoken';


export const createRefreshToken = function (accessToken: string) {
    return jwt.sign({ token: accessToken }, process.env.JWT_SECRET_KEY!, { expiresIn: '30d' });
};