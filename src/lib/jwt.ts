import { Ijwt } from './../interfaces/jwt.interface';
import { SECRET_KEY, MESSAGES, EXPIRETIME } from './../config/constants';
import jwt from 'jsonwebtoken';


class JWT {
    private secretKey = SECRET_KEY as string;
    //Información del payload con fecha de caducidad de 24 horas
    sign(data: Ijwt, expiresIn: number = EXPIRETIME.H24 ){
        return jwt.sign(
            { user: data.user },
            this.secretKey,
            { expiresIn }
        );
    }

    verify(token: string) {
        try {
            return jwt.verify(token, this.secretKey) as string;
        } catch (e) {
            return MESSAGES.TOKEN_VERIFICATION_FAILED;
        }
    }

}

export default JWT;