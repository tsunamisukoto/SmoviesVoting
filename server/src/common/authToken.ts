import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config/config';

export const getAuthToken = (req: Request): AuthTokenModel => {
  // Get the jwt token from the head
  const token =  req.headers['auth'] as string;

  // Try to validate the token and get data
  try {
    return  verify(token, config.jwtSecret) as AuthTokenModel;
  } catch (error) {
    console.log('Failed Auth');
    return null;
  }
};

export class AuthTokenModel {
  userId: number;
  username: string;
}

