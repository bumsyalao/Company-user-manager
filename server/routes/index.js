import Users from '../controllers/users';
import Companies from '../controllers/companies';
import Requests from '../controllers/requests';

import auth from '../middleware/jwt';

module.exports = (app) => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Magnetti-project API!'
    })
  );
  //  api route to signup
  app.post('/api/v1/user/signup', Users.signup);

  //  api route to signin
  app.post('/api/v1/user/signin', Users.signin);

  //api to get user's company
  app.get('/api/v1/user/company', auth.checkToken, Users.getUserCompany);

  //api to get all users
  app.get('/api/v1/users', Users.getUsers);

  //api to create company
  app.post('/api/v1/company', auth.checkToken, Companies.create);

  //api to get all companies
  app.get('/api/v1/companies', Companies.getCompanies);

  //api to create new request
  app.post('/api/v1/company/:companyId/user/:userId', Requests.createRequest);

  //api to accept or decline request
  app.put('/api/v1/company/:companyId/user/:userId', Requests.updateRequest);

  //api to get all company's request
  app.get('/api/v1/company/:companyId/users', Requests.getAllRequest)
};