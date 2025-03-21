
import setupApiRoutes from './controllers/api.js'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import { MongoDBConnection } from './config/db.js'
import { app, server } from './socket/socket.js'

dotenv.config()
const PORT = process.env.PORT || 9001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))

MongoDBConnection()
  .then((sucesssMessage) => {
    console.log(sucesssMessage)
  })
  .catch((errorMessage) => {
    console.error(errorMessage)
  })

setupApiRoutes(app)
