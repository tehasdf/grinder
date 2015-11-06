const React = window.React;
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import Reflux from 'reflux';
import {statsStore} from './stores';
import {setBrush} from './actions';


function formatFreqCount({freq, count}){
    return <dd>{Math.round(10000 * freq) / 100}% ({count})</dd>
}

const Stats = React.createClass({
    mixins: [
        Reflux.connect(statsStore, 'stats'),
        Reflux.connect(setBrush, 'brush'),
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


export default Stats;
