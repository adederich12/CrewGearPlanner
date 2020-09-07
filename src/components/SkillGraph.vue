<template>
  <div class="skillGraphWrap">
    <h2>{{ graphTitle }}</h2>
    <div class="skillGraph">
      <div class="skillBar com" :style="calcWidth(skillTotals.com)">
        <div class="skillText">Command: {{ skillTotals.com }}</div> 
      </div>
      <div class="skillBar dip" :style="calcWidth(skillTotals.dip)">
        <div class="skillText">Diplomacy: {{ skillTotals.dip }}</div>
      </div>
      <div class="skillBar eng" :style="calcWidth(skillTotals.eng)">
        <div class="skillText">Engineering: {{ skillTotals.eng }}</div>
      </div>
      <div class="skillBar sec" :style="calcWidth(skillTotals.sec)">
        <div class="skillText">Security: {{ skillTotals.sec }}</div>
      </div>
      <div class="skillBar med" :style="calcWidth(skillTotals.med)">
        <div class="skillText">Medicine: {{ skillTotals.med }}</div>
      </div>
      <div class="skillBar sci" :style="calcWidth(skillTotals.sci)">
        <div class="skillText">Science: {{ skillTotals.sci }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillGraph',
  props: {
    graphTitle: String,
    skillTotals: Object,
  },
  methods: {
    calcWidth(skill) {
      var width = (skill / Math.max(...Object.values(this.$props.skillTotals))) * 100;
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
  height: 350px;
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
