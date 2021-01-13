const _env = process.env.AV_WEB_ENV;
const DEV_HOST = "http://localhost:8080";
const STAGING_HOST = "http://localhost:8080";
const PRODUCTION_HOST = "http://localhost:8080";

const getURL = function () {
  let _url = DEV_HOST;
  switch (_env) {
    case "dev":
      _url = DEV_HOST;
      break;
    case "staging":
      _url = STAGING_HOST;
      break;
    case "production":
      _url = PRODUCTION_HOST;
      break;
    default:
      break;
  }
  return _url;
};

export const URL = getURL();
