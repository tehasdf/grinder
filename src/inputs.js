const React = window.React;
const {Row, Col, Input} = window.ReactBootstrap;

import Reflux from 'reflux';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import actions from './actions';

import {paramsStore} from './stores';
import {act_float, SkillInput, FloatInput} from './inputWidgets';


const FixedInputs = React.createClass({
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


const MiningQLInputs = React.createClass({
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
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Vein ql modifier (0 - 79)'
                        name='vein_ql'
                        value={this.state.vein_ql}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Pick imbue power'
                        name='imbue'
                        value={this.state.imbue}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        label='Pick rarity'
                        type="select"
                        value={this.state.pick_rarity}
                        onChange={act_float('pick_rarity')}
                    >
                        <option value="0">None</option>
                        <option value="1">Rare</option>
                        <option value="2">Supreme</option>
                        <option value="3">Fantastic</option>
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
                    <FloatInput
                        label="Nature skill"
                        name="nature_skill"
                        value={this.state.nature_skill}
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


const Inputs = React.createClass({
    mixins: [PureRenderMixin],
    render(){
        var input = {
            fixed: <FixedInputs />,
            mining: <MiningInputs />,
            farming: <FarmingInputs />,
            digging: <DiggingInputs />,
            meditation: <MeditationInputs />,
            mining_ql: <MiningQLInputs />
        }[this.props.kind];
        return input;
    }
});

export default Inputs;
