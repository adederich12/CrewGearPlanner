const defaults = {
    rarity: [4,5],
    includeFullyCited: true,
    includeMaxLevel: true,
    includeProjected: true,
    includeUnowned: true,
    skills: [],
    sort: 'tier',
    limit: 1000,
}

const state = () => ({
    controlValues: defaults
})

const getters = {
    rarity (state) {
        return state.controlValues.rarity
    },
    includeFullyCited (state) {
        return state.controlValues.includeFullyCited
    },
    includeMaxLevel (state) {
        return state.controlValues.includeMaxLevel
    },
    includeProjected (state) {
        return state.controlValues.includeProjected
    },
    includeUnowned (state) {
        return state.controlValues.includeUnowned
    },
    skills (state) {
        return state.controlvalues.skills
    },
    sort (state) {
        return state.controlValues.sort
    },
    limit (state) {
        return state.controlValues.limit
    }
}

const actions = {
    optionConfig ({ commit }, payload) {
        commit('setOption', payload)
    }
}

const mutations = {
    setOption (state, payload) {
        state.controlValues[payload.option] = payload.value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}