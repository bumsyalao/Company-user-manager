import jwt from 'jsonwebtoken';
import {
  Op
} from 'sequelize'
import paginate from '../middleware/paginate';
import models from '../models';

require('dotenv').config();

const secret = process.env.SECRET;

const User = models.Users;
const UserCompany = models.UserCompany;

class Users {

  /**
   * Sign Up User
   * Route: POST: /user/signup
   * @param {object} request object
   * @param {object} response object
   * @returns {response} response object
   */
  signup(req, res) {
    if (req.body.username && req.body.email && req.body.password) {
      User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })
        .then((newUser) => {
          const token = jwt.sign({
              userId: newUser.id,
              username: newUser.username,
              email: newUser.email
            },
            secret, {
              expiresIn: '1 day'
            }
          );
          const userInfo = {
            userId: newUser.id,
            username: newUser.username,
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
            const userInfo = {
              userId: foundUser.id,
              email: foundUser.email,
            };
            return res.status(200).send({
              token,
              userInfo,
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

  /**
   * Get User's Company
   * Route: GET: /user/company
   * @param {object} request object
   * @param {object} response object
   */
  getUserCompany(req, res) {
    UserCompany.findOne({
        where: {
          userId: req.decoded.userId
        },
        attributes: [
          'userId',
          'email',
          'companyId',
          'companyName'
        ]
      })
      .then((foundCompanyUser) => {
        res.status(200).send({
          foundCompanyUser
        })
      })
      .catch(() => {
        res.status(404).send({
          message: 'No company found'
        });
      });
  }

  /**
   * Get all Users
   * Routes: GET /users
   * @param {object} request object
   * @param {object} response object
   */
  getUsers(req, res) {
    const {
      limit,
      offset,
      search
    } = req.query;
    User.findAndCountAll({
        attributes: ['id', 'username', 'email'],
        limit: limit || 5,
        offset: offset || 0,
        ...search && {
          where: {
            username: {
              [Op.like]: `%${search}%`
            }
          }
        }
      })
      .then(({
        rows: users,
        count
      }) => {
        res.status(200).send({
          message: 'Users found',
          users,
          metaData: paginate(count, limit, offset)
        });
      })
      .catch((error) => {
        res.status(500).send({
          error,
          message: 'There was a server error, please try again'
        });
      });
  }
}

export default new Users();