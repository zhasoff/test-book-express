import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRET_KEY;

const generateToken = (payload: any) => {

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return token;
}
const verifyToken = (parameters: any) => (req: any, res: any, next: any) => {

    const bearer = req.header('Authorization') || '';

    if (!bearer) {
        return res.status(401).json({ message: 'Отправьте токен' });
    }

    jwt.verify(bearer.split(' ')[1], secretKey, (err: any, decoded: any) => {

        if (err) {
            return res.status(401).json({ message: 'Неверный токен' });
        }

        if (parameters.requiredRole !== 0 && decoded.role !== parameters.requiredRole) {
            return res.status(403).json({
                message: 'У вас нет привилигий'
            });
        }


        next();

    });
};

const getIdByToken = () => (req: any, res: any, next: any) => {
    console.log('decoded');

    const bearer = req.header('Authorization') || '';

    if (!bearer) {

        return res.status(401).json({ message: 'Отправьте токен' });
    }
    jwt.verify(bearer.split(' ')[1], secretKey, (err: any, decoded: any) => {

        if (err) {
            return res.status(401).json({ message: 'Неверный токен' });
        }
        
        req.userId = decoded.id
        
        next();
        
    });
};

export default { generateToken, verifyToken, getIdByToken };