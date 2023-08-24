import fs from "fs/promises";
import { AllConfiguration } from "./dto/AllConfigurations";
import { FixedConfiguratrion } from "./dto/FixedConfiguratrion";
import { CyclingConfiguratrion } from "./dto/CyclingConfiguratrion";

export class ReadConfiguration{
    constructor (private fixedFolder: string, private cycleFolder:string) {}

    public async load(): Promise<AllConfiguration>{
        var fixedDtos: FixedConfiguratrion[] = await this.readFixed();
        var cyclicDtos: CyclingConfiguratrion[] = await this.readCyclic();
        return new AllConfiguration(cyclicDtos, fixedDtos)
    }

    private async readCyclic() {
        var cyclicConfigurationsfiles = await this.searchJsonFiles(this.cycleFolder);
        var cyclicDtos: CyclingConfiguratrion[] = [];
        for (const file of cyclicConfigurationsfiles) {
            var content = await fs.readFile(file, 'utf8')
            cyclicDtos.push(JSON.parse(content) as CyclingConfiguratrion)
        }
        return cyclicDtos;
    }

    private async readFixed() {
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