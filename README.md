# Expressjs + TypeScript + Decorators 


> **Note**: This is my experimental side project meant for learning and demonstration purposes. It is not production-ready and should not be used in production environments without significant hardening, testing, and security reviews.

## Contributing

Feel free to contribute, fork, or use this project in any way you'd like! This is an open experiment and learning resource. You can:

- Fork the repository and make it your own
- Submit pull requests with improvements
- Use it as a reference for learning decorators in TypeScript
- Build upon it for your own projects

No restrictions - have fun exploring and experimenting!


# Getting started
```bash
npm install 
npm start
```

# How it Works

This project demonstrates a TypeScript-based Express.js application with decorators for clean and declarative route handling.


## Step 1: Register Routes

In your main application file (e.g., `index.ts`), register your controllers:

```typescript
registerRoutes(app, [UserController]);
```

## Step 2: Create a Controller

Create a controller class using decorators to define routes and middleware:

```typescript
import { Request, Response } from 'express';
import { Controller, Get, RateLimit } from './path/to/decorators';

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
```


## Step 3: Test the API

Once your server is running, you can test the API endpoint by visiting:

```
http://localhost:3000/api/users
```