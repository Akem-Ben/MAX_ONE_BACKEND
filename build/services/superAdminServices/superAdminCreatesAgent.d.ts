import { Request, Response } from 'express';
export declare const createAgent: (request: Request, response: Response) => Promise<Response<any, Record<string, any>> | undefined>;
