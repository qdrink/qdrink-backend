import { MessageinDTO } from "../domain/dtos/message.in.dto";
import { NewCostumerHandlerCreator } from "./message-handler/new.customer.handler";
import { LoadCreditHandlerCreator } from "./message-handler/load.credit.handler";
import { RequestQrCodeHandlerCreator } from "./message-handler/request.qrcode.handler";
import { CustomerService } from "../../customer/application/customer.service";
import { IMessager } from "../domain/dtos/message.messager";


export class MessageService {
    constructor(private readonly customerService: CustomerService, private readonly messager: IMessager) {}
  
    receiver = async (body: MessageinDTO)=>{
        const { text, phone } = body;
        
        const response = await this.choseHandler(text, phone);
        
        const res = response.run()
    
        console.log(res);
    
      
    };

    private choseHandler = async (text: string, phone: string) => {
      
      const customer = await this.customerService.findByPhone(phone);
      console.log({
        customer,
        phone
      })
      if(!customer) 
        return new NewCostumerHandlerCreator(this.customerService, this.messager, phone);
      
        switch (text) {
        case "qr":
          return new RequestQrCodeHandlerCreator();
        case "saldo":
          return new LoadCreditHandlerCreator();
        default:
          return new LoadCreditHandlerCreator();
      }
    }
}