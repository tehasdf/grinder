const {Input} = window.ReactBootstrap;
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import actions from './actions';



export function act_float(key){

    return evt => {
        var obj = {};
        obj[key] = parseFloat(evt.target.value, 10)
        actions.setParam(obj);
    }
}



export const SkillInput = React.createClass({
    render(){
        return <FloatInput
            label={this.props.label || "Skill"}
            value={this.props.skill}
            name="skill"
        />
    }
});


export const FloatInput = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState(){
        return {value: this.props.value}
    },
    setValue(evt){
        var value = evt.target.value;
        this.setState({value})
        act_float(this.props.name)(evt)
    },

    render(){
        return <Input
            label={this.props.label}
            type="text"
            value={this.state.value}
            onChange={this.setValue}
        />
    }
})