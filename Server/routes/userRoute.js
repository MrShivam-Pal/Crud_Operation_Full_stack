import express from "express";
import { createUserController, editUserController, getUsersController, removeUserController } from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createUserController);

router.put("/edit/:id", editUserController);

router.delete("/delete/:id", removeUserController);

router.get("/get-users", getUsersController);

export default router;