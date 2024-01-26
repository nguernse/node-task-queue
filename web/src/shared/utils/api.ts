import Config from "../config";

class API {
  baseUrl: string;

  constructor(baseUrl: string = Config.apiUrl) {
    this.baseUrl = baseUrl;
  }

  async _fetch(path: string, options: RequestInit = {}) {
    try {
      const url = this.baseUrl + path;
      const requestOptions = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        ...options,
      };

      const request = new Request(url, requestOptions);
      const response = await fetch(request);

      return this._handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  // todo: handle response errors better
  async _handleResponse(response: Response) {
    if (
      (response.status >= 200 && response.status < 300) ||
      response.status === 400
    ) {
      const data = await response.json();

      return data;
    } else if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 403) {
      throw new Error("Forbidden");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Unexpected Error");
    }
  }

  async get(path: string) {
    return this._fetch(path, { method: "GET" });
  }

  async post(path: string, payload: Record<string, any>) {
    return this._fetch(path, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async put() {
    throw new Error("Not Implemented");
  }

  async delete() {
    throw new Error("Not Implemented");
  }
}

const api = new API();

export default api;
