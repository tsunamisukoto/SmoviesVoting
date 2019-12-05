import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const getAuthToken = (req: Request): AuthTokenModel => {
  //Get the jwt token from the head
  const token = <string>req.headers["auth"];
  
  //Try to validate the token and get data
  try {
    return <AuthTokenModel>jwt.verify(token, config.jwtSecret);
  } catch (error) {
    console.log('Failed Auth');
    return null;
  }
};

export class AuthTokenModel
{
    userId: number;
    username: string;
}