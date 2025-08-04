import express from "express";
import responses from "./responses";
import embedding from "./embedding";

const router = express.Router();

router.use("/responses", responses);
router.use("/embedding", embedding);

export default router;
