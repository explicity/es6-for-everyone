import { callApi } from "../helpers/apiHelper";

class FighterService {
  public async getFighters(): Promise<boolean> {
    const endpoint: string = "fighters.json";

    return await this.getCallApi(endpoint);
  }

  public async getFighterDetails(_id: string): Promise<boolean> {
    const endpoint: string = `details/fighter/${_id}.json`;

    return await this.getCallApi(endpoint);
  }

  private async getCallApi(endpoint: string): Promise<boolean> {
    try {
      const apiResult = await callApi(endpoint, "GET");

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
