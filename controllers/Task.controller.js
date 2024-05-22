const { Task, User } = require('../models/index')

module.exports.createTask = async (req, res, next) => {
    try {
        const { body, params: { userId } } = req;

        //1. Потрібно знайти того самого юзера, якому потрібно додати таски

        const user = await User.findByPk(userId);
        //2. Потрібно додати цьмоу юзеру таски
        // parent.createChild(body)
         const result = await user.createTask(body);

         return res.status(201).send(result);

    } catch (error) {
        next(error);
    }
}


module.exports.getAllUserTasks = async (req, res, next) => {
    try {
        const { params: { userId } } = req;

        //1. Потрібно знайти того самого юзера, таски якого на мпотрібно знайти
        const user = await User.findByPk(userId);
       
        //2. Потрібно витягнути всі таски знайденого юзера
        // parent.getChildren()  
        const tasks = await user.getTasks();

         return res.status(200).send(tasks);

    } catch (error) {
        next(error);
    }
}

module.exports.getCountOfTasks = async (req, res, next) => {
    try {
        const { params: { userId } } = req;

        //1. Потрібно знайти того самого юзера, таски якого на мпотрібно підрахувати
        const user = await User.findByPk(userId);
       
        //2. Потрібно підрахувати кількість тасок знайденого юзера
        // parent.сountChildren()  
        const countedTasks = await user.countTasks();

         return res.status(200).send(`${countedTasks}`);

    } catch (error) {
        next(error);
    }
}

