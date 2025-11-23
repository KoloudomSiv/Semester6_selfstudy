import express from 'express';
import userRoute from './users.routes.js';
import mainRoute from './main.routes.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import pino from 'pino';
import cors from 'cors';
import connectDB from './config/database.js';

const app = express();
const port = 4000;

// Connect to MongoDB
connectDB();



const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	// standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	// legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// // store: ... , // Redis, Memcached, etc. See below.
})
app.use(compression())
app.use(limiter)
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use('/v1', mainRoute);
app.use('/v1/user', userRoute);


app.listen(port,()=>{
    console.log(`Server is running on page http://localhost:${port}`)
});