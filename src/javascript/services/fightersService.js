import { callApi } from "../helpers/apiHelper";

class FighterService {
  async getFighters() {
    const endpoint = "/user";

    return await this.getCallApi(endpoint);
  }

  async getFighterDetails(_id) {
    const endpoint = `/user/${_id}`;

    return await this.getCallApi(endpoint);
  }

  async putFighterDetails(fighter) {
    try {
      const endpoint = `/user/${fighter._id}`;
      const putResult = await callApi(endpoint, "PUT", fighter);

      return putResult.fighter;
    } catch (error) {
      throw error;
    }
  }

  async getCallApi(endpoint) {
    try {
      const apiResult = await callApi(endpoint, "GET");
      return apiResult;
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
