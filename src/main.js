const React = window.React;
const ReactDOM = window.ReactDOM;
const {Grid, Row, Col, Input, ProgressBar} = window.ReactBootstrap;

import Reflux from 'reflux';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import Graph from './graph';
import actions from './actions';

import {statsStore, kindStore, countStore, progressStore, paramsStore} from './stores';
import {act_float, SkillInput, FloatInput} from './inputWidgets';


const Inputs = React.createClass({
    mixins: [
        Reflux.connect(paramsStore),
        PureRenderMixin
    ],

    onSubmit(evt){
        actions.recalc();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={2}>
                    <SkillInput skill={this.state.skill} />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Difficulty'
                        name='difficulty'
                        value={this.state.difficulty}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Bonus'
                        name='bonus'
                        value={this.state.bonus}
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
        Reflux.connect(paramsStore),
        PureRenderMixin
    ],

    onSubmit(evt){
        actions.recalc();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={2}>
                    <SkillInput label="Mining skill" skill={this.state.skill} />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Pickaxe ql'
                        name='pick_skill'
                        value={this.state.pick_skill}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Pickaxe ql'
                        name='pick_ql'
                        value={this.state.pick_ql}
                    />

                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="select"
                        label="vein difficulty"
                        ref="bonus"
                        value={this.state.difficulty}
                        onChange={act_float('difficulty')}
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
        actions.recalc();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={2}>
                    <SkillInput label="Farming skill" skill={this.state.skill} />
                </Col>

                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label="Nature skill"
                        name='nature_skill'
                        value={this.state.nature_skill}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="select"
                        label="crop difficulty"
                        value={this.state.difficulty}
                        onChange={act_float('difficulty')}
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
                    <FloatInput
                        label="Rake ql"
                        name='rake_ql'
                        value={this.state.rake_ql}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label="Rake skill"
                        name='rake_skill'
                        value={this.state.rake_skill}
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
        actions.recalc();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={2}>
                    <SkillInput label="Digging skill" skill={this.state.skill} />
                </Col>

                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label="Shovel ql"
                        name='shovel_ql'
                        value={this.state.shovel_ql}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label="Slope"
                        name="digging_slope"
                        value={this.state.digging_slope}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="select"
                        label="Tile difficulty"
                        ref="bonus"
                        value={this.state.difficulty}
                        onChange={act_float('difficulty')}
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
        actions.recalc();
        evt.preventDefault();
    },

    render(){
        return <form onSubmit={this.onSubmit}>
            <Row>
                <Col md={2}>
                    <SkillInput label="Meditating skill" skill={this.state.skill} />
                </Col>

                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label="Rug ql"
                        name="rug_ql"
                        value={this.state.rug_ql}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="number"
                        label="Level on path"
                        value={this.state.path_level}
                        onChange={act_float('path_level')}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="checkbox"
                        label="Has level up cooldown?"
                        value={this.state.medi_cooldown}
                        onChange={evt => actions.setParam({medi_cooldown: !!evt.target.checked})}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        type="checkbox"
                        label="Is special tile?"
                        value={this.state.medi_tile}
                        onChange={evt => actions.setParam({medi_tile: !!evt.target.checked})}
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
        Reflux.connect(actions.setBrush, 'brush'),
        PureRenderMixin
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



const App = React.createClass({
        mixins: [
        Reflux.connect(countStore, 'count'),
        Reflux.connect(kindStore, 'kind'),
        Reflux.connect(progressStore, 'progress')
    ],

    _changeKind(evt){
        actions.setKind(evt.target.value);
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
                        onChange={evt => actions.setCount(parseFloat(evt.target.value, 10))}
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

    ReactDOM.render(<App />, document.getElementById('main'));
});
