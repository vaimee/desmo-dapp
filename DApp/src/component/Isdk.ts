
export default interface Isdk {

  getTDDsByRequestID(requestID: string): Promise<string[]>;

}




