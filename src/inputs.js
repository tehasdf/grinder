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
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Tool QL (0 if not applicable)'
                        name='ql'
                        value={this.state.ql}
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
                        label='Pickaxe skill'
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
                        label='Pickaxe skill'
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


const CreationInputs = React.createClass({
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
                    <SkillInput label="Primary skill" skill={this.state.skill} />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Tool skill (0 if not applicable)'
                        name='tool_skill'
                        value={this.state.tool_skill}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Tool ql'
                        name='tool_ql'
                        value={this.state.tool_ql}
                    />

                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Item difficulty'
                        name='difficulty'
                        value={this.state.difficulty}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FloatInput
                        label='Material ql'
                        name='material_ql'
                        value={this.state.material_ql}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Imbue'
                        name='imbue'
                        value={this.state.imbue}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Parent skill (0 if not applicable)'
                        name='parent_skill'
                        value={this.state.parent_skill}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        label='Tool rarity'
                        type="select"
                        value={this.state.tool_rarity}
                        onChange={act_float('tool_rarity')}
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


const WoodcuttingQLInputs = React.createClass({
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
                    <SkillInput label="Woodcutting" skill={this.state.skill} />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Tool skill (hatchet/saw)'
                        name='hatchet_skill'
                        value={this.state.hatchet_skill}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Tool ql (hatchet/saw)'
                        name='hatchet_ql'
                        value={this.state.hatchet_ql}
                    />

                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Difficulty (15 - tree age)'
                        name='difficulty'
                        value={this.state.difficulty}
                    />
                </Col>
            </Row>
            <Row>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Imbue'
                        name='imbue'
                        value={this.state.imbue}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        label='Hatchet rarity'
                        type="select"
                        value={this.state.hatchet_rarity}
                        onChange={act_float('hatchet_rarity')}
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


const ImpingInputs = React.createClass({
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
                    <SkillInput label="Skill" skill={this.state.skill} />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Target ql'
                        name='target_ql'
                        value={this.state.target_ql}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Tool ql'
                        name='tool_ql'
                        value={this.state.tool_ql}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FloatInput
                        label='Tool skill (0 if not applicable)'
                        name='tool_skill'
                        value={this.state.tool_skill}
                    />

                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Parent skill (0 if not applicable)'
                        name='parent_skill'
                        value={this.state.parent_skill}
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


const SmithingQLInputs = React.createClass({
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
                    <SkillInput label="Skill" skill={this.state.skill} />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Starting ql'
                        name='start_ql'
                        value={this.state.start_ql}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <FloatInput
                        label='Target ql'
                        name='target_ql'
                        value={this.state.target_ql}
                    />
                </Col>
                <Col mdOffset={1} md={2}>
                    <Input
                        label='Target rarity'
                        type="select"
                        value={this.state.target_rarity}
                        onChange={act_float('target_rarity')}
                    >
                        <option value="0">None</option>
                        <option value="1">Rare</option>
                        <option value="2">Supreme</option>
                        <option value="3">Fantastic</option>
                    </Input>
                </Col>
            </Row>

            <Row>
                <Col md={2}>
                    <FloatInput
                        label='Pelt ql'
                        name='pelt_ql'
                        value={this.state.pelt_ql}
                    />
                </Col>
                <Col md={2} mdOffset={1}>
                    <FloatInput
                        label='Pelt imbue'
                        name='pelt_imbue'
                        value={this.state.pelt_imbue}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={2}>
                    <FloatInput
                        label='Lump ql'
                        name='lump_ql'
                        value={this.state.lump_ql}
                    />
                </Col>
                <Col md={2} mdOffset={1}>
                    <FloatInput
                        label='Lump imbue'
                        name='lump_imbue'
                        value={this.state.lump_imbue}
                    />
                </Col>
            </Row>


            <Row>
                <Col md={2}>
                    <FloatInput
                        label='Whetstone ql'
                        name='whetstone_ql'
                        value={this.state.whetstone_ql}
                    />
                </Col>
                <Col md={2} mdOffset={1}>
                    <FloatInput
                        label='Whetstone imbue'
                        name='whetstone_imbue'
                        value={this.state.whetstone_imbue}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={2}>
                    <FloatInput
                        label='Hammer ql'
                        name='hammer_ql'
                        value={this.state.hammer_ql}
                    />
                </Col>
                <Col md={2} mdOffset={1}>
                    <FloatInput
                        label='Hammer imbue'
                        name='hammer_imbue'
                        value={this.state.hammer_imbue}
                    />
                </Col>

                <Col md={2} mdOffset={1}>
                    <FloatInput
                        label='Hammer skill'
                        name='hammer_skill'
                        value={this.state.hammer_skill}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={2}>
                    <FloatInput
                        label='Parent smithing skill'
                        name='parent_skill'
                        value={this.state.parent_skill}
                    />
                </Col>
                <Col md={2} mdOffset={1}>
                    <Input
                        type="checkbox"
                        label="Weapon / shield / armor / horse gear"
                        value={this.state.is_double}
                        onChange={evt => actions.setParam({is_double: !!evt.target.checked})}
                    />
                </Col>
                <Col md={2} mdOffset={1}>
                    <Input
                        type="checkbox"
                        label="Using title? Only for armor and horse gear"
                        value={this.state.use_title}
                        onChange={evt => actions.setParam({use_title: !!evt.target.checked})}
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
            mining_ql: <MiningQLInputs />,
            creation: <CreationInputs />,
            woodcutting_ql: <WoodcuttingQLInputs />,
            imping: <ImpingInputs />,
            smithing_ql: <SmithingQLInputs />
        }[this.props.kind];
        return input;
    }
});

export default Inputs;
