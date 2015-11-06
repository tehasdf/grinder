const {Input} = window.ReactBootstrap;
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
        return <Input
            type="text"
            label={this.props.label || "Skill"}
            ref="skill"
            value={this.props.skill}
            onChange={evt => actions.setParam({skill: evt.target.value})}
        />
    }
});


export const FloatInput = React.createClass({
    render(){
        return <Input
            label={this.props.label}
            type="text"
            value={this.props.value}
            onChange={act_float(this.props.name)}
        />
    }
})