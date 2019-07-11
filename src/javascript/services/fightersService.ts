import { callApi } from "../helpers/apiHelper";
import { IFighter } from "../view/fighterView";
import { IModal } from "../view/fightersView";

interface IFighters extends Array<IFighter> {}

class FighterService {
  public async getFighters(): Promise<IFighters> {
    const endpoint: string = "fighters.json";

    return await this.getCallApi(endpoint);
  }

  public async getFighterDetails(_id: string | number): Promise<IModal> {
    const endpoint: string = `details/fighter/${_id}.json`;

    return await this.getCallApi(endpoint);
  }

  private async getCallApi(endpoint: string) {
    try {
      const apiResult = await callApi(endpoint, "GET");

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
