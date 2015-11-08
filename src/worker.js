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
    fixed({skill, difficulty, bonus}){
        return skillCheck({skill, difficulty, bonus});
    },

    mining({skill, difficulty, pick_ql, pick_skill}){
        var bonus = skillCheck({pick_skill, ql: pick_ql, difficulty}) / 5;
        return skillCheck({skill, difficulty, bonus, ql: pick_ql});
        return power;
    },

    mining_ql({skill, difficulty, pick_ql, pick_skill, pick_rarity, vein_ql, imbue}){
        var power = Math.max(1.0, calculator.mining({skill, difficulty, pick_ql, pick_skill}));

        var imbueEnhancement = 1.0 + 0.23047 * imbue / 100;
        if (skill * imbueEnhancement < power){
            power = skill * imbueEnhancement;
        }

        var max = Math.min(100, 20 + vein_ql * imbueEnhancement);
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
                if (((path_level * 10 - skill) > 30) && skill <= 90) {
                    difficulty = (1 + path_level * 3);
                } else {
                    difficulty = (1 + path_level * 10);
                }
            }

        }
        var nature_bonus = rollGaussian(nature_skill, difficulty) / 10;
        var bonus = Math.max(0, nature_bonus);

        var effective_medi_skill = effectiveWithItem(skill, rug_ql, bonus);
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
        if (tool_rarity > 0){
            itq = calcRareQuality(itq, tool_rarity);
        }
        return Math.max(1.0, itq);
    },

    woodcutting_ql({skill, difficulty, hatchet_ql, hatchet_skill, imbue, hatchet_rarity}){
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

            var power = skillCheck({skill, difficulty: ql, ql: tool_ql});

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
    }
}


function getData({kind, count, params}){
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
        power = Math.round(power);
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
