    const sequelize = require('../db')
    const { DataTypes } = require('sequelize')

    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
        role: { type: DataTypes.ENUM('CLIENT', 'MASTER', 'MANAGER'), defaultValue: 'CLIENT' },
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
        activationLink: { type: DataTypes.STRING },
    });

    const Rating = sequelize.define('Rating', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rate: { type: DataTypes.INTEGER, allowNull: false },
    });

    //SALON

    const Category = sequelize.define('Category', {
        category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type:DataTypes.STRING, unique: true,},
        description: DataTypes.STRING,
        img: {type: DataTypes.STRING},
    });

    const Procedure = sequelize.define('Procedure', {
        procedure_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.FLOAT,
        img: {type: DataTypes.STRING},
    });

    const Discount = sequelize.define('Discount', {
        discount_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        description: DataTypes.STRING,
        percentage: DataTypes.INTEGER,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE
    });

    const Salon = sequelize.define('Salon', {
        salon_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        description: DataTypes.STRING,
        img: {type: DataTypes.STRING},
    });

    const WorkingHours = sequelize.define('WorkingHours', {
        working_hours_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        day_of_week: DataTypes.STRING,
        start_time: DataTypes.TIME,
        end_time: DataTypes.TIME
    });

    const Income = sequelize.define('Income', {
        income_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        amount: DataTypes.FLOAT,
        date_time: DataTypes.DATE,
        description: DataTypes.STRING
    });

    const Manager = sequelize.define('Manager', {
        manager_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        age: DataTypes.INTEGER,
        email: DataTypes.STRING,
        surname: DataTypes.STRING,
    });

    const Record = sequelize.define('Record', {
        record_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        date_time: DataTypes.DATE,
        status: DataTypes.STRING,
        payment: DataTypes.STRING
    });

    const Master = sequelize.define('Master', {
        master_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        age: DataTypes.INTEGER,
        email: DataTypes.STRING,
        surname: DataTypes.STRING,
        img: {type: DataTypes.STRING},
    });

    const ProcedureMaster = sequelize.define('ProcedureMaster', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    });

    const Expense = sequelize.define('Expense', {
        expense_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        amount: DataTypes.FLOAT,
        date_time: DataTypes.DATE,
        description: DataTypes.STRING
    });

    const Client = sequelize.define('Client', {
        client_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        email: DataTypes.STRING,
        age: DataTypes.INTEGER,
        phone: DataTypes.INTEGER,
        password: DataTypes.STRING
    });

    const Review = sequelize.define('Review', {
        review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rating: DataTypes.FLOAT,
        date_time: DataTypes.DATE,
        feedback: DataTypes.STRING
    });

    const Reminder = sequelize.define('Reminder', {
        reminder_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        description: DataTypes.STRING,
        date_time: DataTypes.DATE
    });

    Procedure.belongsTo(Category, { foreignKey: 'category_id' });
    Category.hasMany(Procedure, { foreignKey: 'category_id' });

    Procedure.belongsToMany(Master, { through: ProcedureMaster });
    Master.belongsToMany(Procedure, { through: ProcedureMaster });

    Master.belongsTo(Salon, { foreignKey: 'salon_id' }); 
    Salon.hasMany(Master, { foreignKey: 'salon_id' });

    Income.belongsTo(Client, { foreignKey: 'client_id' });
    Client.hasMany(Income, { foreignKey: 'client_id' });

    Income.belongsTo(Salon, { foreignKey: 'salon_id' });
    Salon.hasMany(Income, { foreignKey: 'salon_id' });

    Income.belongsTo(Master, { foreignKey: 'master_id' });
    Master.hasMany(Income, { foreignKey: 'master_id' });

    Record.belongsTo(Client, { foreignKey: 'client_id' });
    Client.hasMany(Record, { foreignKey: 'client_id' });

    Record.belongsTo(Salon, { foreignKey: 'salon_id' });
    Salon.hasMany(Record, { foreignKey: 'salon_id' });


    Master.hasMany(Record, { foreignKey: 'master_id', as: 'Records' });
    Record.belongsTo(Master, { foreignKey: 'master_id' });

    Record.belongsTo(Procedure, { foreignKey: 'procedure_id' });
    Procedure.hasMany(Record, { foreignKey: 'procedure_id' });

    Expense.belongsTo(Client, { foreignKey: 'client_id' });
    Client.hasMany(Expense, { foreignKey: 'client_id' });

    Expense.belongsTo(Salon, { foreignKey: 'salon_id' });
    Salon.hasMany(Expense, { foreignKey: 'salon_id' });

    Expense.belongsTo(Master, { foreignKey: 'master_id' });
    Master.hasMany(Expense, { foreignKey: 'master_id' });

    Review.belongsTo(Client, { foreignKey: 'client_id' });
    Client.hasMany(Review, { foreignKey: 'client_id' });

    Review.belongsTo(Salon, { foreignKey: 'salon_id' });
    Salon.hasMany(Review, { foreignKey: 'salon_id' });

    Review.belongsTo(Master, { foreignKey: 'master_id' });
    Master.hasMany(Review, { foreignKey: 'master_id' });

    Reminder.belongsTo(Client, { foreignKey: 'client_id' });
    Client.hasMany(Reminder, { foreignKey: 'client_id' });

    Reminder.belongsTo(Master, { foreignKey: 'master_id' });
    Master.hasMany(Reminder, { foreignKey: 'master_id' });

    User.hasMany(Rating)
    Rating.belongsTo(User)


    module.exports = {
        User,
        Rating,
        Category,
        Procedure,
        ProcedureMaster,
        Discount,
        Salon,
        WorkingHours,
        Income,
        Manager,
        Record,
        Master,
        Expense,
        Client,
        Review,
        Reminder
    }