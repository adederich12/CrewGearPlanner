const defaults = {
    rarity: [4,5],
    includeFullyCited: true,
    includeMaxLevel: true,
    skills: ['com','dip','eng','sec','med','sci'],
    sort: 'tier',
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
    skills (state) {
        return state.controlvalues.skills
    },
    sort (state) {
        return state.controlValues.sort
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