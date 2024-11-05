import { Request, Response } from 'express';
import { Controller, Get, Post, RateLimit } from '../decorators';

// step 2: create a controller
@Controller('/api/users')
export class UserController {
  @Get('/')
  @RateLimit(100, 60000) // 100 requests per minute
  public async getUsers(req: Request, res: Response) {
    console.log('getUsers');
    res.json({ message: 'getUsers' });
  }

  @Get('/:id')
  public async getUserById(req: Request, res: Response) {
    console.log('getUserById', req.params.id);
    res.json({ message: 'getUserById', id: req.params.id });
  }

  @Post('/')
  public async createUser(req: Request, res: Response) {
    console.log('createUser', req.body);
    res.json({ message: 'createUser', body: req.body });
  }
}