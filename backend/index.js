const express = require("express"),
  app = express(),
  passport = require("passport"),
  port = process.env.PORT || 80,
  cors = require("cors"),
  cookie = require("cookie");

const bcrypt = require("bcrypt");

const db = require("./database.js");
let users = db.users;

require("./passport.js");

const router = require("express").Router(),
  jwt = require("jsonwebtoken");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
// router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
        if (req.body.remember == true) {
          time_exp = "7d";
        } else time_exp = "1d";
        const token = jwt.sign(user, db.SECRET, {
          expiresIn: time_exp,
        });
        var decoded = jwt.decode(token);
        //let time = "" + new Date(decoded.exp * 1000);
        let time = new Date(decoded.exp * 1000);
        //let str = time.substring(0, 10);
        console.log(new Date(decoded.exp * 1000));
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
          })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length
      ? users.users[users.users.length - 1].id + 1
      : 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

router.get("/", (req, res, next) => {
  res.send("Respond without authentication");
});

router.get(
    "/foo",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        res.status(200).json({ message: "Foo" });
    }
  );

  let pets = {
    list: [
      { id: 1, type: "cat", age: 1, weight: 5, price: 2000 },
      { id: 2, type: "dogs", age: 1, weight: 10, price: 3000 },
    ],
  };

  let income = 0;

  router
    .route("/pets")
    .get((req, res) => {
      res.send(pets);
    })
    .post((req, res) => {
      console.log(req.body);
      let newPet = {};
      //console.log(todo.list.length ? todo.list[todo.list.length - 1].id + 1 : 1);
      newPet.id = pets.list.length ? pets.list[pets.list.length - 1].id + 1 : 1;
      newPet.type = req.body.type;
      newPet.age = req.body.age;
      newPet.weight = req.body.weight;
      newPet.price = req.body.price;
      pets = { list: [...pets.list, newPet] };
      res.json(pets);
    });

  router
    .route("/pets/:petid")
    .get((req, res) => {
      let id = pets.list.findIndex((item) => +item.id == +req.params.petid)
      //console.log("id",id)
      res.json(pets.list[id]);
    })
    .put((req, res) => {
      let id = pets.list.findIndex((item) => item.id == +req.params.petid);
      pets.list[id].type = req.body.type;
      pets.list[id].age = req.body.age;
      pets.list[id].weight = req.body.weight;
      pets.list[id].price = req.body.price;
      res.json(pets.list);
    })
    .delete((req, res) => {
      pets.list = pets.list.filter((item) => +item.id !== +req.params.petid);
      res.json(pets.list);
    });

  router.route("/income")
  .get((req,res) => {
    console.log("sss")
    res.json(income)
  });

  router.route("/purchase/:petId")
  .post((req,res) => {
    let id = pets.list.findIndex((item) => +item.id == +req.params.petId)
    if (id == -1) {
      res.json({message: "Pet not found"})
    }
    else {
      income = pets.list[id].price;
      console.log(income)
      pets.list = pets.list.filter((item) => +item.id !== +req.params.petId);
      res.json(pets.list);
    }
  })

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));