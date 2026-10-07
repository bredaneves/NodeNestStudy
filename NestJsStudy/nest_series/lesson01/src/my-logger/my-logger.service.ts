import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';

@Injectable()
export class MyLoggerService extends ConsoleLogger {

    async logToFile(entry: string) {
        const formattedEntry = `${new Date().toISOString()}\t${entry}\n`;

        try {
            const logsDir = path.join(__dirname, '..', '..', 'logs');
            if (!fs.existsSync(logsDir)) {
                await fsPromises.mkdir(logsDir);
            }
            await fsPromises.appendFile(
                path.join(logsDir, 'myLogFile.log'),
                formattedEntry,
            );
        } catch (e) {
            if (e instanceof Error) console.error(e.message);
        }
    }

    log(message: any, context?: string) {
        const entry = `[${context}\t${message}`;
        this.logToFile(entry);
        super.log(message, context);
    }

    error(message: any, stackOrContext?: string) { 
        const entry = `[${stackOrContext}\t${message}`;
        this.logToFile(entry);
        super.error(message, stackOrContext);
    }
}
