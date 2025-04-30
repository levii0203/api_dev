const winston = require('winston')

const colors =  {
    error: 'red',
    console: 'yellow',
    test: 'blue',
    success:'green'
  }

winston.addColors(colors)

const logger = winston.createLogger({
    levels: {
        error: 0,
        console: 1,
        test: 2,
        success: 3
    },
   
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error'}),

        new winston.transports.Console({
            level:'success',
            format: winston.format.combine(
              winston.format.json(),
              winston.format.colorize({ all: true })
            )
          }),
    ],
    defaultMeta: {service: 'api-dev'}
})

module.exports = logger;




//winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//winston.format.printf(({ timestamp, level, message }) => {
//    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
 // })
 //label({ label: 'right meow!' }),
 //timestamp(),