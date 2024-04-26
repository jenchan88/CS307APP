// backend.js
import express from "express";
import cors from "cors";
import  userServices from "./user-service.js";

const app = express();
const port = 8000;
// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor"
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ]
// };

// const findUserByName = (name) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name
//   );
// };

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

// const addUser = (user) => {
//   const newUser = { ...user, id: createRandomId() };
//   users["users_list"].push(user);
//   return user;
// };

// const addUser = (user) => {
//   users["users_list"].push(user);
//   return user;
// };


// const findUserByJob = (job) => {
//   return users["users_list"].filter(
//     (user) => user["job"] === job
//   );
// };
// const findUserByNameAndJob = (name, job) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name && user["job"] === job
//   );
// };


// const createRandomID = () => {
//   const chars = 'abcdefghiklmnopqrstuvwxyz0123456789'.split('');
//   let str = '';
  
//   for (let i = 0; i < 3; i++) {
//     str += chars[Math.floor(Math.random() * chars.length)];
//   }

//   for (let i = 0; i < 3; i++) {
//     str += chars[Math.floor(Math.random() * chars.length)];
//   }

//   return str;
// }

app.use(cors());

app.use(express.json());


// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


// app.get("/users", (req, res) => {
//   const name = req.query.name;
//   if (name != undefined) {
//     let result = findUserByName(name);
//     result = { users_list: result };
//     res.send(result);
//   } else {
//     res.send(users);
//   }
// });

// app.get("/users", (req, res) => {
//   const name = req.query.name;
//   const job = req.query.job;

//   if (name != undefined && job != undefined) {
//     let result = findUserByNameAndJob(name, job);
//     result = { users_list: result };
//     res.send(result);
//   } 

//   else if (name != undefined && job === undefined){
//     let result = findUserByName(name);
//     result = { users_list: result };
//     res.send(result);
//   }

//   else if (name === undefined && job != undefined){
//     let result = findUserByJob(job);
//     result = { users_list: result };
//     res.send(result);
//   }

//   else {
//     res.send(users.users_list)
//   }
// });



// app.get("/users/:id", (req, res) => {
//   const id = req.params["id"]; //or req.params.id
//   let result = findUserById(id);
//   if (result === undefined) {
//     res.status(404).send("Resource not found.");
//   } else {
//     res.send(result);
//   }
// });



// app.post("/users", (req, res) => {
//   const userToAdd = req.body;
//   if(userToAdd["id"] === undefined){
//     userToAdd["id"] = createRandomID()
//   }
//   addUser(userToAdd);   
//   res.status(201).send(userToAdd);
// });


// app.delete("/users/:id", (req, res) => {
//   const id = req.params.id;
//   const index = users.users_list.findIndex(user => user.id === id)
//   console.log(id)
//   if (index != -1){
//     users.users_list.splice(index, 1);
//     res.status(204).send();
//   }
//   else{
//     res.status(404).send("User not found.");
//   }
// });

//new stuff




// app.post("/users", async (req, res) => {
//   const userToAdd = req.body;
//   userService
//   .addUser(userToAdd)
//   .then((result) => res.status(201).send(result));
// });

app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd)
    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(500).send(error.message));
});

// app.get("/users/:id", async (req, res) => {
//   const id = req.params["id"];
//   userServices.findUserById(id)
//   .then((result) => {
//   if (result) {
//   res.send(result);
//   } 
//   else {
//   res.status(404).send(`Not Found: ${id}`);
//   }
//   })
//   .catch((error) => {
//   res.status(500).send(error.name);
// })

// });


app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userServices.getUsers(name, job)
  .then((result) => {
  if (result){
    res.send(result);
  }
  else{
    res.status(404).send("Not Found");
  }
  })
  .catch ((error) =>{ 
    console.log(error)
    res.status(500).send(error.message);
  })
});

// app.delete("/users/:id", async (req, res) => {
//   const id = req.params.id;
//   await userService.deleteUser(id)
//   .then((result) => {
//   if (result.deletedCount === 0) {
//     res.status(404).send("User not found.");
//   } else {
//     res.status(204).send();
//   }
//   }) 
//   .catch ((error) => {
//     res.status(500).send(error.message);
//   })
// });


// app.get("/users/:id", async (req, res) => {
//   try {
//     const user = userServices.findUserById(req.params.id);
//     if (!user) {
//       res.status(404).send("Resource not found.");
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
app.get("/users/:id", (req, res) => {
  userServices.findUserById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});


// app.delete("/users/:id", async (req, res) => {
//   try {
//     const result = await userModel.findByIdAndDelete(req.params.id);
//     if (!result) {
//       res.status(404).send("Resource not found.");
//     } else {
//       res.status(204).send();
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userServices.getUsers(name, job)
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send("No users found.");
      } else {
        res.send(users);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});


app.delete("/users/:id", (req, res) => {
  userServices.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

