import {defineConfig} from '@playwright/test';
import {existsSync} from 'node:fs';
const chrome='C:/Program Files/Google/Chrome/Application/chrome.exe';
const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
export default defineConfig({testDir:'./tests',timeout:30000,fullyParallel:false,reporter:'list',use:{baseURL:'http://127.0.0.1:5173',headless:true,launchOptions:{...(existsSync(chrome)?{executablePath:chrome}:existsSync(edge)?{executablePath:edge}:{})},screenshot:'only-on-failure'},webServer:{command:process.platform==='win32'?'npm.cmd run dev':'npm run dev',url:'http://127.0.0.1:5173',reuseExistingServer:true}});
