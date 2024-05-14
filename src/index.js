import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
// import config from './config.js'
// import colors from './utils/colors.js'
// import connectDB from './db.js'
import routes from './routes/index.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

// connectDB().then(() => {
//     app.listen(config.PORT, () => {
//         colors.info(`Server running on port ${config.PORT}`)
//     })
// }).catch(error => {
//     colors.error(error)
// })

// Routes
app.use('/api', routes)


export default app