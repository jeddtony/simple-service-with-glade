# A Simple Service with Glad

## Project Overview
This project was written using PHP (Laravel) on the backend and React.js on the frontend. 

## Project setup
### Frontend Setup
The React.js code can be found in the `frontend` folder. Create React App was used to Bootstrap the frontend. To start this create a `.env` file and copy the contents of `.env.example` file into it. Fill in the value for `REACT_APP_API_URL` based on the base URL of the backend. 

Run the command `npm install` to install dependencies. 

To start the project, run the command `npm start`

### Backend Setup
The backend written in Laravel follows the regular convention in its setup. 

Run `composer install` to install dependencies. 

This uses passport for authentication. To setup passport run the command `php artisan passport:install`

 ### Running Tests
 To run tests simply run the command `composer test`


## Constraints
This code was developed with small datasets in mind, hence it does not include pagination in its response. When scaling the app, certain database queries made by ORMs should be request by SQL queries to increase speed. 

Payment is being made using the Glade React component on the frontend.

For systems like this, reports are supposed to be generated to help make better business decisions. But it was not done in this case.

### Note
There are no edits. Records cannot be edited after being created. 

Only authenticated users can use the system, except for the generated link page. You need to register to create have an account.
