/// <reference types="cookie-parser" />
import { Request, Response } from 'express';
export declare class SuperAdmiService {
    createSuperAdmin(request: Request, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
