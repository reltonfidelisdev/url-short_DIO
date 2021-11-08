import express from 'express' 
import { URLcontroller } from './controller/URLController';
import { MongoConnection } from './database/MongoConnection';

const api = express()
api.use(express.json())

const database = new MongoConnection()
database.connect()

const urlController = new URLcontroller()
api.post('/shorten', urlController.shorten)

api.get('/:hash', urlController.redirect)

api.listen(5000, () => console.log('Express NOT listening in por 5000'))

