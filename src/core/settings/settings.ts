import { CreateAxiosDefaults } from 'axios';

export interface SettingsApiService {
  apiPath?: string;
  apiPathWp?: string;
  apiPathRefresh?: string;
  baseAxiosConfig: CreateAxiosDefaults;
}

export enum Environment {
  Develop = 'development',
  Prod = 'production',
  Test = 'test',
}

export interface SettingsCore {
  appVersion: string;
  environment: Environment;
  isDevelop: boolean;
  isDevelopStage: boolean;
  isProduction: boolean;
  sentryDsn?: string;
  gtmId?: string;
  defaultLanguage: string;
  apiService: SettingsApiService;
  dateFormat: string;
  prefixStorageKey: string;
}

const ENVIRONMENT = (process.env.NODE_ENV as Environment) || Environment.Develop;
const API_PATH = process.env.REACT_APP_API_PATH;
const IS_DEVELOP = ENVIRONMENT === 'development';
const IS_PRODUCTION = ENVIRONMENT === 'production';
const IS_DEV_STAGE = !!window.location.origin.match(/(localhost|avgr.it)/);
const API_PATH_WP = IS_DEV_STAGE ? process.env.REACT_APP_API_PATH_WP : window.location.origin;

export const SETTINGS: SettingsCore = {
  appVersion: process.env.REACT_APP_VERSION || 'initial',
  environment: ENVIRONMENT,
  isDevelop: IS_DEVELOP,
  isDevelopStage: IS_DEV_STAGE,
  isProduction: IS_PRODUCTION,
  sentryDsn: process.env.REACT_APP_SENTRY_DSN,
  gtmId: process.env.REACT_APP_GTM_ID,
  defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || 'en',
  dateFormat: process.env.REACT_APP_DATE_FORMAT || 'dd.MM.yyyy',
  prefixStorageKey: process.env.REACT_APP_PREFIX_KEY || '__NAME_PROJECT__',
  apiService: {
    apiPath: API_PATH,
    apiPathWp: API_PATH_WP,
    apiPathRefresh: process.env.REACT_APP_API_PATH_REFRESH, // example => /refresh,
    baseAxiosConfig: {
      baseURL: API_PATH,
    },
  },
};
