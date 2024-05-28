const { Task, User } = require('../models/index')

module.exports.createTask = async (req, res, next) => {
    try {
        const { body, userInstance } = req;

        //2. Потрібно додати цьмоу юзеру таски
        // parent.createChild(body)
        const result = await userInstance.createTask(body);

        return res.status(201).send(result);

    } catch (error) {
        next(error);
    }
}


module.exports.getAllUserTasks = async (req, res, next) => {
    try {
        const { userInstance, pagination } = req;
        // console.log(req.query);
        //2. Потрібно витягнути всі таски знайденого юзера
        // parent.getChildren()  
        const tasks = await userInstance.getTasks({
            ...pagination
        }
        );

        return res.status(200).send(tasks);

    } catch (error) {
        next(error);
    }
}

module.exports.getCountOfTasks = async (req, res, next) => {
    try {
        const { userInstance } = req;

        //2. Потрібно підрахувати кількість тасок знайденого юзера
        // parent.сountChildren()  
        const countedTasks = await userInstance.countTasks();

        return res.status(200).send(`${countedTasks}`);

    } catch (error) {
        next(error);
    }
}



