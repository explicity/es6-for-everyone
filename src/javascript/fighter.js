class Fighter {
  constructor({ _id, name, health, attack, defense }) {
    this.id = _id;
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.isAlive = true;
  }

  receiveDamage(damage) {
    this.health -= damage;
    this.checkIfAlive();
  }

  attackOpponent(opponent) {
    if (opponent.isAlive && this.isAlive) {
      const damageDone = this.getHitPower();
      console.log(damageDone);
      const damageBlocked = opponent.getBlockPower();
      console.log(damageBlocked);

      if (damageDone - damageBlocked > 0) {
        opponent.receiveDamage(damageDone - damageBlocked);
      }
    }
  }

  getHitPower() {
    const criticalHitChance = Math.floor(Math.random() * 2) + 1;
    const power = this.attack * criticalHitChance;

    return power;
  }

  getBlockPower() {
    const criticalHitChance = Math.floor(Math.random() * 2) + 1;
    const power = this.defense * criticalHitChance;

    return power;
  }

  checkIfAlive() {
    this.isAlive = this.health > 0 ? true : false;
  }
}

export default Fighter;
