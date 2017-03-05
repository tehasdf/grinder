import gaussian from 'gaussian';


function normal(mean, std){
    var _distribution = gaussian(mean, std);
    return _distribution.ppf(Math.random());
}

const _stdNorm = gaussian(0, 1);
function standardNormal(){
    return _stdNorm.ppf(Math.random())
}


function effectiveSkill(skill, bonus){
    if (bonus > 70){
        bonus = 70;
    }
    var linearMax = (100 + skill) / 2;
    var diffToMaxChange = Math.min(skill, linearMax - skill);
    var newBon = diffToMaxChange * bonus / 100;
    skill += newBon;
    return skill;
}

function effectiveWithItem(skill, ql, bonus){
    if (bonus > 70){
        bonus = 70;
    }
    var bonusSkill, linearMax;

    if (ql < skill){
        bonusSkill = (skill + ql) / 2;
    } else {
        linearMax = ql - skill;
        bonusSkill = skill + skill * linearMax / 100;
    }

    if (bonus > 0){
        linearMax = (100 + bonusSkill) / 2;
        var diffToMaxChange = Math.min(bonusSkill, linearMax - bonusSkill);
        var newBon = diffToMaxChange * bonus / 100;
        bonusSkill += newBon;
    }
    return bonusSkill;
}
const mobsTaming = {'Sheep': {'sstr': 10.0, 'cr': 1.0, 'sum': 11.0}, 'EpiphanyVynora': {'sstr': 80.0, 'cr': 96.0, 'sum': 176.0}, 'Horse': {'sstr': 22.0, 'cr': 6.0, 'sum': 28.0}, 'DragonGreen': {'sstr': 60.0, 'cr': 100.0, 'sum': 160.0}, 'DrakeSpirit': {'sstr': 80.0, 'cr': 27.0, 'sum': 107.0}, 'DeathCrawlerMinion': {'sstr': 30.0, 'cr': 14.0, 'sum': 44.0}, 'HellHound': {'sstr': 60.0, 'cr': 14.0, 'sum': 74.0}, 'SantaClaus': {'sstr': 99.0, 'cr': 99.0, 'sum': 198.0}, 'DrakeBlack': {'sstr': 55.0, 'cr': 98.0, 'sum': 153.0}, 'LionMountain': {'sstr': 25.0, 'cr': 3.0, 'sum': 28.0}, 'Guide': {'sstr': 99.0, 'cr': 99.0, 'sum': 198.0}, 'RatLarge': {'sstr': 15.0, 'cr': 2.0, 'sum': 17.0}, 'DrakeBlue': {'sstr': 60.0, 'cr': 95.0, 'sum': 155.0}, 'Tortoise': {'sstr': 30.0, 'cr': 12.0, 'sum': 42.0}, 'CaveBug': {'sstr': 40.0, 'cr': 5.0, 'sum': 45.0}, 'Bison': {'sstr': 10.0, 'cr': 4.0, 'sum': 14.0}, 'AvengerOfLight': {'sstr': 80.0, 'cr': 76.0, 'sum': 156.0}, 'ManifestationFo': {'sstr': 50.0, 'cr': 86.0, 'sum': 136.0}, 'GuardDecent': {'sstr': 15.0, 'cr': 99.0, 'sum': 114.0}, 'DemonSol': {'sstr': 50.0, 'cr': 14.0, 'sum': 64.0}, 'Pheasant': {'sstr': 10.0, 'cr': 1.0, 'sum': 11.0}, 'Skeleton': {'sstr': 10.0, 'cr': 8.0, 'sum': 18.0}, 'BearBrown': {'sstr': 30.0, 'cr': 9.0, 'sum': 39.0}, 'Ram': {'sstr': 20.0, 'cr': 5.0, 'sum': 25.0}, 'Pig': {'sstr': 10.0, 'cr': 2.0, 'sum': 12.0}, 'GuardAble': {'sstr': 19.0, 'cr': 99.0, 'sum': 118.0}, 'Wraith': {'sstr': 19.0, 'cr': 24.0, 'sum': 43.0}, 'LadyLake': {'sstr': 90.0, 'cr': 99.0, 'sum': 189.0}, 'Scorpion': {'sstr': 40.0, 'cr': 8.0, 'sum': 48.0}, 'Hen': {'sstr': 5.0, 'cr': 1.0, 'sum': 6.0}, 'GuardBrutal': {'sstr': 30.0, 'cr': 23.0, 'sum': 53.0}, 'Bull': {'sstr': 10.0, 'cr': 4.0, 'sum': 14.0}, 'Worg': {'sstr': 20.0, 'cr': 14.0, 'sum': 34.0}, 'GoblinLeader': {'sstr': 60.0, 'cr': 68.0, 'sum': 128.0}, 'ForestGiant': {'sstr': 60.0, 'cr': 76.0, 'sum': 136.0}, 'HellHorse': {'sstr': 72.0, 'cr': 9.0, 'sum': 81.0}, 'SonOfNogump': {'sstr': 30.0, 'cr': 6.0, 'sum': 36.0}, 'Octopus': {'sstr': 40.0, 'cr': 9.0, 'sum': 49.0}, 'Spider': {'sstr': 40.0, 'cr': 10.0, 'sum': 50.0}, 'Crocodile': {'sstr': 65.0, 'cr': 9.0, 'sum': 74.0}, 'Anadonda': {'sstr': 30.0, 'cr': 13.0, 'sum': 43.0}, 'LavaSpider': {'sstr': 40.0, 'cr': 13.0, 'sum': 53.0}, 'GuardSpiritGoodLenient': {'sstr': 15.0, 'cr': 6.0, 'sum': 21.0}, 'BoarFo': {'sstr': 34.0, 'cr': 14.0, 'sum': 48.0}, 'Salesman': {'sstr': 99.0, 'cr': 70.0, 'sum': 169.0}, 'Lamb': {'sstr': 5.0, 'cr': 1.0, 'sum': 6.0}, 'LavaCreature': {'sstr': 90.0, 'cr': 16.0, 'sum': 106.0}, 'GuardTough': {'sstr': 19.0, 'cr': 20.0, 'sum': 39.0}, 'GuideHots': {'sstr': 99.0, 'cr': 99.0, 'sum': 198.0}, 'CatWild': {'sstr': 20.0, 'cr': 2.0, 'sum': 22.0}, 'KingCobra': {'sstr': 99.0, 'cr': 87.0, 'sum': 186.0}, 'HellScorpion': {'sstr': 70.0, 'cr': 18.0, 'sum': 88.0}, 'EagleSpirit': {'sstr': 50.0, 'cr': 15.0, 'sum': 65.0}, 'Foal': {'sstr': 5.0, 'cr': 3.0, 'sum': 8.0}, 'SpawnUttacha': {'sstr': 4.0, 'cr': 12.0, 'sum': 16.0}, 'Zombie': {'sstr': 20.0, 'cr': 8.0, 'sum': 28.0}, 'BlueWhale': {'sstr': 40.0, 'cr': 18.0, 'sum': 58.0}, 'GuardSpiritAble': {'sstr': 19.0, 'cr': 8.0, 'sum': 27.0}, 'BlackWolf': {'sstr': 20.0, 'cr': 6.0, 'sum': 26.0}, 'Bartender': {'sstr': 99.0, 'cr': 79.0, 'sum': 178.0}, 'MagranonJuggernaut': {'sstr': 20.0, 'cr': 96.0, 'sum': 116.0}, 'SealCub': {'sstr': 10.0, 'cr': 1.0, 'sum': 11.0}, 'DragonWhite': {'sstr': 70.0, 'cr': 100.0, 'sum': 170.0}, 'DrakeGreen': {'sstr': 50.0, 'cr': 96.0, 'sum': 146.0}, 'Dolphin': {'sstr': 40.0, 'cr': 9.0, 'sum': 49.0}, 'Rooster': {'sstr': 10.0, 'cr': 1.0, 'sum': 11.0}, 'HyenaLabila': {'sstr': 40.0, 'cr': 14.0, 'sum': 54.0}, 'Troll': {'sstr': 39.0, 'cr': 12.0, 'sum': 51.0}, 'EvilSanta': {'sstr': 99.0, 'cr': 99.0, 'sum': 198.0}, 'IncarnationLibila': {'sstr': 40.0, 'cr': 86.0, 'sum': 126.0}, 'GuardSpiritEvilLenient': {'sstr': 15.0, 'cr': 6.0, 'sum': 21.0}, 'SharkHuge': {'sstr': 40.0, 'cr': 12.0, 'sum': 52.0}, 'BrownCow': {'sstr': 10.0, 'cr': 1.0, 'sum': 11.0}, 'Crab': {'sstr': 20.0, 'cr': 5.0, 'sum': 25.0}, 'DragonRed': {'sstr': 60.0, 'cr': 100.0, 'sum': 160.0}, 'DrakeRed': {'sstr': 40.0, 'cr': 95.0, 'sum': 135.0}, 'EasterBunny': {'sstr': 20.0, 'cr': 50.0, 'sum': 70.0}, 'Calf': {'sstr': 5.0, 'cr': 3.0, 'sum': 8.0}, 'BearBlack': {'sstr': 30.0, 'cr': 9.0, 'sum': 39.0}, 'TrollKing': {'sstr': 45.0, 'cr': 86.0, 'sum': 131.0}, 'DragonBlue': {'sstr': 60.0, 'cr': 100.0, 'sum': 160.0}, 'Unicorn': {'sstr': 60.0, 'cr': 11.0, 'sum': 71.0}, 'Goblin': {'sstr': 26.0, 'cr': 6.0, 'sum': 32.0}, 'Kid': {'sstr': 5.0, 'cr': 3.0, 'sum': 8.0}, 'Dog': {'sstr': 15.0, 'cr': 3.0, 'sum': 18.0}, 'DrakeWhite': {'sstr': 35.0, 'cr': 95.0, 'sum': 130.0}, 'SeaSerpent': {'sstr': 80.0, 'cr': 76.0, 'sum': 156.0}, 'Deer': {'sstr': 10.0, 'cr': 2.0, 'sum': 12.0}, 'Seal': {'sstr': 10.0, 'cr': 7.0, 'sum': 17.0}, 'GuardLenient': {'sstr': 15.0, 'cr': 99.0, 'sum': 114.0}, 'Cyclops': {'sstr': 55.0, 'cr': 86.0, 'sum': 141.0}, 'Chicken': {'sstr': 5.0, 'cr': 1.0, 'sum': 6.0}, 'DragonBlack': {'sstr': 70.0, 'cr': 100.0, 'sum': 170.0}, 'GorillaMagranon': {'sstr': 30.0, 'cr': 14.0, 'sum': 44.0}}

function rollGaussian(skill, difficulty){
    var slide = ((Math.pow(skill, 3) - Math.pow(difficulty, 3)) / 50000) + (skill - difficulty);
    var w = 30 - Math.abs(skill - difficulty) / 4;

    var attempts = 0;
    var result = 0;
    while (true){
        result = standardNormal() * (w + Math.abs(slide) / 6) + slide;
        var rejectCutoff = standardNormal() * (w - Math.abs(slide) / 6) + slide;
        if (slide > 0){
            if (result > (rejectCutoff + Math.max(100 - slide, 0))){
                result = -1000;
            }
        } else if (result < (rejectCutoff - Math.max(100 + slide, 0))){
            result = -1000;
        }
        attempts += 1;
        if (attempts === 100){
            if (result > 100){
                return 90 + Math.random() * 5;
            }
            if (result < -100){
                return -90 - Math.random() * 5;
            }
        }

        if (result > -100 && result < 100){
            break;
        }
    }
    return result;
}


function skillCheck({difficulty, skill, ql, bonus}){
    bonus = bonus || 0;
    var effective;
    if (ql === undefined){
        effective = effectiveSkill(skill, bonus);
    } else {
        effective = effectiveWithItem(skill, ql, bonus);
    }
    return rollGaussian(effective, difficulty);
}

function calcRareQuality(power, bonus){
    return _rareQuality(power, bonus, 3, 100.0);
}

function calcOreRareQuality(power, bonus){
    var fiddle = 108.428;
    var numbBonus = 2;
    return _rareQuality(power, bonus, numbBonus, fiddle);
}

function _rareQuality(power, bonus, numbBonus, fiddle){
    if (bonus > 0){
        var val = fiddle - power;
        var square = val * val;
        var n = square / 1000;
        var mod = Math.min(n * 1.25, 1.0);
        bonus = bonus * 3 / numbBonus * mod;
    }
    return Math.max(Math.min(99.999, power + bonus), 1);

}

const calculator = {
    fixed({skill, difficulty, bonus, ql}){
        if (ql === 0){
            ql = undefined;
        }
        return skillCheck({skill, difficulty, bonus, ql});
    },

    mining({skill, difficulty, pick_ql, pick_skill}){
        var bonus = skillCheck({skill: pick_skill, ql: pick_ql, difficulty}) / 5;
        return skillCheck({skill, difficulty, bonus, ql: pick_ql});
        return power;
    },

    mining_ql({skill, difficulty, pick_ql, pick_skill, pick_rarity, vein_ql, imbue, rune}){
        var power = Math.max(1.0, calculator.mining({skill, difficulty, pick_ql, pick_skill}));

        var imbueEnhancement = 1.0 + 0.23047 * imbue / 100;
        if (skill * imbueEnhancement < power){
            power = skill * imbueEnhancement;
        }

        var max = Math.min(100, 20 + vein_ql * imbueEnhancement * (1 + rune) + pick_rarity);
        power = Math.min(power, max);
        var orePower = calcOreRareQuality(power, pick_rarity);
        return orePower;
    },

    farming({skill, difficulty, rake_ql, rake_skill, nature_skill}){
        var bonus = skillCheck({skill: rake_skill, ql: rake_ql, difficulty});
        var nature_bonus = rollGaussian(nature_skill, difficulty) / 10;
        bonus += Math.max(0, nature_bonus);

        return skillCheck({skill, ql: rake_ql, difficulty, bonus});
    },

    digging({skill, difficulty, digging_slope, shovel_ql}){
        difficulty += (1 + digging_slope / 5);

        var effective_digging = effectiveWithItem(skill, shovel_ql, 0);
        var power = rollGaussian(effective_digging, difficulty);
        return power;

    },

    meditation({skill, rug_ql, path_level, nature_skill, medi_cooldown, medi_tile}){
        var difficulty = 5;

        if (medi_tile){
            difficulty = 10;
            if (!medi_cooldown){
                if ((path_level * 10 - skill < 30) || (skill > 90)) {
                    difficulty = (1 + path_level * 10);
                } else {
                    difficulty = (1 + path_level * 3);
                }
            }

        }
        var nature_bonus = rollGaussian(nature_skill, difficulty) / 10;
        var bonus = Math.max(0, nature_bonus);

        return skillCheck({skill, ql: rug_ql, bonus, difficulty});
    },

    creation({skill, difficulty, tool_ql, tool_skill, material_ql, imbue, tool_rarity, parent_skill}){
        var bonus = 0;
        if (tool_skill > 0){
            bonus += Math.max(-10, rollGaussian(tool_skill, difficulty));
        }
        if (parent_skill > 0){
            bonus += Math.max(0, rollGaussian(parent_skill, difficulty) / 10);
        }
        var power = skillCheck({skill, ql: tool_ql, bonus, difficulty});
        var imbueEnhancement = 1.0 + 0.23047 * imbue / 100;
        var itq = power * imbueEnhancement;
        if (material_ql < itq){
            itq = Math.max(1.0, material_ql);
        }
        if (tool_rarity > 0 && power > 0){
            itq = calcRareQuality(itq, tool_rarity);
        }
        return itq;
    },

    woodcutting_ql({skill, difficulty, hatchet_ql, hatchet_skill, imbue}){
        var hatchet_bonus = skillCheck({difficulty, skill: hatchet_skill, ql: hatchet_ql});
        var bonus = Math.max(0, hatchet_bonus);

        var ql = skillCheck({difficulty, skill, ql: hatchet_ql, bonus});
        ql = Math.max(1, ql);
        var imbueEnhancement = 1 + 0.23047 * imbue / 100;
        var woodc = skill * imbueEnhancement;
        if (woodc < ql){
            ql = woodc;
        }
        if (ql === 1){
            ql = Math.max(skill, 1 + Math.random() * 10 * imbueEnhancement);
        }
        return ql;
    },

    imping({skill, target_ql, tool_ql, tool_skill, parent_skill}){
        var bonus = 0;
        if (tool_skill > 0){
            bonus += Math.max(0, skillCheck({skill: tool_skill, ql: tool_ql, difficulty: target_ql}));
        }
        if (parent_skill > 0){
            bonus += Math.max(0, skillCheck({skill: parent_skill, difficulty: target_ql}) / 10);
        }

        return skillCheck({skill, difficulty: target_ql, ql: tool_ql, bonus});
    },

    smithing_ql({skill, start_ql, target_ql, target_rarity, pelt_ql, pelt_imbue, whetstone_ql, whetsone_imbue,
            hammer_ql, hammer_skill, hammer_imbue, lump_ql, lump_imbue,
            parent_skill, is_double, use_title}){

        var items = [
            {ql: lump_ql, imbue: lump_imbue},
            {ql: hammer_ql, skill: hammer_skill, imbue: hammer_imbue},
            {ql: 100},
            {ql: whetstone_ql, imbue: whetsone_imbue},
            {ql: pelt_ql, imbue: pelt_imbue}
        ];
        var steps = 0;
        var ql = start_ql;
        var highest_ql = start_ql;
        while (true){
            steps++;
            if (steps % 100 == 0 && (ql < start_ql)){
                return -100;
            }
            var item = items[Math.floor(Math.random()*items.length)];
            var tool_ql = item.ql;
            var imbue = item.imbue || 0;
            var tool_skill = item.skill || 0;
            var imbueEnhancement = 1.0 + imbue / 100;
            var improveBonus = 0.23047 * imbueEnhancement;

            var max = skill + (100 - skill) * improveBonus;
            var diff = Math.max(0, max - ql);

            var bonus = Math.max(0, skillCheck({skill: parent_skill, difficulty: ql}) / 10);
            var power = skillCheck({skill, difficulty: ql, ql: tool_ql, bonus});

            var mod = (100 - ql) / 20 / 100 * (Math.random() + Math.random() + Math.random() + Math.random()) / 2;


            if (power < 0){
                continue;
            }

            if (diff < 0){
                mod *= 0.01;
            }
            if (ql < highest_ql){
                mod *= 2;
            }
            if (is_double){
                mod *= 2;
            }
            // if (is_arrow){
            //     mod *= 2;
            // }
            if (use_title){
                mod *= 1.3;
            }
            if (target_rarity > 0){
                mod *= 1 + target_rarity * 0.1;
            }

            var actionPower = mod * Math.max(1, diff);
            ql = Math.min(100, ql + actionPower);
            if (ql > highest_ql){
                highest_ql = ql;
            }
            if (ql >= target_ql){
                break;
            }
        }

        return steps;
    },
    taming({skill, soul, target, modifier, age, is_fo, is_hots, is_tamed}){
        var targetData = mobsTaming[target];
        if (!targetData){
            throw new Error('unknown mob', target);
        }

        var targetSstr = targetData.sstr;
        var targetCR = targetData.cr * modifier * age;
        if (is_tamed){
            targetCR = targetCR / 2;
        }
        if (is_hots){
            targetCR = 20;
        }

        var bonus = Math.max(0, skillCheck({
            skill: soul,
            difficulty: targetSstr + 5,
            bonus: -targetCR
        }));


        if (is_fo){
            bonus += 20;
        }
        return skillCheck({
            skill,
            difficulty: targetSstr + targetCR,
            bonus
        });
    },
    fileting({skill, difficulty, knife_ql, knife_skill, knives_skill, cooking_skill}){
        var knives_bonus = Math.max(0, skillCheck({skill: knives_skill, difficulty: 10}));
        var bonus = skillCheck({skill: knife_skill, difficulty: 10, bonus: knives_bonus / 10});
        bonus += Math.max(0, skillCheck({difficulty, skill: cooking_skill}) / 10);

        return skillCheck({skill, difficulty, bonus, ql: knife_ql});
    },
    forestry({skill, sickle_skill, sickle_ql}){
        let bonus = Math.max(1, skillCheck({difficulty: 1, skill: sickle_skill, ql: sickle_ql}));
        return skillCheck({skill, bonus, ql: sickle_ql, difficulty: skill - 10});
    },
}


function getData({kind, count, params, rounding}){
    var roundFunc = rounding == 'down' ? function(x){ return Math.floor(x); } : function(x){ return Math.round(x); };
    var rolls = {};
    var handler = calculator[kind];
    var step = Math.max(1000, count / 100);
    console.info('params', params);
    setProgress(0);
    for (let i = 0; i < count; i++){
        let power = handler(params);
        if (i % step === 0){
            setProgress(i / count);
        }
        power = roundFunc(power);
        if (rolls[power] === undefined){
            rolls[power] = 0;
        }
        rolls[power] += 1;
    }
    setProgress(1);
    var data = [];
    for (let power of Object.keys(rolls)){
        data.push({power: +power, frequency: rolls[power] / count, count: rolls[power]});
    }
    return data;
}


function setProgress(progress){
    postMessage({message: 'progress', progress})
}

onmessage = function (evt){
    var result = getData(evt.data);
    postMessage({message: 'data', data: result});
}
