const jwt = require('jsonwebtoken');
const postgres_db = require('./postgres');

/**PassengerInfo
*   Input
*       user_account
*       user_pass
*  Ouput
*
*/
async function PassengerInfo(req, res, next) {
    try{
        const posts = await postgres_db.oneOrNone('select * from public.user_list where user_account = ${name}' , req.decoded );
        if(posts === null) {
            res.status(200).json({
                success: false,
                message: 'Token Error',
                data: null
            });
        }
        else {
            res.status(200).json({
                success: true,
                data: posts,
                message: ''
            });
        }
    }
    catch(err) {
        res.status(400).json({
            success: false,
            message: err,
            data: null
        });
    };
}


module.exports = {
    PassengerInfo: PassengerInfo
};
