import { TapAddDTO } from "../domain/dtos/tap.add.dto";
import { TapOutDTO } from "../domain/dtos/tap.out.dto";
import { MoreThanTwoDrinksExcpetion } from "../domain/errors/tap.moreThanTwoDrinks.exception";
import { TapNotFoundExcpetion } from "../domain/errors/tap.notFound.exception";
import { TapEntity } from "../domain/tap.entity";
import { ITapMapper } from "../domain/tap.mapper";
import { ITapRepository } from "../domain/tap.repository";

export class TapService {
    
    constructor(private readonly tapRepository: ITapRepository, private readonly tapMapper: ITapMapper){}

    add = async(salePointId: string, tapAddDto: TapAddDTO): Promise<TapOutDTO | null>=>{
        const { drinkIds } = tapAddDto;
        
        if(drinkIds && drinkIds?.length > 2) throw new MoreThanTwoDrinksExcpetion();
        
        // TODO: validar que los ids de las bebidades pertenezacan al punto de venta
        
        const tapEntity = await this.tapRepository.add(salePointId, tapAddDto);
    

        return this.tapMapper.tapEntityToTapOutDTO(tapEntity);
    }

    findByUnitNumber = async(unitNumber: number): Promise<TapEntity | null> =>{
        const tapEntity = await this.tapRepository.findByUnitNumber(unitNumber);
        if(!tapEntity) throw new TapNotFoundExcpetion();
        
        return tapEntity;
    }

    findById = async(tapId: string): Promise<TapOutDTO | null> =>{
        const tapEntity = await this.tapRepository.findById(tapId);
        if(!tapEntity) throw new TapNotFoundExcpetion();
        
        return this.tapMapper.tapEntityToTapOutDTO(tapEntity);
    }

    findEntityById = async(tapId: string): Promise<TapEntity> =>{
        const tapEntity = await this.tapRepository.findById(tapId);
        if(tapEntity===null) throw new TapNotFoundExcpetion();
        
        return tapEntity
    }

}