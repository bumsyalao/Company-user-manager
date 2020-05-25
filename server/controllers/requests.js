import models from '../models';

const RequestModel = models.Requests;
const Companies = models.Companies;
const Users = models.Users;

class Requests {

  /**
   * Request to join a company 
   * Route: POST: /company/:companyId/user/:userId
   *
   * @param {object} request object
   * @param {object} response object
   */

  createRequest(req, res) {
    const companyId = Number(req.params.companyId);
    const userId = Number(req.params.userId);

    Companies.findByPk(companyId)
      .then((foundCompany) => {
        // check if user is already in group
        RequestModel.findOne({
            where: {
              userId,
              companyId
            }
          })
          .then((foundUser) => {
            if (foundUser) {
              return res.status(409).send({
                message: 'User is already in company'
              });
            }
          });
        // Find email from users model
        Users.findByPk(userId)
          .then((user) => {
            RequestModel.create({
              companyId: foundCompany.id,
              userId: user.id,
              email: user.email,
              companyName: foundCompany.companyName,
              status: 'new'
            }).then(newRequest => {
              return res.status(200).send({
                newRequest,
                message: 'Your Request is successful'
              });
            }).catch(error => res.status(500).send(error));
          }).catch(error => res.status(500).send(error));
      }).catch(error => res.status(500).send(error));
  }

  /**
   * Accept user Request/ Decline Request 
   * Route: PUT: /company/:companyId/user/:userId
   *
   * @param {object} request object
   * @param {object} response object
   */

  updateRequest(req, res) {
    const companyId = Number(req.params.companyId);
    const userId = Number(req.params.userId);
    // const requestUserId = Number(req.params.userId);

    // check if user is already in group
    RequestModel.findOne({
        where: {
          companyId,
          userId
        }
      })
      .then((foundRequest) => {
        if (!foundRequest) {
          return res.status(404).send({
            message: 'Can not find request'
          });
        }
        RequestModel.update({
          status: req.body.status
        }, {
          where: {
            companyId: foundRequest.companyId,
            userId: foundRequest.userId
          }
        }).then(() => {
          return res.status(200).send({
            foundRequest,
            message: `Your request status is ${req.body.status}`
          }).catch(error => res.status(500).send(error));
        }).catch(error => res.status(500).send(error));
      }).catch(error => res.status(500).send(error));
  }

  /**
   * List all company's request
   * Route: GET: /company/:companyId/users
   *
   * @param {object} request object
   * @param {object} response object
   */
  getAllRequest(req, res) {
    const companyId = req.params.companyId;
    RequestModel.findAll({
        where: {
          companyId
        }
      })
      .then((users) => {
        if (users.length === 0) {
          res.status(404).send({
            message: 'No Users Found'
          });
        } else {
          res.status(200).send({
            users
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: 'There was a server error, please try again'
        });
      });
  }


}

export default new Requests();