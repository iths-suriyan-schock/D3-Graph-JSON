const width = 600
const height = 600
const margin = 60

const barHeight = 20
const barMargin = 10

const svg = d3.select('.container')
            .append("svg")
            .attr("width", width)
            .attr("height", height)

const chart = svg.append("g")
            .attr("class", "chart")
            .attr("transform", `translate(${margin},${margin})`)              
