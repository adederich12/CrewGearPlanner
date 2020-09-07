<template>
  <div id="app">
    <CrewControls @clicked="onControlChange" />
    <CrewListing />
    <SkillGraph graphTitle="Total Voyage Skills" :skillTotals="voyageTotals" />
    <SkillGraph graphTitle="Total Gauntlet Skills" :skillTotals="gauntletTotals" />
  </div>
</template>

<script>
import CrewControls from './components/CrewControls.vue'
import CrewListing from './components/CrewListing.vue'
import SkillGraph from './components/SkillGraph.vue'
import { mapState } from 'vuex' 

export default {
  name: 'App',
  computed: mapState({
    voyageTotals: (state) => {
      return state.player.playerStats.voyage;
    },
    gauntletTotals: (state) => {
      return state.player.playerStats.gauntlet;
    },
  }),
  components: {
    CrewControls,
    CrewListing,
    SkillGraph,
  },
  methods: {
    onControlChange () {
      this.$store.dispatch('player/getTotalStats');
    }
  },
  mounted() {
    this.$store.dispatch('player/getTotalStats');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>