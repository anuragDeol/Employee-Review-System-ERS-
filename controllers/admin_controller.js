const User = require("../models/users");
const Review = require("../models/review");

// admin page - only accessible by admin
module.exports.adminPage = async function (req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/users/login");
  }
  if(req.user.isAdmin == false) {
    return res.redirect("/");
  } 
  
  try {
    let user = await User.find({});
    var employeeList = [];
    for (let i=0; i<user.length; i++) {
      var temp = {
        name: user[i].name,
        id: user[i].id,
        isAdmin: user[i].isAdmin
      };
      employeeList.push(temp);
    }

    return res.render("admin", {
      title: "Admin page",
      employeeList: employeeList,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

// setting performance reviews - who will review whom
module.exports.setReviewers = async function (req, res) {
  try {
    if(!req.isAuthenticated()) {
      return res.redirect("/users/login");
    }

    let employee = await User.findById(req.user.id);
    if(employee.isAdmin == false) {
      console.log("Access Denied! Only admin have the rights to set the reviewer and reviewee");
      return res.redirect("/");
    } 
    
    if(req.body.Reviewer === req.body.Reviewee) {
      console.log("Reviewer and Reviewee are same. Please select two different employees.");
      return res.redirect("back");
    } 

    let reviewer = await User.findById(req.body.Reviewer);
    let recipient = await User.findById(req.body.Reviewee);


    // In case reviewer, reviewee already assigned - do nothing
    for(const i in reviewer.to) {
      if (reviewer.to[i]._id == recipient.id) {
        console.log("Already assigned");
        return res.redirect("back");
      }
    }

    if (!reviewer) {
      console.log("reviewer NOT valid");
      return res.redirect("back");
    }
    if(!recipient) {
      console.log("recipient NOT valid");
      return res.redirect("back");
    }

    reviewer.to.push(recipient);
    reviewer.save();

    recipient.from.push(reviewer);
    recipient.save();

    return res.redirect("back");
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

// give admin rights, to an employee
module.exports.newAdmin = async function (req, res) {
  try {
    if(!req.isAuthenticated()) {
      return res.redirect("/users/login");
    }

    // only an admin can give admin rights to an employee
    if (req.user.isAdmin == true) {
      let employee = await User.findById(req.body.newAdmin);

      if (!employee || employee.isAdmin == true) {
        return res.redirect("back");
      }

      // giving admin rights to an employee
      employee.isAdmin = true;
      employee.save();
      return res.redirect("/admin/admin-page");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

// view all employees - only accessible by admin
module.exports.viewEmployees = async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        let employees = await User.find({});

        if (employees) {
          return res.render("employee", {
            title: "Employee List",
            employees: employees,
          });
        }
      } else {
        console.log("Access Denied! Only an admin can view list of employees.");
        return res.redirect("/");
      }
    } else {
      return res.redirect("/users/login");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

// delete an employee and associated reviews
module.exports.deleteEmployee = async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        // delete all the reviews of associated user
        await Review.deleteMany({from: req.params.id});
        await Review.deleteMany({to: req.params.id});

        // delete the user
        await User.deleteOne({ _id: req.params.id });
        return res.redirect("/admin/view-employees");
      }
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
