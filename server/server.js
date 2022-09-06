import cors from 'cors'
import express from 'express'
import http from 'http'
import routes from './routes/index.js'
import contactRoutes from './routes/contact.js'
import './config.js'

const app = express();
app.set('view engine', 'ejs');

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/', routes);
app.use('/api/contact', contactRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log('server is running on : ' + PORT);
})