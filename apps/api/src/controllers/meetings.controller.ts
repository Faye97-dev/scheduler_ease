import { Request, Response } from "express";
import * as MeetingService from "@/services/meetings.service";
import { CreateMeetingDto } from "@/dtos/create-meeting.dto";
import { StatusCodes } from "http-status-codes";

export const getAllMeetings = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.query;
        const result = await MeetingService.getUserMeetings(user_id as string);
        res.status(StatusCodes.OK).json({ payload: result });
    } catch (e: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Bad request", error_code: e?.status });
    }
};

export const createMeeting = async (
    req: Request<unknown, unknown, CreateMeetingDto>,
    res: Response
) => {
    const user_id = req.query?.user_id as string
    const result = await MeetingService.createMeetingWithParticipants(req.body, user_id);
    res.status(StatusCodes.CREATED).json(result);
};
