
const { User } = require('../models/index');
const UserNotFound = require('../errors/UserNotFound')
const {USER_SCHEMA} = require('../schemas/user.schema')

module.exports.getUserInstance = async (req, res, next) => {
    try {
        const { params: { userId } } = req;

        const user = await User.findByPk(userId);

        if (!user) {//Якщо юзер НЕ знайдений
            throw new UserNotFound('User is not found');
        }

        req.userInstance = user; //поставили знайденого юзера в request

        next();// викликавши метод next --> передаємо управління наступному middleware в цепочці middlewarів

    } catch (error) {
        next(error);
    }
}

module.exports.validateUser = async (req, res, next) => { //валідує юзера якого намагаються додати в базу даних
    try {
        const { body } = req; // в об'єкті request нам прийде body, тіло запиту, тобто юзер якого намагаються додати в базу даних 
     const validatedUser = await USER_SCHEMA.validate(body);

     if (validatedUser) {
        next(); // передаємо в цепочку мідлвейрів, якщо юзер провалідований
     }

    } catch (error) {
        next(error);
    }
}