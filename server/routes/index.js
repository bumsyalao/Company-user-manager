import Users from '../controllers/users';
import Companies from '../controllers/companies';

import auth from '../middleware/jwt';

module.exports = (app) => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the PostIt API!'
    })
  );
  //  api route to signup
  app.post('/api/v1/user/signup', Users.signup);

  //  api route to signin
  app.post('/api/v1/user/signin', Users.signin);

  //api to create company
  app.post('/api/v1/comapany', auth.checkToken, Companies.create);
};