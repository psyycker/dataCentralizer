import mongoose from 'mongoose'

export default function StartDB (callback: () => void): void {
  mongoose.connect('mongodb://localhost/datacentralizer', { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.set('useCreateIndex', true)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    callback()
  })
}
