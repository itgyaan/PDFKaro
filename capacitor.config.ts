import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dhananjaytech.pdfchef',
  appName: 'PDF Karo',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
  },
  cordova: {
    accessOrigins: [],
  },
};

export default config;
