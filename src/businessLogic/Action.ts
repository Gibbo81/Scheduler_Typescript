export interface Action{
  execute(): Promise<{[key:string]:string}>
}