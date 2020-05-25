import {
  Op
} from 'sequelize';
import paginate from '../middleware/paginate';
import models from '../models';

const Company = models.Companies;
const UserCompany = models.UserCompany;

class Companies {
  /**
   * Create new company
   * Route: POST: /company
   *
   * @param {object} request object
   * @param {any} response object
   */
  create(req, res) {
    const userid = req.decoded.userId;
    Company.create({
        companyName: req.body.companyName,
        companySize: req.body.companySize,
        companyType: req.body.companyType,
        industry: req.body.industry,
      })
      .then((newCompany) => {
        //check if user is already in company
        UserCompany.findOne({
            where: {
              userId: userid
            }
          })
          .then((foundCompanyUser) => {
            if (foundCompanyUser) {
              return res.status(409).send({
                message: 'User has already created a company'
              });
            }
            UserCompany.create({
              companyId: newCompany.id,
              userId: req.decoded.userId,
              email: req.decoded.email,
              companyName: newCompany.companyName
            }).then((companyDetails) => res.status(200).send({
              companyDetails,
              message: 'Company created successfully'
            })).catch(error => res.status(400).send(error.message))
          }).catch(error => res.status(500).send(error.message));
      })
      .catch(error => res.status(500).send(error.message));
  }

  /**
   * Get all companies
   * Routes: GET /companies
   * @param {object} request object
   * @param {object} response object
   */
  getCompanies(req, res) {
    const {
      limit,
      offset,
      search
    } = req.query;
    Company.findAndCountAll({
        attributes: ['id', 'companyName'],
        limit: limit || 5,
        offset: offset || 0,
        ...search && {
          where: {
            companyName: {
              [Op.like]: `%${search}%`
            }
          }
        }
      })
      .then(({
        rows: companies,
        count
      }) => {
        res.status(200).send({
          message: 'Companies found',
          companies,
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

export default new Companies();