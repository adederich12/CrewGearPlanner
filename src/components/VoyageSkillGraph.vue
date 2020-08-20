<template>
  <div class="skillGraphWrap">
    <h2>Total Voyage Skills</h2>
    <div class="skillGraph">
      <div class="skillBar com" :style="calcWidth(voyageTotals.com)">
        <div class="skillText">Command: {{ voyageTotals.com }}</div> 
      </div>
      <div class="skillBar dip" :style="calcWidth(voyageTotals.dip)">
        <div class="skillText">Diplomacy: {{ voyageTotals.dip }}</div>
      </div>
      <div class="skillBar eng" :style="calcWidth(voyageTotals.eng)">
        <div class="skillText">Engineering: {{ voyageTotals.eng }}</div>
      </div>
      <div class="skillBar sec" :style="calcWidth(voyageTotals.sec)">
        <div class="skillText">Security: {{ voyageTotals.sec }}</div>
      </div>
      <div class="skillBar med" :style="calcWidth(voyageTotals.med)">
        <div class="skillText">Medicine: {{ voyageTotals.med }}</div>
      </div>
      <div class="skillBar sci" :style="calcWidth(voyageTotals.sci)">
        <div class="skillText">Science: {{ voyageTotals.sci }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'VoyageSkillGraph',
  computed: mapState({
    voyageTotals: (state) => {
      return state.player.voyageStats;
    }
  }),
  methods: {
    calcWidth(skill) {
      var width = (skill / this.$store.getters.getMaxVoyageSkill) * 100;
      return `width: ${width}%`;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.skillGraphWrap {
  width: 59%;
  float: right;
  height: 370px;
  padding: 5px 0px;
  display: flex;
  flex-direction: column;
}
.skillBar {
  height: 40px;
  width: 100%;
  background-color: white;
  margin: 2px 0px;
  text-align: left;
}
.skillBar.com {
  background-color: #ffefd1;
}
.skillBar.dip {
  background-color: #d5f9cd;
}
.skillBar.eng {
  background-color: #a5aaf4;
}
.skillBar.sec {
  background-color: #e8a6a6;
}
.skillBar.med {
  background-color: #fbdd95;
}
.skillBar.sci {
  background-color: #b2cce8;
}
.skillText {
  margin: 12px 0px 0px 5px;
  font-weight: bold;
  display: inline-block;
}
</style>
