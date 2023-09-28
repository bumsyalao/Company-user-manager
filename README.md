# Company-user-manager

### Key Application Features

A user can perform the following: 
- Create an account 
- Login to account 
- User can create a company.
- User can view their company profile
- User can search all companies
- User can request to join any company. 
- User can accept or decline requests to their company.
- User can log out.


##### Authentication: Users are authenticated and validated using JsonWebToken.

### Development

This application was developed using NodeJs with Express for routing. Postgres was used for persisting data.

The front end was built with the react and redux framework.

### Installation

- Clone the project repository.
- Run git clone

``` git clone https://github.com/bumsyalao/magnetti-project ```

- Run ``` npm install ``` to install the dependencies in the package.json file.
- Create Postgresql database and run ```sequelize dbmigrate npm undo and npm redo ```(https://www.postgresql.org/)
- Update .env with envexample

#### Usage

Login, Sign Up and start networking

### Technologies Used

- JavaScript (ES6) (http://es6-features.org/)
- Node.js (https://nodejs.org/en/)
- Express (https://www.npmjs.com/package/express-api)
- React/Redux (http://redux.js.org/docs/basics/UsageWithReact.html)
- Sequelize ORM (http://docs.sequelizejs.com/)
- SASS/SCSS.
- Postgres (https://www.postgresql.org/)

### Limitations
+ Users cannot delete a company.
+ Users can not edit company details


### Later To-Do
+ Add toast messages
+ Add pagination.
+ Add search for users


### Author
Olubunmi Alao
## License & Copyright
MIT © [Olubunmi Alao](https://github.com/bumsyalao)

Licensed under the [MIT License](LICENSE)
