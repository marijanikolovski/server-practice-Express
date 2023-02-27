import express from 'express'

export class AppRouter {
  private static instace: express.Router;

  static getInstance(): express.Router { 
    if(!AppRouter.instace) {
      AppRouter.instace = express.Router();
    }
    return AppRouter.instace;
  }
}