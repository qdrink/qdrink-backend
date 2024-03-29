export interface IMessager {
    sendMessage(phone: string, text: string) : Promise<void>;
    sendMessageAndImage(phone: string, text: string, image: string): Promise<void>;
}