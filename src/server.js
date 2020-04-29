import * as sapper from '@sapper/server'

import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import sirv from 'sirv'
import session from 'express-session'
import sessionFs from 'session-file-store'
import path from 'path'
import jwt from 'jsonwebtoken'

const FileStore = sessionFs(session)

const { PORT, NODE_ENV } = process.env

const dev = NODE_ENV === 'development'

const SECRET = process.env.APP_SECRET || 'MUgOFb3OiyooHlAK2KyO895xzmLT57kM'

const app = express()

app.use(compression({ threshold: 0 }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
  session({
    store: new FileStore({
      path: path.join(__dirname, './.sessions'),
    }),
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  }),
)

app.use(sirv('static', { dev }))

app.post('/login', (req, res) => {
  const token = jwt.sign({ email: req.body.email }, SECRET)

  req.session.token = token

  console.log(req.session.token)

  res.json(token)
})

app.get('/logout', (req, res) => {
  req.session.token = null
  res.redirect('/login')
})

app.post('/refresh', (req, res) => {
  try {
    // sample login only
    const decoded = jwt.decode(req.body.token)

    const token = jwt.sign(decoded.payload, SECRET)

    req.session.token = token

    res.json(token)
  } catch (err) {
    res.status(401).send(err.message)
  }
})

app.use(
  sapper.middleware({
    session: (req) => ({
      token: req.session && req.session.token,
    }),
  }),
)

app.listen(PORT, (err) => {
  if (err) console.log('error', err)
})
