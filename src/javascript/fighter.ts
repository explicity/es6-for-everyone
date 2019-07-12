import { IModal } from "./view/fightersView";

interface IPlayer {
  health: number;
  attack: number;
  defense: number;
  id: string | number;
  isAlive: boolean;
  name: string;

  getBlockPower: () => number;
  receiveDamage: (damage: number) => void;
  attackOpponent: (opponent: IPlayer) => void;
  getHitPower: () => number;
}

class Fighter implements IPlayer {
  id: string | number;
  name: string;
  health: number;
  attack: number;
  defense: number;
  isAlive: boolean;

  constructor({ _id, name, health, attack, defense }: IModal) {
    this.id = _id;
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.isAlive = true;
  }

  public receiveDamage(damage: number): void {
    this.health -= damage;
    this.checkIfAlive();
  }

  public attackOpponent(opponent: IPlayer): void {
    if (opponent.isAlive && this.isAlive) {
      const damageDone = this.getHitPower();
      const damageBlocked = opponent.getBlockPower();

      if (damageDone - damageBlocked > 0) {
        opponent.receiveDamage(damageDone - damageBlocked);
      }
    }
  }

  public getHitPower(): number {
    const criticalHitChance: number = Math.floor(Math.random() * 2) + 1;
    const power: number = this.attack * criticalHitChance;

    return power;
  }

  public getBlockPower(): number {
    const criticalHitChance: number = Math.floor(Math.random() * 2) + 1;
    const power: number = this.defense * criticalHitChance;

    return power;
  }

  private checkIfAlive(): void {
    this.isAlive = this.health > 0;
  }
}

export { Fighter, IPlayer };
