# Employee-Review-System-ERS-
## Description 
  A portal where employees can review each other. There are two types of users - Employee and an Admin. The admins are responsible for assigning the reviews, i.e. admins decide who will review whom.
  The admin have special rights, such as
  -Register a new employee
  -Remove an employee (only non-admin employees)
  -Assign performance reviews (who will review whom)
  -Give admin rights, to a non-admin employee.
  
# Getting Started
  1. git clone https://github.com/anuragDeol/Employee-Review-System-ERS-.git
  2. cd Employee-Review-System-ERS-
  3. npm install
  4. npm start
  
  NOTE: To register as an admin, go to 'Employee-Review-System-ERS-/controllers/user_controller.js/createUser' and change 'isAdmin' to 'true'.
  
  ## Features
  
  * Admin View
  	* Add/ remove/ update/ view employees
  	* Add/update/view performance reviews
  	* Assign employees to participate in another employee's performance review
  	
  * Employee View
    * List of performance review requiring feedback
    * Submit feedback
  * Login
  * Register
  
  ## Directory Structure
  * ```/config``` - Application configuration including environment-specific configs
  * ```/controllers``` - Controllers define functions to serve various express routes
  * ```/models``` - Models define schemas that will be used in storing and retrieving data from Application database
  * ```/routes``` - Contain all express routes
  * ```/views``` - All EJS files
  * ```index.js``` - Entry point to express app
  
## Tech stack
  * Frontend: HTML, CSS, Bootstrap, EJS
  * Backend: Express.js (Node.js framework)
  * Database: MongoDB
