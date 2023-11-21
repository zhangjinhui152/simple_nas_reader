import ProcessPool from './ProcessPool';
import fs from 'fs';

class ImageUtil {


    static compress(fileArray: Array<string>, reallyPath: string, cachePath: string, ffmpegPath = "ffmpeg", quality = "9") {
        const processPool = new ProcessPool();
        fileArray.forEach((filename, index) => {
            const inputFilePath = `${reallyPath}${filename}`;
            const outputFilePath = `${cachePath}${filename}_compressed.jpg`;
            if (fs.existsSync(outputFilePath)) {
                return; // File exists, return immediately
            }
            const ffmpegCommand = `${ffmpegPath}`;
            const ffmpegArgs: string[] = [
                '-i', inputFilePath,     // 输入文件
                '-q:v', quality,             // 压缩质量（可以调整为适合您的值）
                "-vf", "scale=150:150",
                outputFilePath            // 输出文件
            ];
            console.log('ffmpegCommand :>> ', ffmpegCommand);
            console.log('ffmpegCommand :>> ', ffmpegArgs);
            processPool.runCommand(ffmpegCommand, ffmpegArgs);
        });

        process.on('exit', () => {
            processPool.close();
        });
    }
}
export default ImageUtil
// let filePath = ["2KHD.png", "a1.jpg"]
// ImageUtil.compress(filePath, "D:/图片/壁纸/壁纸a/", "./", "D:/bainc/TOOL/ffmpeg-4.4-essentials_build/bin/ffmpeg.exe")