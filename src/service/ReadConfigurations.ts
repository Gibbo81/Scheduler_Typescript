import fs from "fs/promises";
import { AllConfiguration } from "./dto/AllConfigurations";
import { FixedConfiguratrion } from "./dto/FixedConfiguratrion";
import { CyclingConfiguratrion } from "./dto/CyclingConfiguratrion";
import { CyclicOperation } from "../businessLogic/Operations/CyclicOperation";
import { CyclicOperationFactory } from "../businessLogic/Operations/CyclicOperationFactory";

export class ReadConfiguration{
    constructor (private fixedFolder: string, private cycleFolder:string, private factory: CyclicOperationFactory) {}

    public async load(): Promise<AllConfiguration>{
        var fixedDtos = await this.readFixed(); //TODO: do not return a DTO but a class BL
        var cyclicDtos = await this.readCyclic();
        return new AllConfiguration(cyclicDtos, fixedDtos) 
    }

    private async readCyclic() : Promise<CyclicOperation[]> {
        var cyclicConfigurationsfiles = await this.searchJsonFiles(this.cycleFolder);
        var cyclicDtos: CyclicOperation[] = [];
        for (const file of cyclicConfigurationsfiles) {
            var content = await fs.readFile(file, 'utf8')
            var dto = JSON.parse(content) as CyclingConfiguratrion
            cyclicDtos.push(this.factory.build(dto))
        }
        return cyclicDtos;
    }

    private async readFixed()  : Promise<FixedConfiguratrion[]>{
        var fixedConfigurationsfiles = await this.searchJsonFiles(this.fixedFolder);
        var fixedDtos: FixedConfiguratrion[] = [];
        for (const file of fixedConfigurationsfiles) {
            var content = await fs.readFile(file, 'utf8')
            fixedDtos.push(JSON.parse(content) as FixedConfiguratrion)
        }
        return fixedDtos;
    }

    private async searchJsonFiles(folder: string): Promise<string[]> {
        var files = await fs.readdir(folder)
        return files.filter(this.isFileJson).map(fileName => folder + fileName)
    }

    private isFileJson = (filename: string): boolean =>
        (filename.substring(filename.lastIndexOf('.'), filename.length) || filename).toLowerCase() === '.json'
}