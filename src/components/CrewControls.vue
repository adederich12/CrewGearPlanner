<template>
  <div class="controlPanel">
    <div class="formControl">
      <div>
        <h3>Sort results by</h3>
        <select @change="updateOptions" v-model="sort">
          <option v-for="option in sortOptions" :value="option.value" :key="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div>
        <input type="checkbox" ref="includeFullyCited" @change="updateOptions" checked />
        <label style="font-weight: bold;" for="includeFullyCited">Include fully cited cards?</label>
      </div>
      <div>
        <input type="checkbox" ref="includeMaxLevel" @change="updateOptions" checked />
        <label style="font-weight: bold;" for="includeMaxLevel">Include max level cards?</label>
      </div>
    </div>
    <div class="formControl">
      <h3>Include rarity:</h3>
      <div>
        <input type="checkbox" ref="chk_5" @change="updateOptions" checked />
        <label for="chkFive"><font-awesome-icon :icon="['fas', 'star']" /><font-awesome-icon :icon="['fas', 'star']" /><font-awesome-icon :icon="['fas', 'star']" /><font-awesome-icon :icon="['fas', 'star']" /><font-awesome-icon :icon="['fas', 'star']" /></label>
      </div>
      <div>
        <input type="checkbox" ref="chk_4" @change="updateOptions" checked />
        <label for="chkFour"><font-awesome-icon :icon="['fas', 'star']" /><font-awesome-icon :icon="['fas', 'star']" /><font-awesome-icon :icon="['fas', 'star']" /><font-awesome-icon :icon="['fas', 'star']" /></label>
      </div>
      <div>
        <input type="checkbox" ref="chk_3" @change="updateOptions" />
        <label for="chkThree"><font-awesome-icon :icon="['fas', 'star']" /><font-awesome-icon :icon="['fas', 'star']" /><font-awesome-icon :icon="['fas', 'star']" /></label>
      </div>
      <div>
        <input type="checkbox" ref="chk_2" @change="updateOptions" />
        <label for="chkTwo"><font-awesome-icon :icon="['fas', 'star']" /><font-awesome-icon :icon="['fas', 'star']" /></label>
      </div>
      <div>
        <input type="checkbox" ref="chk_1" @change="updateOptions" />
        <label for="chkOne"><font-awesome-icon :icon="['fas', 'star']" /></label>
      </div>
    </div>
    <div class="formControl">
    </div>
    <div class="formControl">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CrewControls',
  computed: {
      sort: {
        get() {
          return this.$store.getters.sort;
        },
        set(value) {
          this.$store.commit('options/setOption', { option: 'sort', value });
        }
      },
  },
  methods: {
    updateOptions() {
      var rarity = [];
      var includeFullyCited = this.$refs.includeFullyCited.checked;
      var includeMaxLevel = this.$refs.includeMaxLevel.checked;

      for (const name in this.$refs) {
        var nameParts = name.split('_');

        if (nameParts[0] === 'chk') {
          var chkBox = this.$refs[name];
          
          if (chkBox.checked === true) {
            rarity.push(parseInt(nameParts[1]));
          }
        }
      }

      this.$store.commit('options/setOption', { option: 'rarity', value: rarity });
      this.$store.commit('options/setOption', { option: 'includeFullyCited', value: includeFullyCited });
      this.$store.commit('options/setOption', { option: 'includeMaxLevel', value: includeMaxLevel });
      this.$store.dispatch('crew/getCrewList');
    },
  },
  data() {
    return {
      sortOptions: [
        { text: 'Tier', value: 'tier' },
        { text: 'Voyage', value: 'voyage' },
        { text: 'Gauntlet', value: 'gauntlet' },
        { text: 'Gear Cost', value: 'cost' },
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.controlPanel {
  width: 100%;
  display: flex;
  height: 150px;
}
.formControl {
  flex-grow: 1;
  text-align: left;
}
.formControl h3 {
  display: inline-block;
  margin-right: 10px;
}
</style>
