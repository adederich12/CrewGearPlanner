import allCrew from './data/botcrew'
import playerData from './data/player'

const state = () => ({
    crew: [],
    playerBuffs: {},
})

const getters = {
    allCrew (state) {
        return state.crew
    }
}

function getCoreSum(total, subSkill) {
    return total + parseInt(subSkill.core);
}

function getProficiencySum(total, subSkill) {
    return total + parseInt(subSkill.range_max);
}

function checkFilters(options, crew) {
    var crewSkills = Object.keys(crew.base_skills).map(skillName => skillName.substring(0,3));
    var matchesFullyCited = options.includeFullyCited ? true : crew.rarity !== crew.max_rarity;
    var matchesMaxLevel = options.includeMaxLevel ? true : crew.level !== 100;
    var matchesRarity = options.rarity.includes(crew.max_rarity);
    var matchesOwned = options.includeUnowned ? true : crew.owned;
    var matchesSkills = true;

    options.skills.forEach(selectedSkill => {
        if (!crewSkills.includes(selectedSkill)) {
            matchesSkills = false;
        }
    });
            
    return matchesRarity && matchesFullyCited && matchesMaxLevel && matchesSkills && matchesOwned;
}

function applyBuffs(buffSet, skillSet) {
    
    return skillSet;
}

const actions = {
    getCrewList ({ commit, rootState }) {
        var mergedCrew = [];
        var options = rootState.options.controlValues;
        var playerCrew = playerData.player.character.crew;
        
        allCrew.forEach((bookCrew) => {
            var newCrew = Object.assign({}, bookCrew);

            playerCrew.forEach((crew) => {
                if (crew.symbol === newCrew.symbol) {
                    var projectedSkills = newCrew.skill_data.find(skillSet => skillSet.rarity === crew.rarity);
                    newCrew.current_rarity = crew.rarity;
                    newCrew.skills = crew.skills;
                    newCrew.owned = true;
                    newCrew.level = crew.level;
                    newCrew.projected = (projectedSkills && crew.level < 100) ? applyBuffs(playerData.player.character.all_buffs, projectedSkills.base_skills) : null;
                }
            });

            if (checkFilters(options, newCrew)) {
                mergedCrew.push(newCrew);
            }
        });

        mergedCrew.sort((a, b) => {
            const sort = options.sort;
            var compare = 0;
            var compA = null;
            var compB = null;
            
            switch(sort) {
                case 'voyage':
                    compA = parseInt(a.ranks.voyRank);
                    compB = parseInt(b.ranks.voyRank);
                    compare = compA > compB;
                    break;
                case 'gauntlet':
                    compA = parseInt(a.ranks.gauntletRank);
                    compB = parseInt(b.ranks.gauntletRank);
                    compare = compA > compB;
                    break;
                case 'cost':
                    compA = parseInt(a.ranks.chronCostRank);
                    compB = parseInt(b.ranks.chronCostRank);
                    compare = compA > compB;
                    break;
                case 'skill':
                    if (options.includeProjected) {
                        compA = a.projected ? Object.values(a.projected).reduce(getCoreSum, 0) : Object.values(a.skills).reduce(getCoreSum, 0);
                        compB = b.projected ? Object.values(b.projected).reduce(getCoreSum, 0) : Object.values(b.skills).reduce(getCoreSum, 0);
                    } else {
                        compA = Object.values(a.skills).reduce(getCoreSum, 0);
                        compB = Object.values(b.skills).reduce(getCoreSum, 0);
                    }
                    compare = compA < compB;
                    break;
                case 'proficiency':
                    if (options.includeProjected) {
                        compA = a.projected ? Object.values(a.projected).reduce(getProficiencySum, 0) : Object.values(a.skills).reduce(getProficiencySum, 0);
                        compB = b.projected ? Object.values(b.projected).reduce(getProficiencySum, 0) : Object.values(b.skills).reduce(getProficiencySum, 0);
                    } else {
                        compA = Object.values(a.skills).reduce(getProficiencySum, 0);
                        compB = Object.values(b.skills).reduce(getProficiencySum, 0);
                    }
                    compare = compA < compB;
                    break;
                default:
                    compA = parseInt(a.bigbook_tier);
                    compB = parseInt(b.bigbook_tier);
                    compare = compA > compB;
            }

            return compare;
        });

        commit('setCrew', mergedCrew.slice(0, options.limit))
    }
}

const mutations = {
    setCrew (state, crew) {
        state.crew = crew
    },
    setBuffs(state, buffs) {
        state.playerBuffs = buffs
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}