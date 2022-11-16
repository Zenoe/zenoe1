const express = require('express')

const userRoutes = require('routes/userRoutes')
const vizRoute = require('routes/vizRoute')
const utilRoutes = require('routes/utilRoutes')
const rfcRoutes = require('routes/rfcRoutes')

module.exports = function (app) {
  app.use(express.json())
  app.use('/api/users', userRoutes)
  app.use('/api/viz', vizRoute)
  app.use('/api/utils', utilRoutes)
  app.use('/api/rfc', rfcRoutes)
}
