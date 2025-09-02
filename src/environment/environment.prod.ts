import packageJson from '../../package.json';
export const environment = {
  IS_PRINT_CONSOLE_LOG: false,
  appVersion: packageJson.version + '-prod',
  production: true,
  /** Prod */
  API_DEFAULT_IP: 'https://www.travel.taipei/open-api/',
  PAGE_SIZE: 30,

};
