# Employee-Review-System (ERS)
Live: https://ill-outfit-lion.cyclic.app/

## Description 
  A portal where employees can review each other. There are two types of users - Employee and an Admin. The admins are responsible for assigning the reviews, i.e. admins decide who will review whom.
  The admin have special rights, such as
  * Register a new employee
  * Remove an employee (only non-admin employees)
  * Assign performance reviews (who will review whom)
  * Give admin rights, to a non-admin employee.
  
# Getting Started
  1. git clone https://github.com/anuragDeol/Employee-Review-System-ERS-.git
  2. cd Employee-Review-System-ERS-
  3. npm install
  4. npm start
  
  NOTE: To register as an admin, go in (directory) 'Employee-Review-System-ERS-/controllers/user_controller.js/createUser' and change 'isAdmin' to 'true'.
  
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

## Screenshots

![login](https://user-images.githubusercontent.com/79644328/209692260-7f61f8bc-f027-4ad8-8b42-c88117ee35a6.png)
![register](https://user-images.githubusercontent.com/79644328/209692323-770fce85-965b-4817-8764-e2bab4146d07.png)
![nathan](https://user-images.githubusercontent.com/79644328/209692379-6782ac93-a9c1-45e2-a512-cb3c9a067e87.png)
![arthur](https://user-images.githubusercontent.com/79644328/209692433-031efe6c-e7e4-4e85-a0e0-845b1c5c0d2e.png)
![admin page](https://user-images.githubusercontent.com/79644328/209692466-3894dd68-62ff-46a8-a5ad-8d3afdf2593d.png)
![emp_page](https://user-images.githubusercontent.com/79644328/209692496-1bc57ea8-63a2-4304-aabc-c42bdf9b8194.png)
