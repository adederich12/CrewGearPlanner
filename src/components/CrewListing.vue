<template>
  <div class="hello">
    <h2>Crew Listing</h2>
    <ul>
      <li v-for="crew in crewMembers" :key="crew.id">
        <div class="crew-wrap" v-bind:class="{ legendary: crew.max_rarity == 5, superRare: crew.max_rarity == 4, rare: crew.max_rarity == 3, uncommon: crew.max_rarity == 2, owned: crew.owned, projected: showProjected(crew.projected) }">
          <div class="crew-name" v-if="crew.projected && viewProjected">{{ crew.name }} ( Projected )</div>
          <div class="crew-name" v-else-if="crew.owned">{{ crew.name }} (Level: {{ crew.level }})</div>
          <div class="crew-name" v-else>{{ crew.name }} (not owned)</div>
          <div class="crew-tier">Tier {{ crew.bigbook_tier }}</div>
          <div class="crew-rating" v-if="crew.owned">
            <span v-for="(star, index) in crew.current_rarity" :key="index+'y'">
              <font-awesome-icon :icon="['fas', 'star']" />
            </span>
            <span v-for="(star, index) in (crew.max_rarity - crew.current_rarity)" :key="index+'z'">
              <font-awesome-icon :icon="['far', 'star']" />
            </span>
          </div>
          <div class="crew-rating" v-else>
            <span v-for="(star, index) in crew.max_rarity" :key="index+'z'">
              <font-awesome-icon :icon="['far', 'star']" />
            </span>
          </div>
          <div class="crew-stats" v-if="crew.projected && viewProjected">
            <div class="crew-skill" v-for="(skill, index) in crew.projected" :key="index">
              <img class="skill-icon" :src="getImage(index)" /> {{ skill.core }} ({{ skill.range_min }}-{{ skill.range_max }})
            </div>
          </div>
          <div class="crew-stats" v-else-if="crew.owned">
            <div class="crew-skill" v-for="(skill, index) in crew.skills" :key="index">
              <img class="skill-icon" :src="getImage(index)" /> {{ skill.core }} ({{ skill.range_min }}-{{ skill.range_max }})
            </div>
          </div>
          <div class="crew-stats" v-else>
            <div class="crew-skill" v-for="(skill, index) in crew.base_skills" :key="index">
              <img class="skill-icon" :src="getImage(index)" /> {{ skill.core }} ({{ skill.range_min }}-{{ skill.range_max }})
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CrewListing',
  computed: mapState({
    crewMembers: (state) => {
      return state.crew.crew;
    },
    viewProjected: (state) => {
      return state.options.controlValues.includeProjected;
    }
  }),
  methods: {
    getImage(skill) {
      return `/${skill}.png`;
    },
    showProjected(visible) {
      return visible && this.$store.getters['options/includeProjected'];
    }
  },
  created () {
    this.$store.dispatch('crew/getCrewList');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  float: left;
  width: 40%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  height: 680px;
  overflow-y: scroll;
  padding: 0;
  margin: 0;
}
.crew-wrap {
  display: flex;
  flex-wrap: nowrap;
  background-color: gray;
}
.projected {
  font-style: italic;
  background-color: lightgray;
}
.legendary {
  background-color: rgb(253, 210, 106);
}
.superRare {
  background-color: rgb(170, 45, 235);
}
.rare {
  background-color: #00448d;
}
.uncommon {
  background-color: #50aa3c;
}
.crew-wrap > div {
  background-color: #9d6868;
  color: white;
  font-weight: bold;
  margin: 2px;
  padding: 0px 2px;
  text-align: left;
  line-height: 30px;
  font-size: 12px;
}
.crew-wrap.owned > div {
  background-color: #464646;
}
.crew-wrap.projected > div {
  background-color: #777;
}
.crew-name {
  width: 250px;
}
.crew-tier {
  width: 40px;
}
.crew-rating {
  flex-shrink: 1;
  width: 68px;
}
.crew-stats {
  flex-grow: 1;
  display: flex;
}
.crew-skill {
  display: inline-block;
  flex-grow: 1;
}
.skill-icon {
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}
a {
  color: #42b983;
}
</style>
