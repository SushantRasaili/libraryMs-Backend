const router = require('express').Router();
const Students = require('../models/students');




// IF YOU WANT TO ADD MORE STUDENTS THROUGH POSTMAN
// {
//     "name":"Sushant Rasaili",
//     "semester": 5,
//     "roll": 217,
//     "address": "Panauti-6",
//     "course":"BIM",
//     "email":"sushant@ymail.com"

// }

router.post("/addStudents", async (req,res) => {
        const {semester,roll,imageUrl,address,course,email} = req.body;
        const name = req.body.name.toLowerCase();

        try {
          const addStudent = new Students({
            name,
            semester,
            roll,
            imageUrl,
            address,
            course,
            email
          });
          const studentAdded = await addStudent.save();

          if(studentAdded)
          // res.status(200).send("Student successfully added");
          res.status(200).send(studentAdded);
          else 
          res.status(400).send("Sorry something went wrong, please try again");

        }
        catch(err) {
            console.log(err);
        }
});


    // GETTING STUDENTS
  
router.get("/searchStudents", async (req,res) => {
  try{
    const students = await Students.find({name: {$regex: req.query.search}});
    if(students)
      res.status(200).send(students);
      else 
      res.status.apply(400).send("Not found");
  }
  catch(err) {
    console.log(err);
  }
   
});

    //GETTING STUDENTS INF FOR UPDATE MODE
    router.get("/getStudent/:id", async (req,res) => {
      try {
        const student = await Students.findById(req.params.id);
        if(student) {
          res.status(200).send(student);
        }
        else {
          res.status(400).send("No student with such id");
        }
      }
      catch(err) {
        console.log(err);
      }
    });


      //UPDATE THE STUDENT WITH THE UPDATE MODE
        router.put("/updateStudent/:id", async (req,res) =>  {


          const {semester,roll,imageUrl,address,course,email} = req.body;
          const name = req.body.name.toLowerCase();
          try {
            const updated = await Students.findByIdAndUpdate(req.params.id, {$set: {semester,
              roll,imageUrl,address,
            course,email,name}});
            if(updated) 
              res.status(200).send("Successfully updated");
              else 
              res.status(400).send("Can't update the student");
          }
        catch(err) {
          console.log(err);
        }
          
          
        })



//CHANGING STUDENTS CLASS
  router.post("/changeClass", async (req,res) => {
    const {course,fromSem,toSem} = req.body;
     try {
        const classChanged = await Students.updateMany({course:course,semester:fromSem},{$set:{semester:toSem}});
        if(classChanged)
        res.status(200).send("Successfully class changed");
        else 
        res.status(400).send("Something went wrong, please try again");
    }
    catch(err) {
        console.log(err);
    }
        
  });


  //DELETING THE STUDENT
    router.delete("/delStudent", async(req,res) => {
      const {delId} = req.body;
      try {
        const deleted = await Students.findByIdAndDelete(delId);
        if(deleted) 
          res.status(200).send("Successfully student deleted");
        else
        res.status(400).send("Can't delete the student");
      }
      catch(err) {
        console.log(err);
      }
    });


     //UPDATING STUDENTS INFORMATIOIN
    //  router.put("/updateStudent")


module.exports = router;
