import { Request, Response, NextFunction } from 'express';
import "reflect-metadata";

// Type for HTTP methods
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

// Store metadata for routes
const MetadataKeys = {
  path: 'path',
  method: 'method',
  middleware: 'middleware'
};

// Route decorator factory
function createRouteDecorator(method: HttpMethod) {
  return function (path: string) {
    return function (target: any, propertyKey: string) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, propertyKey);
      Reflect.defineMetadata(MetadataKeys.method, method, target, propertyKey);
    };
  };
}

// HTTP method decorators
export const Get = createRouteDecorator('get');
export const Post = createRouteDecorator('post');
export const Put = createRouteDecorator('put');
export const Delete = createRouteDecorator('delete');
export const Patch = createRouteDecorator('patch');

// Middleware decorator
export function Use(middleware: (req: Request, res: Response, next: NextFunction) => void) {
  return function (target: any, propertyKey: string) {
    const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, propertyKey) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, propertyKey);
  };
}

// Controller decorator
export function Controller(prefix: string = '') {
  return function (target: Function) {
    target.prototype.prefix = prefix;
  };
}

// Validation decorator
export function ValidateBody(schema: any) {
  return function (target: any, propertyKey: string) {
    const originalMethod = target[propertyKey];

    target[propertyKey] = async function (...args: any[]) {
      const [req, res] = args;
      try {
        await schema.validate(req.body);
        return originalMethod.apply(this, args);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    };
  };
}

// Rate limiting decorator
export function RateLimit(limit: number, windowMs: number) {
  return function (target: any, propertyKey: string) {
    const originalMethod = target[propertyKey];
    const requests = new Map<string, number[]>();

    target[propertyKey] = function (...args: any[]) {
      const [req, res] = args;
      const ip = req.ip;
      const now = Date.now();
      
      if (!requests.has(ip)) {
        requests.set(ip, []);
      }
      
      const userRequests = requests.get(ip)!;
      const windowStart = now - windowMs;
      
      // Remove old requests
      while (userRequests.length && userRequests[0] < windowStart) {
        userRequests.shift();
      }
      
      if (userRequests.length >= limit) {
        return res.status(429).json({ error: 'Too many requests' });
      }
      
      userRequests.push(now);
      return originalMethod.apply(this, args);
    };
  };
}

export function registerRoutes(app: any, controllers: any[]) {
  controllers.forEach(ControllerClass => {
    const controllerInstance = new ControllerClass();
    const prefix = controllerInstance.prefix || '';
    
    Object.getOwnPropertyNames(ControllerClass.prototype).forEach(propertyName => {
      const path = Reflect.getMetadata(MetadataKeys.path, ControllerClass.prototype, propertyName);
      const method: HttpMethod = Reflect.getMetadata(MetadataKeys.method, ControllerClass.prototype, propertyName);
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, ControllerClass.prototype, propertyName) || [];
      
      if (path && method) {
        app[method](`${prefix}${path}`, ...middlewares, controllerInstance[propertyName].bind(controllerInstance));
      }
    });
  });
}