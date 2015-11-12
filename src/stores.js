import Reflux from 'reflux';
import actions from './actions';

const worker = new Worker('worker_compiled.js');


worker.addEventListener('message', evt => {
    if (evt.data.message === 'data'){
        actions.gotData(evt.data.data);
    } else if (evt.data.message === 'progress'){
        actions.setProgress(evt.data.progress);
    }

});




export const progressStore = Reflux.createStore({
    init(){
        this.listenTo(actions.setProgress, this.onSetProgress);
    },
    onSetProgress(kind){
        this.trigger(kind)
    },
    getInitialState(){
        return 0
    }
});


export const kindStore = Reflux.createStore({
    init(){
        this.listenTo(actions.setKind, this.onSetKind);
    },
    onSetKind(kind){
        this.trigger(kind)
    },
    getInitialState(){
        return 'fixed'
    }
});

export const paramsStore = Reflux.createStore({
    init(){

        this.params = {
            fixed: {
                skill: 90,
                bonus: 70,
                difficulty: 60,
                ql: 0
            },
            mining: {
                skill: 90,
                difficulty: 40,
                pick_skill: 90,
                pick_ql: 90
            },
            mining_ql: {
                skill: 95,
                difficulty: 3,
                pick_skill: 95,
                pick_rarity: 2,
                pick_ql: 95,
                vein_ql: 79,
                imbue: 100
            },
            farming: {
                skill: 90,
                nature_skill: 60,
                difficulty: 70,
                rake_ql: 90,
                rake_skill: 90
            },
            digging: {
                skill: 90,
                shovel_ql: 90,
                digging_slope: 0,
                difficulty: 60
            },
            meditation: {
                skill: 90,
                rug_ql: 5,
                nature_skill: 70,
                medi_cooldown: false,
                medi_tile: false,
                path_level: 11
            },
            creation: {
                skill: 90,
                tool_ql: 90,
                tool_skill: 0,
                difficulty: 60,
                material_ql: 99,
                imbue: 0,
                tool_rarity: 0,
                parent_skill: 0
            },
            woodcutting_ql: {
                skill: 90,
                hatchet_ql: 90,
                hatchet_skill: 80,
                difficulty: 15,
                imbue: 0,
                hatchet_rarity: 0
            },
            imping: {
                skill: 90,
                target_ql: 90,
                tool_ql: 90,
                tool_skill: 80,
                parent_skill: 80
            },
            smithing_ql: {
                skill: 95,
                start_ql: 70,
                target_ql: 90,
                target_rarity: 0,
                pelt_ql: 95,
                pelt_imbue: 0,
                whetstone_ql: 95,
                whetstone_imbue: 0,
                hammer_ql: 95,
                hammer_skill: 90,
                hammer_imbue: 0,
                lump_ql: 90,
                lump_imbue: 0,
                parent_skill: 85,
                is_double: false,
                use_title: false
            }
        };

        this.kind = 'fixed';

        this.listenTo(actions.setParam, newParams => {
            Object.keys(newParams).forEach(key => {
                this.current[key] = newParams[key];
            });
            this.trigger(this.current);
        });

        var setKind = kind => {
            this.kind = kind;
            this.trigger(this.current);
        };

        this.listenTo(kindStore, setKind, setKind);
    },

    get current(){
        return this.params[this.kind];
    },

    getInitialState(){
        return this.current;
    }
});


export const countStore = Reflux.createStore({
    init(){
        this.listenTo(actions.setCount, this.onSetCount.bind(this));
    },
    onSetCount(count){
        this.trigger(count)
    },
    getInitialState(){
        return 10000
    }
});



function computeMean(data){
    var sumPower = 0;
    var sumCount = 0;
    data.forEach(({power, frequency, count}) => {
        sumPower += power * count;
        sumCount += count;
    })
    return sumPower / sumCount;
}


function sumValues(data, [xFrom, xTo]){
    if (xTo >= 100){
        xTo = 100;
    }
    var totalFreq = 0;
    var totalCount = 0;
    data.forEach(({power, frequency, count}) => {
        if (power >= xFrom && power <= xTo){
            totalFreq += frequency
            totalCount += count;
        }
    });
    return {freq: totalFreq, count: totalCount}
}


export const graphDataStore = Reflux.createStore({
    init(){
        this.params = {};
        this.count = 10000;
        this.kind = 'fixed';

        var setter = key => value => this[key] = value;
        var setParam = key => value => this.params[key] = value;
        this.listenTo(kindStore, setter('kind'), setter('kind'));
        this.listenTo(countStore, setter('count'), setter('count'));

        this.listenTo(paramsStore, setter('params'), setter('params'));

        this.listenTo(actions.recalc, this.recalc);
        this.listenTo(actions.gotData, this._gotData);
    },

    recalc(){
        worker.postMessage({count: this.count, kind: this.kind, params: this.params});
    },

    _gotData(data){
        this.trigger(data);
    }
});


export const statsStore = Reflux.createStore({
    init(){
        this.data = [];
        this.brush = null;
        this.listenTo(graphDataStore, this._updateData);
        this.listenTo(actions.setBrush, this._updateBrush);
    },

    _updateData(data){
        this.data = data;
        this._update();
    },

    _updateBrush(extent){
        this.brush = extent;
        this._update();
    },

    _update(){
        this.trigger({
            skillgain: sumValues(this.data, [0, 40]),
            selected: this.brush ? sumValues(this.data, [Math.round(this.brush[0]), Math.round(this.brush[1])]) : [],
            top: sumValues(this.data, [90, 101]),
            mean: computeMean(this.data)
        });
    }
});
