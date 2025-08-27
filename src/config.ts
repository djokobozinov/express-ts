import dotenv from 'dotenv';

// Load environment variables as early as possible
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const LOG_LEVEL = process.env.LOG_LEVEL || 'combined';