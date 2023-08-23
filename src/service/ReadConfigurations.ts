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
        var cyclicConfigurationsfiles = await this.searchFiles(this.cycleFolder);
        var cyclicDtos: CyclingConfiguratrion[] = [];
        for (const file of cyclicConfigurationsfiles) {
            var content = await fs.readFile(file, 'utf8')
            cyclicDtos.push(JSON.parse(content) as CyclingConfiguratrion)
        }

        // cyclicConfigurationsfiles.forEach(async c => {
        //     var content = await fs.readFile(c, 'utf8')
        //     cyclicDtos.push(JSON.parse(content) as CyclingConfiguratrion)
        // });
        return cyclicDtos;
    }

    private async readFixed() {
        var fixedConfigurationsfiles = await this.searchFiles(this.fixedFolder);
        var fixedDtos: FixedConfiguratrion[] = [];
        for (const file of fixedConfigurationsfiles) {
            var content = await fs.readFile(file, 'utf8')
            fixedDtos.push(JSON.parse(content) as FixedConfiguratrion)
        }
        
        // await fixedConfigurationsfiles.forEach(async c => {
        //     var content = await fs.readFile(c, 'utf8')
        //     fixedDtos.push(JSON.parse(c) as FixedConfiguratrion)
        // });
        return fixedDtos;
    }

    private async searchFiles(folder: string): Promise<string[]> {
        var files = await fs.readdir(folder)
        return files.filter(this.isFileJson).map(fileName => folder + fileName)
    }

    private isFileJson = (filename: string): boolean =>
        (filename.substring(filename.lastIndexOf('.'), filename.length) || filename).toLowerCase() === '.json'
}