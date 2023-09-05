import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { logger, errorLogger } from './shared/logger'

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('🔗 Connected to Database')
    app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('❌ Failed to connect to Database', error)
  }
}

boostrap()
