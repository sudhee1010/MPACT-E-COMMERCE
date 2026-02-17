import express from "express";
import {subscribeUser,getSubscribers} from "../controllers/subscriberController.js";

const router = express.Router();

router.post("/",subscribeUser);
router.get("/",getSubscribers);

export default router;
