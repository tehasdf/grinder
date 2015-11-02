
const React = window.React;
const ReactDOM = window.ReactDOM;

const {Grid, Row, Col, Input, ProgressBar} = window.ReactBootstrap;
import Reflux from 'reflux';



const worker = new Worker('worker_compiled.js');

worker.addEventListener('message', evt => {
    if (evt.data.message === 'data'){
        gotData(evt.data.data);
    } else if (evt.data.message === 'progress'){
        setProgress(evt.data.progress);
    }

});

function round(val, digits=0){
    var mult = Math.pow(10, digits);
    return Math.round(val * mult) / mult;
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


function drawTheGraph(el, data){
    if (!data){
        return;
    }

    var highest = Math.max.apply(null, data.map(d => d.frequency));

    el.innerHTML = '';
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([0, height]);

    var svg = d3.select(el).append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(10, '%')


    var brush = d3.svg.brush()
        .x(x)
        .on("brush", evt => {
            brushAction(brush.extent())
        });

    x.domain([-100, 105]);
    y.domain([highest * 1.3, 0]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Frequency');

    svg.selectAll('bar')
        .data(data)
        .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.power))
            .attr('width', 3)
            .attr('y', d => y(d.frequency))
            .attr('height', d => (height - y(d.frequency)))
    ;

    svg.append("g")
      .attr("class", "x brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", height + 7);

}





const ParamsActions = Reflux.createActions([
    'setDifficulty',
    'setSkill',
    'setBonus',
    'setCount',
    'setPickQl',
    'setPickSkill',
    'setRakeSkill',
    'setRakeQl',
    'setNatureSkill',
    'setShovelQl',
    'setDiggingSlope',
    'setRugQl',
    'setPathLevel',
    'setMediCooldown'
]);

const recalcAction = Reflux.createAction();
const brushAction = Reflux.createAction();
const setKind = Reflux.createAction();

const countStore = Reflux.createStore({
    listenables: ParamsActions,

    onSetCount(count){
        this.trigger(count)
    },
    getInitialState(){
        return 10000
    }
});

const kindStore = Reflux.createStore({
    init(){
        this.listenTo(setKind, this.onSetKind);
    },
    onSetKind(kind){
        this.trigger(kind)
    },
    getInitialState(){
        return 'fixed'
    }
});


const paramsStore = Reflux.createStore({
    init(){
        this.params = {
            skill: 90,
            bonus: 70,
            difficulty: 60,
            pick_skill: 90,
            pick_ql: 90,
            rake_ql: 90,
            rake_skill: 90,
            nature_skill: 60,
            shovel_ql: 90,
            digging_slope: 0,
            rug_ql: 5,
            path_level: 11,
            medi_cooldown: 0
        };
        var setParam = key => value => {
            this.params[key] = value
            this.trigger(this.params);
        };

        [
            {action: ParamsActions.setDifficulty, key: 'difficulty'},
            {action: ParamsActions.setSkill, key: 'skill'},
            {action: ParamsActions.setBonus, key: 'bonus'},
            {action: ParamsActions.setPickSkill, key: 'pick_skill'},
            {action: ParamsActions.setPickQl, key: 'pick_ql'},
            {action: ParamsActions.setRakeQl, key: 'rake_ql'},
            {action: ParamsActions.setRakeSkill, key: 'rake_skill'},
            {action: ParamsActions.setNatureSkill, key: 'nature_skill'},
            {action: ParamsActions.setShovelQl, key: 'shovel_ql'},
            {action: ParamsActions.setDiggingSlope, key: 'digging_slope'},
            {action: ParamsActions.setPathLevel, key: 'path_level'},
            {action: ParamsActions.setRugQl, key: 'rug_ql'},
            {action: ParamsActions.setMediCooldown, key: 'medi_cooldown'},
        ].map(({action, key}) => {
            this.listenTo(action, setParam(key), setParam(key))
        });
    },

    getInitialState(){
        return this.params;
    }
})

const setProgress = Reflux.createAction();
const gotData = Reflux.createAction();
const progressStore = Reflux.createStore({
    init(){
        this.listenTo(setProgress, this.onSetProgress);
    },
    onSetProgress(kind){
        this.trigger(kind)
    },
    getInitialState(){
        return 0
    }
});



const graphDataStore = Reflux.createStore({
    init(){
        this.params = {};
        this.count = 10000;
        this.kind = 'fixed';

        var setter = key => value => this[key] = value;
        var setParam = key => value => this.params[key] = value;

        this.listenTo(kindStore, setter('kind'), setter('kind'));
        this.listenTo(countStore, setter('count'), setter('count'));

        this.listenTo(paramsStore, setter('params'), setter('params'));

        this.listenTo(recalcAction, this.recalc);
        this.listenTo(gotData, this._gotData);
    },

    recalc(){
        [
            'skill', 'pick_ql', 'pick_skill', 'pick_skill', 'nature_skill',
            'rake_ql', 'rake_skill', 'shovel_ql', 'rug_ql'
        ].map(key => {
            this.params[key] = parseFloat(this.params[key]);
        });
        worker.postMessage({count: this.count, kind: this.kind, params: this.params});
    },

    _gotData(data){
        this.trigger(data);
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

const statsStore = Reflux.createStore({
    init(){
        this.data = [];
        this.brush = null;
        this.listenTo(graphDataStore, this._updateData);
        this.listenTo(brushAction, this._updateBrush);
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


function eventAction(action){
    return evt => action(parseFloat(evt.target.value, 10));
}

const Inputs = React.createClass({
    mixins: [
        Reflux.connect(paramsStore)
    ],

    onSubmit(evt){
        recalcAction();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={2}>
                    <SkillInput skill={this.state.skill} />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="number"
                        label="Difficulty"
                        ref="difficulty"
                        value={this.state.difficulty}
                        onChange={eventAction(ParamsActions.setDifficulty)}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="number"
                        label="Bonus"
                        ref="bonus"
                        value={this.state.bonus}
                        onChange={eventAction(ParamsActions.setBonus)}
                    />
                </Col>
            </Row>
            <Input
                type="submit"
                label=" "
                labelClassName='col-xs-2'
                wrapperClassName='col-xs-2'
            />
        </form>
    }
});

const SkillInput = React.createClass({
    render(){
        return <Input
            type="text"
            label={this.props.label || "Skill"}
            ref="skill"
            value={this.props.skill}
            onChange={evt => ParamsActions.setSkill(evt.target.value)}
        />
    }
});

const MiningInputs = React.createClass({
    mixins: [
        Reflux.connect(paramsStore)
    ],

    onSubmit(evt){
        recalcAction();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={2}>
                    <SkillInput label="Mining skill" skill={this.state.skill} />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        label="Pickaxe ql"
                        type="text"
                        value={this.state.pick_ql}
                        onChange={evt => ParamsActions.setPickQl(evt.target.value)}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="text"
                        label="Pickaxe skill"
                        value={this.state.pick_skill}
                        onChange={evt => ParamsActions.setPickSkill(evt.target.value)}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="select"
                        label="vein difficulty"
                        ref="bonus"
                        value={this.state.difficulty}
                        onChange={eventAction(ParamsActions.setDifficulty)}
                    >
                        <option value="2">2 (Rock/zinc)</option>
                        <option value="3">3 (Iron)</option>
                        <option value="10">10 (Tin)</option>
                        <option value="20">20 (Copper/slate/lead)</option>
                        <option value="35">35 (Silver)</option>
                        <option value="40">40 (Gold/reinforced/marble)</option>
                        <option value="55">55 (Glimmersteel)</option>
                        <option value="60">60 (Adamantine)</option>
                    </Input>
                </Col>
            </Row>
            <Input
                type="submit"
                label=" "
                labelClassName='col-xs-2'
                wrapperClassName='col-xs-2'
            />
        </form>
    }
});


const FarmingInputs = React.createClass({
    mixins: [
        Reflux.connect(paramsStore)
    ],

    onSubmit(evt){
        recalcAction();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={2}>
                    <SkillInput label="Farming skill" skill={this.state.skill} />
                </Col>

                <Col mdOffset={1} md={2}>
                    <Input
                        label="Nature skill"
                        type="text"
                        value={this.state.nature_skill}
                        onChange={evt => ParamsActions.setNatureSkill(evt.target.value)}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="select"
                        label="crop difficulty"
                        ref="bonus"
                        value={this.state.difficulty}
                        onChange={eventAction(ParamsActions.setDifficulty)}
                    >
                        <option value="4">4 (Potato)</option>
                        <option value="7">7 (Cotton)</option>
                        <option value="10">10 (Wemp/rye)</option>
                        <option value="15">15 (Oat/pumpkin)</option>
                        <option value="20">20 (Reed/barley)</option>
                        <option value="30">30 (Wheat)</option>
                        <option value="40">40 (Corn)</option>
                        <option value="60">60 (Onion/strawberries)</option>
                        <option value="70">70 (Garlic)</option>
                        <option value="80">80 (Rice)</option>
                    </Input>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <Input
                        label="Rake ql"
                        type="text"
                        value={this.state.rake_ql}
                        onChange={evt => ParamsActions.setRakeQl(evt.target.value)}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        label="Rake skill"
                        type="text"
                        value={this.state.rake_skill}
                        onChange={evt => ParamsActions.setRakeSkill(evt.target.value)}
                    />
                </Col>
            </Row>
            <Input
                type="submit"
                label=" "
                labelClassName='col-xs-2'
                wrapperClassName='col-xs-2'
            />
        </form>
    }
});

const DiggingInputs = React.createClass({
    mixins: [
        Reflux.connect(paramsStore)
    ],

    onSubmit(evt){
        recalcAction();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={2}>
                    <SkillInput label="Digging skill" skill={this.state.skill} />
                </Col>

                <Col mdOffset={1} md={2}>
                    <Input
                        label="Shovel ql"
                        type="text"
                        value={this.state.shovel_ql}
                        onChange={evt => ParamsActions.setShovelQl(evt.target.value)}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="number"
                        label="Slope"
                        value={this.state.digging_slope}
                        onChange={eventAction(ParamsActions.setDiggingSlope)}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="select"
                        label="Tile difficulty"
                        ref="bonus"
                        value={this.state.difficulty}
                        onChange={eventAction(ParamsActions.setDifficulty)}
                    >
                        <option value="0">0 (Dirt)</option>
                        <option value="10">10 (Sand/moss)</option>
                        <option value="20">20 (Clay/tundra)</option>
                        <option value="30">30 (Marsh)</option>
                        <option value="35">35 (Tar)</option>
                        <option value="40">40 (Steppe)</option>

                    </Input>
                </Col>
            </Row>
            <Input
                type="submit"
                label=" "
                labelClassName='col-xs-2'
                wrapperClassName='col-xs-2'
            />
        </form>
    }
});

const MeditationInputs = React.createClass({
    mixins: [
        Reflux.connect(paramsStore)
    ],

    onSubmit(evt){
        recalcAction();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={2}>
                    <SkillInput label="Meditating skill" skill={this.state.skill} />
                </Col>

                <Col mdOffset={1} md={2}>
                    <Input
                        label="Rug ql"
                        type="text"
                        value={this.state.rug_ql}
                        onChange={evt => ParamsActions.setRugQl(evt.target.value)}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="number"
                        label="Level on path"
                        value={this.state.path_level}
                        onChange={eventAction(ParamsActions.setPathLevel)}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="checkbox"
                        label="Has level up cooldown?"
                        value={this.state.medi_cooldown}
                        onChange={evt => ParamsActions.setMediCooldown(evt.target.checked)}
                    />
                </Col>
            </Row>
            <Input
                type="submit"
                label=" "
                labelClassName='col-xs-2'
                wrapperClassName='col-xs-2'
            />
        </form>
    }
});
function formatFreqCount({freq, count}){
    return <dd>{Math.round(10000 * freq) / 100}% ({count})</dd>
}

const Stats = React.createClass({
    mixins: [
        Reflux.connect(statsStore, 'stats'),
        Reflux.connect(brushAction, 'brush')
    ],

    render(){
        return <div className="well"><dl className='dl-horizontal'>
            {
                (this.state.stats && this.state.stats.skillgain)
                ? <div><dt>skillgain</dt>{formatFreqCount(this.state.stats.skillgain)}</div>
                : null
            }
            {
                (this.state.stats && this.state.stats.top)
                ? <div><dt>90+</dt>{formatFreqCount(this.state.stats.top)}</div>
                : null
            }
            {
                (this.state.stats && this.state.stats.mean)
                ? <div><dt>Mean</dt><dd>{Math.round(100 * this.state.stats.mean)/100}</dd></div>
                : null
            }
            {
                (this.state.brush)
                ? <div>
                    <dt>Selected {Math.round(this.state.brush[0])} - {Math.round(this.state.brush[1])}</dt>
                    {formatFreqCount(this.state.stats.selected)}
                </div>
                : null
            }
        </dl></div>
    }
});


class BarGraph {
    constructor(){}

    init(el, props, data){
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select(el).append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append('g')
                .append('g')
                    .attr('class', 'bars');

        this.update(el, data);
    }

    _scales(el, data){
        var highest = Math.max.apply(null, data.map(d => d.frequency));
        var width = el.offsetWidth;
        var height = el.offsetHeight;
        var x = d3.scale.linear()
            .range([0, width])
            .domain([-100, 105]);


        var y = d3.scale.linear()
            .range([0, height])
            .domain([highest * 1.3, 0]);

        return {x, y};
    }


    update(el, data){
        if (!data){
            return;
        }
        var scales = this._scales(el, data);
        this._draw(el, scales, data);
    }

    _draw(el, {x, y}, data){

        var g = d3.select(el).selectAll('.bars');

        var bar = g.selectAll('.bar')
            .data(data);


        var height = y.range()[1];
        bar.enter().append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.power))
                .attr('width', 3)
                .attr('y', d => y(d.frequency))
                .attr('height', d => (height - y(d.frequency)));

        bar.exit().remove();
    }

    destroy(){

    }
}

const barGraph = new BarGraph();

const Graph = React.createClass({
    mixins: [
        Reflux.connect(graphDataStore, 'data')
    ],

    componentDidUpdate(){
        var el = ReactDOM.findDOMNode(this);
        drawTheGraph(el, this.state.data);
    },

    render(){
        return <div />;
    }
});



const App = React.createClass({
        mixins: [
        Reflux.connect(countStore, 'count'),
        Reflux.connect(kindStore, 'kind'),
        Reflux.connect(progressStore, 'progress')
    ],

    _changeKind(evt){
        setKind(evt.target.value);
    },

    render(){
        var input = {
            fixed: <Inputs />,
            mining: <MiningInputs />,
            farming: <FarmingInputs />,
            digging: <DiggingInputs />,
            meditation: <MeditationInputs />
        }[this.state.kind];
        var now = Math.round((this.state.progress * 10000) / 100);
        return <Grid>
            <Row>
                <Col md={3}>
                    <h1>Grinder</h1>
                </Col>

                <Col md={4}>
                    <Input type="select" label="Simulation kind" onChange={this._changeKind}>
                        <option value="fixed">Fixed bonus (channeling)</option>
                        <option value="mining">Mining</option>
                        <option value="farming">Farming</option>
                        <option value="digging">Digging</option>
                        <option value="meditation">Meditation</option>
                    </Input>
                </Col>

                <Col md={4}>
                    <Input
                        type='number'
                        label='Iteration count for the simulation'
                        ref="count"
                        value={this.state.count}
                        onChange={eventAction(ParamsActions.setCount)}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    {input}
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    {(now > 0 && now < 100) ? (<span>Simulating... {now}%</span> ): null}
                    <Stats />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Graph />
                </Col>
            </Row>
        </Grid>;
    }
})


window.addEventListener('DOMContentLoaded', evt => {
    d3 = window.d3;
    ReactDOM.render(<App />, document.getElementById('main'));
});
