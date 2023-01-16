const express = require('express')

const userRoutes = require('routes/userRoutes')
const vizRoute = require('routes/vizRoute')
const utilRoutes = require('routes/utilRoutes')
const rfcRoutes = require('routes/rfcRoutes')
const deviceRoutes = require('routes/deviceRoutes')
const autoRFRoutes = require('routes/autoRFRoutes')

module.exports = function (app) {
  app.use(express.json())
  app.use('/api/users', userRoutes)
  app.use('/api/viz', vizRoute)
  app.use('/api/utils', utilRoutes)
  app.use('/api/rfc', rfcRoutes)
  app.use('/api/autorf', autoRFRoutes)
  app.use('/api/device', deviceRoutes)
}
