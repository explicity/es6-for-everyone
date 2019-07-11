import { callApi } from "../helpers/apiHelper";

interface IFighter {
   _id: number | string; name: string; source: string;
}
interface IFighters extends Array<IFighter>{}
interface IDetails {
  attack: number,
  defense: number,
  health: number
}

type IModal = IFighter & IDetails; 

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
