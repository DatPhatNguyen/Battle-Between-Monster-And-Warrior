const randomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    useSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    hideContainer() {
      return { display: "block" };
    },
  },
  watch: {
    //todo: if player's health < 0 he will loose
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        // player lost
        this.winner = "monster";
      }
    },
    //todo: if monster's health < 0 he will loose

    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        //   monster lost
        this.winner = "player";
      }
    },
  },
  methods: {
    addLogMessage(who, what, value) {
      this.logMessages.push({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    surrender() {
      this.winner = "monster";
      this.resetGame();
    },
    //todo: normally attack to monster from player
    attackMonster() {
      this.currentRound++;
      // random from 5 to 12
      const randomAttackValue = randomValue(5, 12);
      const monsterHealth = (this.monsterHealth -= randomAttackValue);
      this.attackPlayer();
      this.addLogMessage("player", "attack", randomAttackValue);
      if (this.playerHealth < 0) {
      }
    },

    //todo: normally attack to player from monster
    attackPlayer() {
      // random from 5 to 12
      const randomAttackValue = randomValue(8, 15);
      const playerHealth = (this.playerHealth -= randomAttackValue);
      this.currentRound++;
      this.addLogMessage("monster", "attack", randomAttackValue);
    },

    //todo: Special Attack to monster
    specialAttackMonster() {
      // random from  15 to 20 hp
      const specialAttackValue = randomValue(15, 20);
      const monsterHealth = (this.monsterHealth -= specialAttackValue);
      console.log(monsterHealth);
      this.attackPlayer();
      this.addLogMessage("player", "special- attack", randomAttackValue);
    },

    //todo: player health for himself
    healPlayer() {
      this.currentRound++;
      const health = randomValue(8, 20);
      if (this.playerHealth + health > 100) {
        alert("Cannot heal anymore");
        this.playerHealth = 100;
      } else {
        this.playerHealth += health;
      }
      this.addLogMessage("player", "heal", health);
    },
  },
});
app.mount("#game");
