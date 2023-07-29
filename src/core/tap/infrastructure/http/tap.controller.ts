import { NextFunction, Request, Response } from 'express';
import { TapAddDTO } from '../../domain/dtos/tap.add.dto';
import { TapOutDTO } from '../../domain/dtos/tap.out.dto';
import { TapService } from '../../application/tap.service';
import { HttpCode } from '../../../../common/http.codes';

export class TapController {

    constructor(private readonly tapService: TapService){}

    add = async(req: Request<{salePointId: string},{},TapAddDTO,{}>, res: Response<TapOutDTO | null,{}>, next: NextFunction)=>{
        const { body, params } = req;
        const { salePointId } = params
        try {
        const { salePointId } = params
            const tap = await this.tapService.add(salePointId, body);
            res.status(HttpCode.CREATED).json(tap);
        } catch (error) {
            next(error);
        }
    }

    findByUnitNumber = async(req: Request<{},{},{},{unitNumber: number}>, res: Response<TapOutDTO | null,{}>, next: NextFunction)=>{
        const { unitNumber } = req.query;
        try {
            const tap = await this.tapService.findByUnitNumber(unitNumber);
            res.status(HttpCode.OK).json(tap);
        } catch (error) {
            next(error);
        }
    }
}