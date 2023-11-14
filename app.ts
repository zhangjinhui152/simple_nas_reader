import express, { Application, Request, Response } from "express";
import fs, { Stats } from 'fs';
import path from "path";
const app: Application = express();
const port = 3000;
import { fileURLToPath } from 'url'
import { getFileInfo } from './util/file';
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)
console.log('__dirnameNew :>> ', __dirnameNew);
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirnameNew, '/public')));


const args = process.argv.slice(2);
console.log('args :>> ', args);
app.use('/images', express.static(path.join(args[1])));

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})
interface FileNameCustomStats extends Stats {
    fileName?: string;
}
app.get('/filePath/*', (req: Request, res) => {
    const params = req.params[0].split('/'); // 将路径参数拆分为数组
    console.log('req.query :>> ', req.query);
    const directoryPath = args[1] + '/' + params.join('/'); // 替换为你要遍历的目录路径
    const start = req.query.s ?? 0
    const end = req.query.e ?? 5




    fs.readdir(directoryPath, async (err, files: string[]) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.sendStatus(500);
        } else {
            console.log('files :>> ', files);
            let lastFileName = params.join(">")
            let fileInfoList: FileNameCustomStats[] = []
            files = files.slice(Number(start), Number(end))
            for (const iterator of files) {
                let fileInfo: FileNameCustomStats = await getFileInfo(directoryPath + '/' + iterator)
                fileInfo.fileName = iterator
                console.log('directoryPath ', directoryPath + '/' + iterator);

                // console.log('fileInfo :>> ', fileInfo);

                fileInfoList.push(fileInfo)
            }
            let reallyPath = directoryPath.replace(args[1], '') + "/"

            console.log('reallyPath :>> ', reallyPath);
            console.log('directoryPath :>> ', directoryPath);


            res.render('index', { path: directoryPath, files: files, fileInfoList: fileInfoList, reallyPath: reallyPath })


        }
    });
});


try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}