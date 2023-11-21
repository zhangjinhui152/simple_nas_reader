import { spawn } from 'child_process';

// 创建一个简单的子进程池
class ProcessPool {
    pool: Array<any>;
    constructor() {
        this.pool = [];
    }

    runCommand(command: string, args: (string)[]) {
        const childProcess = spawn(command, args);

        childProcess.on('exit', (code: string, signal: any) => {
            console.log(`Child process exited with code ${code} and signal ${signal}`);
            // 在子进程退出后从池中移除
            const index = this.pool.indexOf(childProcess);
            if (index !== -1) {
                this.pool.splice(index, 1);
            }
        });

        this.pool.push(childProcess);

        return childProcess;
    }

    // 在应用关闭时终止所有子进程
    close() {
        this.pool.forEach(childProcess => {
            console.log('childProcess:', childProcess);
            console.log('this.pool:', this.pool);
            const index = this.pool.indexOf(childProcess);
            console.log('index:', index);

            childProcess.kill();
        });
    }
}
export default ProcessPool