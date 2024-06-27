import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY;

const generateToken = (payload: any) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

const verifyToken = (requiredRole: any) => (req: any, res: any, next: any) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Отправьте токен' });
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен' });
        }

        req.userId = decoded.userId;

        if (decoded.role !== requiredRole) {
            return res.status(403).json({
                message: 'У вас нет привилигий'
            });
        }

        next();
    });
};

export default { generateToken, verifyToken };