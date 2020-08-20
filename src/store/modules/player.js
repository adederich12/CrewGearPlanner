const state = () => ({
    playerStats: {
        voyage: {},
        gauntlet: {},
    },
})

const getters = {
    voyageStats (state) {
        return state.playerStats.voyage;
    },
    gauntletStats (state) {
        return state.playerStats.gauntlet;
    }
}

const actions = {
    getVoyageStats ({ commit, rootState }) {
        var crew = rootState.crew.crew;
        var voyageStats = {
            com: 0,
            dip: 0,
            eng: 0,
            sec: 0,
            med: 0,
            sci: 0,
        }
        var gauntletStats = {
            com: 0,
            dip: 0,
            eng: 0,
            sec: 0,
            med: 0,
            sci: 0,
        }

        crew.forEach((crewMember) => {
            for (const skill in crewMember.skills) {
                voyageStats[skill.substring(0, 3)] += crewMember.skills[skill].core;
                gauntletStats[skill.substring(0, 3)] += crewMember.skills[skill].range_max;
            }
        })

        commit('setVoyageStats', voyageStats)
        commit('setGauntletStats', gauntletStats)
    },
}

const mutations = {
    setVoyageStats (state, stats) {
        state.playerStats.voyage = stats
    },
    setGauntletStats (state, stats) {
        state.playerStats.gauntlet = stats
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

//   function addSkillTotals(skills) {
//       for (const skill in skills) {
//           playerSkills.voyage[skill.substring(0, 3)] += skills[skill].core;
//           playerSkills.gauntlet[skill.substring(0, 3)] += skills[skill].range_max;
//       }
//   }