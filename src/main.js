



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



import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Input} from 'react-bootstrap';
import Reflux from 'reflux';


const ParamsActions = Reflux.createActions([
    'setDifficulty',
    'setSkill',
    'setBonus',
    'setCount'
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

const difficultyStore = Reflux.createStore({
    listenables: ParamsActions,
    onSetDifficulty(count){
        this.trigger(count)
    },
    getInitialState(){
        return 60
    }
});


const bonusStore = Reflux.createStore({
    listenables: ParamsActions,
    onSetBonus(count){
        this.trigger(count)
    },
    getInitialState(){
        return 70
    }
});


const skillStore = Reflux.createStore({
    listenables: ParamsActions,
    onSetSkill(count){
        this.trigger(count)
    },
    getInitialState(){
        return 90
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
        var setter = key => value => this.params[key] = value;

        this.listenTo(skillStore, setter('skill'), setter('skill'));
        this.listenTo(bonusStore, setter('bonus'), setter('bonus'));
        this.listenTo(difficultyStore, setter('difficulty'), setter('difficulty'));
        this.listenTo(countStore, setter('count'), setter('count'));

        this.listenTo(recalcAction, this.recalc);
        this.listenTo(gotData, this._gotData);
    },

    recalc(){
        worker.postMessage(this.params);
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
            selected: this.brush ? sumValues(this.data, this.brush) : [],
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
        Reflux.connect(difficultyStore, 'difficulty'),
        Reflux.connect(skillStore, 'skill'),
        Reflux.connect(bonusStore, 'bonus')
    ],

    onSubmit(evt){
        recalcAction();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={3}>

                </Col>

            </Row>
            <Row>
                <Col md={2}>
                    <Input
                        type="text"
                        label="Skill"
                        ref="skill"
                        value={this.state.skill}
                        onChange={eventAction(ParamsActions.setSkill)}
                    />
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


const MiningInputs = React.createClass({
    mixins: [
        Reflux.connect(difficultyStore, 'difficulty'),
        Reflux.connect(skillStore, 'skill'),
        Reflux.connect(bonusStore, 'bonus')
    ],

    onSubmit(evt){
        recalcAction();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={3}>

                </Col>

            </Row>
            <Row>
                <Col md={2}>
                    <Input
                        type="text"
                        label="Skill"
                        ref="skill"
                        value={this.state.skill}
                        onChange={eventAction(ParamsActions.setSkill)}
                    />
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
                        label="vein kind"
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

function formatFreqCount({freq, count}){
    return <dd>{Math.round(10000 * freq) / 100}% ({count})</dd>
}

const Stats = React.createClass({
    mixins: [
        Reflux.connect(statsStore, 'stats'),
        Reflux.connect(brushAction, 'brush')
    ],

    render(){
        var children = [];

        if (this.state.stats && this.state.stats.skillgain){
            children.push(<dt>Skillgain</dt>);
            children.push(formatFreqCount(this.state.stats.skillgain));
        }
        if (this.state.stats && this.state.stats.top){
            children.push(<dt>90+</dt>);
            children.push(formatFreqCount(this.state.stats.top));
        }
        if (this.state.stats && this.state.stats.mean){
            children.push(<dt>Mean</dt>);
            children.push(<dd>{Math.round(100 * this.state.stats.mean)/100}</dd>);
        }
        if (this.state.brush){
            let [a, b] = this.state.brush;
            children.push(
                <dt>Selected {Math.round(a)} - {Math.round(b)}</dt>
            )
            children.push(formatFreqCount(this.state.stats.selected))
        }
        return <div className="well"><dl className='dl-horizontal'>
            {children}
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
    componentDidMount(){
        var el = ReactDOM.findDOMNode(this);
        // barGraph.init(el, {}, this.state.data);
    },

    componentDidUpdate(){
        var el = ReactDOM.findDOMNode(this);
        drawTheGraph(el, this.state.data);
    },

    componentWillUnmount(){
        var el = ReactDOM.findDOMNode(this);
        // barGraph.destroy(el, this.state.data);
    },

    render(){
        return <div />;
    }
});



const App = React.createClass({
        mixins: [
        Reflux.connect(countStore, 'count'),
        Reflux.connect(kindStore, 'kind'),
    ],

    _changeKind(evt){
        setKind(evt.target.value);
    },

    render(){
        console.log('xd', this.state.kind)
        var input = {
            fixed: <Inputs />,
            mining: <MiningInputs />
        }[this.state.kind];

        return <Grid>
            <Row>
                <Col md={3}>
                    <h1>Grinder</h1>
                </Col>

                <Col md={4}>
                    <Input type="select" label="Simulation kind" onChange={this._changeKind}>
                        <option value="fixed">Fixed bonus (channeling)</option>
                        <option value="mining">Mining</option>
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
