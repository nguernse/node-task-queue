import Config from "../config";

const fetchWrapper =
  (baseUrl: string) => (path: string, options?: RequestInit) =>
    fetch(baseUrl + path, options);

const api = fetchWrapper(Config.apiUrl);

export default api;
