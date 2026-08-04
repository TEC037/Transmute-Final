import { spawn } from 'node:child_process';

const shell = process.platform === 'win32';

const api = shell
  ? spawn('pnpm exec tsx server.ts', {
      stdio: 'inherit',
      env: { ...process.env, API_ONLY: 'true', DEV_INSECURE_AUTH: 'true' },
      shell: true,
    })
  : spawn('pnpm', ['exec', 'tsx', 'server.ts'], {
      stdio: 'inherit',
      env: { ...process.env, API_ONLY: 'true', DEV_INSECURE_AUTH: 'true' },
    });

const web = shell
  ? spawn('pnpm exec vite', {
      stdio: 'inherit',
      env: { ...process.env },
      shell: true,
    })
  : spawn('pnpm', ['exec', 'vite'], {
      stdio: 'inherit',
      env: { ...process.env },
    });

let stopping = false;
const stop = (code = 0) => {
  if (stopping) return;
  stopping = true;
  api.kill('SIGTERM');
  web.kill('SIGTERM');
  setTimeout(() => process.exit(code), 300);
};

process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
api.on('exit', (code) => {
  if (code) stop(code);
});
web.on('exit', (code) => {
  if (code) stop(code);
});
