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
    },
}

const actions = {
    getTotalStats ({ commit, rootState }) {
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
            var crewSkills = (typeof(crewMember.skills) !== 'undefined') ? crewMember.skills : crewMember.base_skills;
            for (const skill in crewSkills) {
                voyageStats[skill.substring(0, 3)] += crewSkills[skill].core;
                gauntletStats[skill.substring(0, 3)] += crewSkills[skill].range_max;
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
