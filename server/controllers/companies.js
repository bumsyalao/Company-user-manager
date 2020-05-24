import models from '../models';

const Company = models.Companies;
const CompanyUsers = models.CompanyUsers;

class Companies {
  /**
   * Create new company
   * Route: POST: api/v1/company
   * Route: POST: api/v1/comapany/:userId
   *
   * @param {object} request object
   * @param {any} response object
   */
  create(req, res) {
    Company.create({
        companyName: req.body.companyName,
        companySize: req.body.companySize,
        companyType: req.body.companyType,
        industry: req.body.industry,
      })
      .then((newCompany) => {
        // check if user is already in company
        // CompanyUsers.findOne({
        //     where: {
        //       $and: [{
        //         userId: req.decoded.userId
        //       }, {
        //         companyId: newCompany.id
        //       }]
        //     }
        //   })
        //   .then((foundCompanyUser) => {
        //     if (foundCompanyUser) {
        //       return res.status(409).send({
        //         message: 'User has created this company'
        //       });
        //     }
        //   });
        CompanyUsers.create({
          companyId: newCompany.id,
          userId: req.decoded.userId,
          email: req.decoded.email,
          companyName: newCompany.companyName
        }).then((savedCompany) => res.status(200).send({
          savedCompany,
          message: 'Company created successfully'
        })).catch(error => res.status(400).send(error.message))
      })
      .catch(error => res.status(500).send(error.message));

  }
}

export default new Companies();