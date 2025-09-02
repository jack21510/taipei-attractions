import packageJson from '../../package.json';
export const environment = {
  IS_PRINT_CONSOLE_LOG: true,
  appVersion: packageJson.version + '-dev',
  production: false,
  /** Dev */
  API_DEFAULT_IP: 'https://www.travel.taipei/open-api/',
  PAGE_SIZE: 30,

};
