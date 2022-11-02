
export type IExecResult = {
  'callback-data': string;
}
export interface IWorker {

  work(query:string,requestID: string): Promise<IExecResult>;

}




