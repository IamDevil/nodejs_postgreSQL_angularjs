const jwt = require('jsonwebtoken');
const postgres_db = require('./postgres');

//Token Encryption
const config = require('../core/config');

/**Login
*   Input
*       user_account
*       user_pass
*  Ouput
*
*/
async function Login(req, res, next) {
    try{
        const posts = await postgres_db.oneOrNone('select * from public.user_list where user_account = ${user_account} AND user_pass = ${user_pass}' , req.body);
        if(posts === null) {
            res.status(403).json({
                success: false,
                message: 'Account or password error',
                token: null
            });
        }
        else {
            const token = await jwt.sign({
                name: req.body.user_account
            }, config.encryption, {
                expiresIn: 60 * 60 * 6 //Expired after 6 hours
            });

            res.status(200).json({
                success: true,
                message: '',
                token: token
            });
        }
    }
    catch(err) {
        res.status(403).json({
            success: false,
            message: err.message,
            token: null
        });
    };
}

/**SignIn
*   Input
*       user_account
*       user_pass
*       user_pass_confirm
*       user_gender                             0 = boy, 1 = girl
*       user_email
*       user_tel_offer_to_driver        false or true
*  Ouput
*
*/
async function SignIn(req, res, next) {
    try{
        if(req.body.user_account &&
        req.body.user_pass &&
        req.body.user_pass_confirm &&
        req.body.user_gender &&
        req.body.user_email &&
        req.body.user_tel_offer_to_driver) {
            // you need to confirm every one variable
            if(req.body.pass !== req.body.user_pass_confirm) {
                return res.status(200).json({
                    success: false,
                    message: '確認密碼必須相同'
                });
            }
            //else if( ) {
            //
            //}

            //await postgres_db.oneOrNone(' INSERT FROM ${user_pass}' , req.body);
            res.status(200).json({
                success: true,
                message: ''
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: 'Params cannot to be empty'
            })
        }
    }
    catch(err) {
        res.status(403).json({
            success: false,
            message: err.message
        });
    };
}

module.exports = {
    Login: Login,
    Registered: SignIn
};
