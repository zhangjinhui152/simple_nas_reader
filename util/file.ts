import fs, { Stats } from 'fs';

export const getFileInfo = (filePath: string) => {
    return new Promise<Stats>((resolve, reject) => {
        // console.log('object :>> ', filePath);

        fs.stat(filePath, (err: any, stats: Stats) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('文件大小:', filePath);        // 其他属性...
            resolve(stats)
        });
    })


}
