

import { Router } from "express";
import * as MeetingsController from "@/controllers/meetings.controller";

const router = Router();

router.get("/", MeetingsController.getAllMeetings);

export default router;