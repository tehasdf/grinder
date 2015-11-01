import gaussian from 'gaussian';


var d3;


function normal(mean, std){
    var _distribution = gaussian(mean, std);
    return _distribution.ppf(Math.random());
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
        diffToMaxChange = Math.min(bonusSkill, linearMax - bonusSkill);
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
        result = normal(0, 1) * (w + Math.abs(slide) / 6) + slide;
        var rejectCutoff = normal(0, 1) * (w - Math.abs(slide) / 6) + slide;
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


function getData({count, skill, difficulty, bonus}){
    var rolls = {};
    [count, skill, difficulty, bonus].map((d, i) => {
        if (typeof(d) !== 'number'){
            throw new Error(`${d} is not a number (${i})`);
        }
    });


    var effective = effectiveSkill(skill, bonus);
    setProgress(0);
    for (let i = 0; i < count; i++){
        let power = rollGaussian(effective, difficulty);
        if (i % 1000 === 0){
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
