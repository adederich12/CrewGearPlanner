import allCrew from './data/botcrew'
import playerData from './data/player'

const state = () => ({
    crew: [],
})

const getters = {
    allCrew (state) {
        return state.crew
    }
}

const actions = {
    getCrewList ({ commit, rootState }) {
        var mergedCrew = [];
        var options = rootState.options.controlValues;
        var playerCrew = playerData.player.character.crew.filter((o) => {
            var matchesRarity = options.rarity.includes(o.max_rarity);
            var matchesFullyCited = options.includeFullyCited ? true : o.rarity !== o.max_rarity;
            var matchesMaxLevel = options.includeMaxLevel ? true : o.level !== 100;

            return matchesRarity && matchesFullyCited && matchesMaxLevel;
        });

        playerCrew.forEach((crew) => {
            allCrew.forEach((bookCrew) => {
                if (crew.symbol === bookCrew.symbol) {
                    crew.ranks = bookCrew.ranks;
                    crew.tier = bookCrew.bigbook_tier;
                    crew.max_base = bookCrew.base_skills;

                    mergedCrew.push(crew);
                }
            });
        });

        mergedCrew.sort((a, b) => {
            const sort = options.sort;
            var compA = null;
            var compB = null;
            
            switch(sort) {
                case 'voyage':
                    compA = a.ranks.voyRank;
                    compB = b.ranks.voyRank;
                    break;
                case 'gauntlet':
                    compA = a.ranks.gauntletRank;
                    compB = b.ranks.gauntletRank;
                    break;
                case 'cost':
                    compA = a.ranks.chronCostRank;
                    compB = b.ranks.chronCostRank;
                    break;
                default:
                    compA = a.tier;
                    compB = b.tier;
            }

            return compA - compB;
        });

        commit('setCrew', mergedCrew)
    }
}

const mutations = {
    setCrew (state, crew) {
        state.crew = crew
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}