import { Request, Response } from "express";
import * as MeetingService from "@/services/meetings.service";

export const getAllMeetings = async (req: Request, res: Response) => {
    const result = await MeetingService.findAll();
    res.status(201).json(result);
};
