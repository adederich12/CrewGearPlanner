<template>
  <div id="app">
    <CrewControls />
    <CrewListing />
    <VoyageSkillGraph />
    <GauntletSkillGraph />
  </div>
</template>

<script>
import CrewControls from './components/CrewControls.vue'
import CrewListing from './components/CrewListing.vue'
import VoyageSkillGraph from './components/VoyageSkillGraph.vue'
import GauntletSkillGraph from './components/GauntletSkillGraph'

export default {
  name: 'App',
  components: {
    CrewControls,
    CrewListing,
    VoyageSkillGraph,
    GauntletSkillGraph,
  },
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