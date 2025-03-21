import mongooseLib from 'mongoose'

const MongoDBConnection = async () => {
  try {
    await mongooseLib.connect(`${process.env.DB_CONNECTION}/${process.env.DATABASE}`)
    return 'Database is Connected'
  } catch (error) {
    throw new Error('Database connection error: ' + error.message)
  }
}

export { MongoDBConnection }
