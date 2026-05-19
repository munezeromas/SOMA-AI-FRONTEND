import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.soma.ai',
  appName: 'SomaAI',
  webDir: 'dist/client',
  server: {
    url: 'https://tanstack-start-app.munezeromas.workers.dev/student',
    cleartext: true
  }
};

export default config;
