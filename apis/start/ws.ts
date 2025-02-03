import Ws from '#services/ws'
import app from '@adonisjs/core/services/app'

app.ready(() => {
  Ws.boot()

  const io = Ws.io
  io?.on('connection', (socket) => {
    console.log('Nouvelle connexion:', socket.id)

    socket.on('thematique_created', () => {
      socket.broadcast.emit('thematique_created')
    })

    socket.on('thematique_updated', () => {
      socket.broadcast.emit('thematique_updated')
    })

    socket.on('thematique_deteted', () => {
      socket.broadcast.emit('thematique_deteted')
    })

    socket.on('user_created', () => {
      socket.broadcast.emit('user_created')
    })

    socket.on('user_updated', () => {
      socket.broadcast.emit('user_updated')
    })

    socket.on('user_deleted', () => {
      socket.broadcast.emit('user_deleted')
    })

    socket.on('domain_created', () => {
      socket.broadcast.emit('domain_created')
    })

    socket.on('domain_updated', () => {
      socket.broadcast.emit('domain_updated')
    })

    socket.on('domain_deleted', () => {
      socket.broadcast.emit('domain_deleted')
    })

    socket.on('test_created', () => {
      socket.broadcast.emit('test_created')
    })
    socket.on('answer_added', () => {
      socket.broadcast.emit('answer_added')
    })
  })
})
