import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';

export class AuthController {
  static facebookLogin = async (req: Request, res: Response) => {

  };

  static login = async (req: Request, res: Response) => {
    // Check if username and password are set
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    // Get user from database
    const userRepository = getRepository(User);
    userRepository
      .findOneOrFail({ where: { username } })
      .catch(() => res.status(401).send())
      .then((user: User) => {
        // Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
          res.status(401).send();
          return;
        }
        const payload = { userId: user.id, username: user.username };
        const expiry = { expiresIn: '1h' };
        // Sign JWT, valid for 1 hour
        const token = jwt.sign(payload, config.jwtSecret, expiry);

        // Send the jwt in the response
        res.send({ token });
      });
  }

  static register = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const { username, password, role } = req.body;
    
    userRepository.findOne({ where: { username } }).then((user: User) => {
      if (user != null) {
        res.status(400).send('user used');
        return;
      }
      user = new User();
      user.username = username;
      user.password = password;
      user.role = role;
      user.hashPassword();
      validate(user).then(errors => {
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
        userRepository.save(user);
        res.status(204).send();
      });
    });
  }

  static changePassword = async (req: Request, res: Response) => {
    // Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    // Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    // Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    // Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  }
}
