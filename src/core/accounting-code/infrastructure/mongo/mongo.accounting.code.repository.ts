import { DebitCreditKind, SaleChannel, AccountingCodeKind, AccountingCodeEntity } from "../../domain/accounting.code.entity";
import { IAccountingCodeRepository } from "../../domain/accounting.code.repository";
import { AccountingCode } from "./mongo.accounting.code.model";

export class MongoAccounitngCodeRepository implements IAccountingCodeRepository{
    findById(id: string): Promise<AccountingCodeEntity | null> {
        throw new Error("Method not implemented.");
    }
    findAll = async(kind?: DebitCreditKind | undefined, saleChannel?: SaleChannel | undefined, accountingCodeKind?: AccountingCodeKind | undefined): Promise<AccountingCodeEntity[]> => {
        const filters = {};

        if(kind) Object.assign(filters,{kind: kind});
        if(saleChannel) Object.assign(filters, {saleChannel: saleChannel});
        if(accountingCodeKind) Object.assign(filters, {accountingCodeKind: accountingCodeKind});

        return await AccountingCode.find(filters);
    }

}