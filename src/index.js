import * as d3 from 'd3';

let leftData = [2, 7, 1];
let rightData = [2, 8, 2];
let count = 0;
let t = d3.transition()
                .duration(1500)
                .ease(d3.easeLinear);
let svg = d3.select('svg');
let height = +svg.attr('height');
/**
 * initialization of constant object and functions
 *
 * @param {string} classAttr the class param
 * @param {Object} transalate the transalate param
 * @return {Object} Object of all the functions
 */
let initComponents = (classAttr, transalate) => svg.append('g').attr('class', classAttr).attr('transform', transalate);

let gleftNos = initComponents('leftNos', `translate(32, ${(height / 2)} )`);
let center = initComponents('center', `translate(68, ${(height / 2) + 50} )`);
let grightNos = initComponents('rightNos', `translate(102, ${(height / 2)} )`);
let equal = initComponents('equal', `translate(142, ${(height / 2) + 50} )`);

/**
 * initialization of constant object and functions
 *
 * @param {string} id the class param
 * @param {Integer} val the transalate param
 * @return {Object} Object of all the functions
 */
let verticalProductText = (id, val) => svg.select(id)
                .selectAll('text')
                .transition(t)
                .attr('transform', (d, i) => `translate( ${-i * 31.5 + val}, ${i * 50} )`);
/**
 * initialization of constant object and functions
 *
 * @param {string} id the class param
 * @param {Object} transalate the transalate param
 * @param {Object} text the text param
 * @return {Object} Object of all the functions
 */
let horiProdText = (id, transalate, text) => svg.select(id)
                .selectAll('text')
                .transition(t)
                .attr('transform', transalate)
                .text(text);
/**
 * initialization of constant object and functions
 *
 * @param {Object} gNos the selected svg object
 * @param {Array} pos the data
 * @return {Object} the data
 */
let initUpdateText = (gNos, pos) => {
    let gPos = gNos.selectAll('text')
                    .data(pos);
    gPos.attr('class', 'update')
                    .enter()
                    .append('text')
                    .attr('transform', (d, i) => `translate(${-i * 31.5}, ${i * 50})`)
                    .attr('class', 'enter')
                    .attr('x', (d, i) => i * 32)
                    .attr('dy', '.35em')
                    .attr('fill', (d, i) => {
                        if (i % 3 === 0) {
                            return 'green'; }
                        else if (i % 2 === 0) {
                            return 'red'; }
                        return 'blue'; })
                    .merge(gPos)
                    .text(d => d);
    return gPos;
};
/**
 * initialization of constant object and functions
 */
let updateVerticalProduct = () => {
    svg.select('.equal').remove();
    svg.select('.center').remove();
    verticalProductText('.leftNos', 50);
    verticalProductText('.rightNos', 150);
};
/**
 * initialization of constant object and functions
 */
let updateHorizontalProduct = () => {
    svg.select('.equal').remove();
    svg.select('.center').remove();
    horiProdText('.leftNos', () => 'translate(0, 0)', d => `${d} .`);
    horiProdText('.rightNos', () => `translate(${-58}, 0)`, (d) => { count++; return count === 3 ? d : `${d} +`; });
};
/**
 * initialization of constant object and functions
 *
 * @param {Array} left left matrix Data
 * @param {Array} right right matrix Data
 */
let initUpdate = (left, right) => {
    let textLeft = initUpdateText(gleftNos, left);
    center.append('text').text('.');
    let textRight = initUpdateText(grightNos, right);
    equal.append('text').text('=');
    setTimeout(() => updateVerticalProduct(), 2000);
    setTimeout(() => updateHorizontalProduct(), 5000);
    textLeft.exit().remove();
    textRight.exit().remove();
};

initUpdate(leftData, rightData);
