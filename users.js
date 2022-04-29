const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// find all users
router.get("/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({});
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedUser);
  } catch (error) {
    next(error);
    console.log(error)
  }
});

router.post("/users", async (req, res, next) => {
  try {
    const { name, surname, date_of_birth } = req.body;
    console.log(req.body);
    const users = await prisma.user.create({
      data: {
        name: name,
        surname: surname,
        date_of_birth: date_of_birth,
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.patch("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: "Jhony",
        surname: "Kent",
        date_of_birth: "1945.12.22",
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
