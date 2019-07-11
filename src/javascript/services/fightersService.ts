import { callApi } from "../helpers/apiHelper.ts";

class FighterService {
  async getFighters() {
    const endpoint = "fighters.json";

    return await this.getCallApi(endpoint);
  }

  async getFighterDetails(_id) {
    const endpoint = `details/fighter/${_id}.json`;

    return await this.getCallApi(endpoint);
  }

  async getCallApi(endpoint) {
    try {
      const apiResult = await callApi(endpoint, "GET");

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
