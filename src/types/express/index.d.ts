import express from 'express';

// Register a personal express Request parameter in typescript
// So i can use it to pass parameters between middlewares
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
