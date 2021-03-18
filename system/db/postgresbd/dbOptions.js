module.exports = {
    database: 'df07c0eqq7nclt',
    username: 'mprzrkyrxpceur',
    password:
        '0c946327b1a44e2d2fdd76e3dc87a92f793d09ba20731a5d8ab4f825cfcb85d3',
    host: 'ec2-52-203-49-58.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
        },
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
};