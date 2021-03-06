

const React = window.React;
const ReactDOM = window.ReactDOM;
const {Grid, Row, Col, Input, ProgressBar} = window.ReactBootstrap;

import Reflux from 'reflux';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import Graph from './graph';
import actions from './actions';

import {statsStore, kindStore, countStore, progressStore, paramsStore, roundingStore} from './stores';
import {act_float, SkillInput, FloatInput} from './inputWidgets';
import Stats from './stats';
import Inputs from './inputs';

const App = React.createClass({
    mixins: [
        Reflux.connect(countStore, 'count'),
        Reflux.connect(roundingStore, 'rounding'),
        Reflux.connect(kindStore, 'kind'),
        Reflux.connect(progressStore, 'progress')
    ],

    _changeKind(evt){
        actions.setKind(evt.target.value);
    },

    render(){
        var now = Math.round((this.state.progress * 10000) / 100);
        return <Grid>
            <Row>
                <Col md={3}>
                    <h1>Grinder</h1>
                </Col>

                <Col md={4}>
                    <Input type="select" label="Simulation kind" onChange={this._changeKind}>
                        <option value="fixed">Fixed bonus (channeling)</option>
                        <option value="mining">Mining (power for skillgain)</option>
                        <option value="mining_ql">Mining (resulting ql)</option>
                        <option value="farming">Farming</option>
                        <option value="digging">Digging</option>
                        <option value="meditation">Meditation</option>
                        <option value="creation">Creation</option>
                        <option value="woodcutting_ql">Woodcutting (cutting down, resulting ql)</option>
                        <option value="imping">Imping (skillgain roll)</option>
                        <option value="smithing_ql">Smithing (ql)</option>
                        <option value="taming">Taming</option>
                        <option value="fileting">Fileting</option>
                        <option value="forestry">Pruning</option>
                    </Input>
                </Col>

                <Col md={3}>
                    <Input
                        type='number'
                        label='Iteration count for the simulation'
                        ref="count"
                        value={this.state.count}
                        onChange={evt => actions.setCount(parseFloat(evt.target.value, 10))}
                    />
                </Col>
                <Col md={1}>
                    <Input
                        type='select'
                        label='Rounding'
                        ref="rounding"
                        value={this.state.rounding}
                        onChange={evt => actions.setRounding(evt.target.value)}
                    >
                        <option value="nearest">Nearest</option>
                        <option value="down">Down</option>
                    </Input>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Inputs kind={this.state.kind} />
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
