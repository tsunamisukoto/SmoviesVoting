import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';
import { SocialUser } from 'angularx-social-login';
import { UserSocialLogin } from '../entity/UserSocialLogin';
export class AuthController {
  static facebookLogin = async (req: Request, res: Response) => {
    const request = req.body as SocialUser;

    const socialLoginRpository = getRepository(UserSocialLogin);
    const requestURL = `https://graph.facebook.com/oauth/access_token?client_id={your-app-id}&client_secret={your-app-secret}&grant_type=client_credentials`;
    const checkUser = (request: SocialUser) => new Promise<boolean>((resolve) => resolve(true));
    checkUser(request).then(() => {

      socialLoginRpository.findOne({
        provider: request.provider,
        externalId: request.idToken
      }).then((socialLogin) => {
        if (socialLogin) {

          res.send({ token: AuthController.generateTokenForUser(socialLogin.user) });
        } else {
          const userRepository = getRepository(User);


          userRepository.findOne({ email: request.email }).then(existingUser => {
            if (existingUser) {

              res.status(401).send();
            } else {

              const newUser = new User();
              newUser.username = request.email;
              newUser.email = request.email;
              newUser.password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); ;
              newUser.role = '';
              newUser.photoUrl = request.photoUrl;
              newUser.hashPassword();
              const socialLogin = new UserSocialLogin();
              socialLogin.provider = request.provider;
              socialLogin.externalId = request.id;
              socialLogin.authToken = request.authToken;
              // socialLogin.authorizationCode = request.authorizationCode;

              // socialLogin.idToken = request.idToken;
              socialLogin.user = newUser;
              socialLoginRpository.save(socialLogin).then(savedUser => {

                userRepository.findOne();
                res.send({ token: AuthController.generateTokenForUser(savedUser.user) });
              });
            }
          });
        }
      });
    }).catch(() => res.status(401).send());
  }

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

        // Send the jwt in the response
        res.send({ token: AuthController.generateTokenForUser(user) });
      });
  }
  private static generateTokenForUser = (user: User): string => {
    const payload = { userId: user.id, username: user.username };

    const expiry = { expiresIn: '1h' };
    // Sign JWT, valid for 1 hour
    const token = jwt.sign(payload, config.jwtSecret, expiry);
    return token;
  }
  static register = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const { username, password, role, email } = req.body;

    userRepository.findOne({ where: { username } }).then((user: User) => {
      if (user != null) {
        res.status(400).send('user used');
        return;
      }
      user = new User();
      user.username = username;
      user.password = password;
      user.email = email;
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
