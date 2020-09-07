<template>
  <div class="controlPanel">
    <div class="skillSelect">
      <h3>Search by skill category</h3>
      <div>
        <input type="checkbox" ref="skill_com" @change="updateOptions" />
        <label for="skill_com"><img class="skillIcon" src="/command_skill.png" /></label>
      </div>
      <div>
        <input type="checkbox" ref="skill_dip" @change="updateOptions" />
        <label for="skill_dip"><img class="skillIcon" src="/diplomacy_skill.png" /></label>
      </div>
      <div>
        <input type="checkbox" ref="skill_sec" @change="updateOptions" />
        <label for="skill_sec"><img class="skillIcon" src="/security_skill.png" /></label>
      </div>
      <div>
        <input type="checkbox" ref="skill_eng" @change="updateOptions" />
        <label for="skill_eng"><img class="skillIcon" src="/engineering_skill.png" /></label>
      </div>
      <div>
        <input type="checkbox" ref="skill_med" @change="updateOptions" />
        <label for="skill_med"><img class="skillIcon" src="/medicine_skill.png" /></label>
      </div>
      <div>
        <input type="checkbox" ref="skill_sci" @change="updateOptions" />
        <label for="skill_sci"><img class="skillIcon" src="/science_skill.png" /></label>
      </div>      
    </div>
    <div class="formControl">
    </div>
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
        <h3>Limit results to</h3>
        <select @change="updateOptions" v-model="limit">
          <option v-for="option in limitOptions" :value="option.value" :key="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="checkboxGroup">
        <input type="checkbox" ref="includeFullyCited" @change="updateOptions" checked />
        <label style="font-weight: bold;" for="includeFullyCited">Include fully cited cards</label>
      </div>
      <div class="checkboxGroup">
        <input type="checkbox" ref="includeMaxLevel" @change="updateOptions" checked />
        <label style="font-weight: bold;" for="includeMaxLevel">Include max level cards</label>
      </div>
      <div class="checkboxGroup">
        <input type="checkbox" ref="includeProjected" @change="updateOptions" checked />
        <label style="font-weight: bold;" for="includeProjected">Include max level projections</label>
      </div>
      <div class="checkboxGroup">
        <input type="checkbox" ref="includeUnowned" @change="updateOptions" checked />
        <label style="font-weight: bold;" for="includeUnowned">Include not owned</label>
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
      limit: {
        get() {
          return this.$store.getters.limit;
        },
        set(value) {
          this.$store.commit('options/setOption', { option: 'limit', value });
        }
      },
  },
  methods: {
    updateOptions() {
      var rarity = [];
      var skills = [];
      var includeFullyCited = this.$refs.includeFullyCited.checked;
      var includeMaxLevel = this.$refs.includeMaxLevel.checked;
      var includeProjected = this.$refs.includeProjected.checked;
      var includeUnowned = this.$refs.includeUnowned.checked;

      for (const name in this.$refs) {
        var nameParts = name.split('_');
        var chkBox = this.$refs[name];

        if (nameParts[0] === 'chk') {
          if (chkBox.checked === true) {
            rarity.push(parseInt(nameParts[1]));
          }
        } else if (nameParts[0] === 'skill') {
          if (chkBox.checked === true) {
            skills.push(nameParts[1]);
          }
        }
      }

      this.$store.commit('options/setOption', { option: 'rarity', value: rarity });
      this.$store.commit('options/setOption', { option: 'skills', value: skills });
      this.$store.commit('options/setOption', { option: 'includeFullyCited', value: includeFullyCited });
      this.$store.commit('options/setOption', { option: 'includeMaxLevel', value: includeMaxLevel });
      this.$store.commit('options/setOption', { option: 'includeProjected', value: includeProjected });
      this.$store.commit('options/setOption', { option: 'includeUnowned', value: includeUnowned });
      this.$store.dispatch('crew/getCrewList');
      this.$emit('clicked');
    },
  },
  data() {
    return {
      sortOptions: [
        { text: 'Tier', value: 'tier' },
        { text: 'Voyage Rank', value: 'voyage' },
        { text: 'Gauntlet Rank', value: 'gauntlet' },
        { text: 'Base Skill', value: 'skill' },
        { text: 'Proficiency', value: 'proficiency' },
        { text: 'Gear Cost', value: 'cost' },
      ],
      limitOptions: [
        { text: '10', value: '10' },
        { text: '20', value: '20' },
        { text: '50', value: '50' },
        { text: '100', value: '100' },
        { text: 'No Limit', value: '1000' },
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
  height: 180px;
}
.formControl {
  flex-grow: 1;
  text-align: left;
}
.formControl h3 {
  display: inline-block;
  margin: 10px;
}
.checkboxGroup {
  margin: 5px;
}
.skillSelect {
  flex-grow: 1;
  background-color: #3c3c3c;
  padding: 0px 10px;
  text-align: left;
  color: white;
  border-radius: 5px;
}
.skillSelect > div {
  display: inline-block;
  margin: 10px;
}
.skillIcon {
  height: 25px;
  margin-left: 5px;
  vertical-align:middle;
}
</style>
