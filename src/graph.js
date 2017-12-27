const d3 = window.d3;
const React = window.React;
import Reflux from 'reflux';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import {graphDataStore} from './stores';
import actions from './actions';


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
            actions.setBrush(brush.extent())
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


const Graph = React.createClass({
    mixins: [
        Reflux.connect(graphDataStore, 'data'),
        PureRenderMixin
    ],

    componentDidUpdate(){
        var el = ReactDOM.findDOMNode(this);
        drawTheGraph(el, this.state.data);
    },

    render(){
        return <div />;
    }
});

export default Graph;