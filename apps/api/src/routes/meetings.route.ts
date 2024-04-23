import { Router } from "express";
import * as MeetingsController from "@/controllers/meetings.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { createMeetingSchema } from "@/dtos/create-meeting.dto";
import { verifyToken } from "@/middleware/authMiddleware";

const router = Router();

router.get("/", [verifyToken], MeetingsController.getAllMeetings);
router.post(
    "/",
    [verifyToken, validateData(createMeetingSchema)],
    MeetingsController.createMeeting
);

export default router;