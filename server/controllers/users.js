import jwt from 'jsonwebtoken';
import models from '../models';

require('dotenv').config();

const secret = process.env.SECRET;

const User = models.Users;

class Users {

  /**
   * Sign Up User
   * Route: POST: /user/signup
   * @param {object} request object
   * @param {object} response object
   * @returns {response} response object
   */
  signup(req, res) {
    if (req.body.email && req.body.password) {
      User.create({
          email: req.body.email,
          password: req.body.password
        })
        .then((newUser) => {
          const token = jwt.sign({
              userId: newUser.id,
              email: newUser.email
            },
            secret, {
              expiresIn: '1 day'
            }
          );
          const userInfo = {
            userId: newUser.id,
            email: newUser.email
          };
          return res.status(200).send({
            token,
            userInfo,
            message: 'Your account has been created'
          });
        })
        .catch(error => res.status(400).send({
          message: error.message
        }));
    } else {
      return res
        .status(400)
        .send({
          message: 'Incomplete registration details'
        });
    }
  }

  /**
   * Sign In User
   * Route: POST: /user/signin
   * @param {object} request object
   * @param {object} response object
   * @returns {response} response object
   */
  signin(req, res) {
    if (req.body.email && req.body.password) {
      User.findOne({
          where: {
            email: req.body.email
          }
        })
        .then((foundUser) => {
          if (foundUser && foundUser.verifyPassword(req.body.password)) {
            const token = jwt.sign({
                userId: foundUser.id,
                email: foundUser.email,
              },
              secret, {
                expiresIn: '1 day'
              }
            );
            const userDetails = {
              userId: foundUser.id,
              email: foundUser.email,
            };
            return res.status(200).send({
              token,
              userDetails,
              message: 'You have logged in succesfully'
            });
          }
          return res.status(401).send({
            success: false,
            message: 'Incorrect email or password'
          });
        })
        .catch(error => res.status(400).send({
          message: error.message
        }));
    } else {
      return res.status(400).send({
        message: 'please enter a valid email or password'
      });
    }
  }

}

export default new Users();