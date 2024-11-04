import { Request, Response } from 'express';
import { Controller, Get, RateLimit } from '../decorators';

// step 2: create a controller
// Example usage in a controller
@Controller('/api/users')
export class UserController {
  @Get('/')
  @RateLimit(100, 60000) // 100 requests per minute
  public async getUsers(req: Request, res: Response) {
    console.log('getUsers');
    res.json({ message: 'getUsers' });
  }
}