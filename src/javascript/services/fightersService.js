import { callApi } from "../helpers/apiHelper";

class FighterService {
  async getFighters() {
    const endpoint = "/user";

    return await this.getCallApi(endpoint, "GET");
  }

  async getFighterDetails(_id) {
    const endpoint = `/user/${_id}`;

    return await this.getCallApi(endpoint, "GET");
  }

  async putFighterDetails(fighter) {
    const endpoint = `/user/${fighter._id}`;

    return await callApi(endpoint, "PUT", fighter);
  }

  async deleteFighter(id) {
    const endpoint = `/user/${id}`;

    return await this.getCallApi(endpoint, "DELETE");
  }

  async getCallApi(endpoint, method, data) {
    try {
      const apiResult = await callApi(endpoint, method, data);
      if (method === "DELETE") {
        location.reload(true);
      }

      return apiResult;
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
