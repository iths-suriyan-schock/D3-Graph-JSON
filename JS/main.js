// Setup configuration paramaters
const width = 600
const height = 600
const margin = 60
const chartWidth = width - margin * 2
const chartHeight = height - margin * 2
const barSize = 20

// Create SVG
const svg = d3.select('.container')
            .append("svg")
            .attr("width", width)
            .attr("height", height)

// Create a Group for our chart
const chart = svg.append("g")
                .attr("class", "chart")
                .attr("transform", `translate(${margin},${margin})`)

// Create groups for our axes and gridlines
const axesGroup = chart.append("g")
                    .attr("class", "axes")

const gridLinesGroup = axesGroup.append("g")
                            .attr("class", "grid-lines")

const horizontalGridLinesGroup = gridLinesGroup.append("g")
                            .attr("class", "horizontal-lines")
                            
// Create groups for vertical axes and translate them to the bottom
const verticalGridLinesGroup = gridLinesGroup.append("g")
                            .attr("class", "vertical-lines")
                            .attr("transform", `translate(0,${chartHeight})`)

const bottomAxisGroup = axesGroup.append("g")
                            .attr("class", "bottom-axis")
                            .attr("transform", `translate(0,${chartHeight})`)

const leftAxisGroup = axesGroup.append("g").attr("class", "left-axis")


const barGroup = chart.append("g").attr("class", "bars")


function renderTooltip(data){            
    const tooltip = document.querySelector(".tooltip")

    tooltip.querySelector(".name").innerText = "Name: " + data.name
    tooltip.querySelector(".surfaceTemperature").innerText = "Surface Temperature: " + data.surfaceTemperature + " Kelvin"
    tooltip.querySelector(".aphelion").innerText = "Aphelion: " + data.aphelion + " km"
    tooltip.querySelector(".perihelion").innerText = "Perihelion: " + data.perihelion + " km"
    tooltip.querySelector(".mass").innerText = "Mass: " + data.mass + " kg"
    tooltip.querySelector(".volume").innerText = "Volume: " + data.volume + " km^3"

    tooltip.classList.add("show")
}
function hideTooltip(){
    const tooltip = document.querySelector(".tooltip")
    tooltip.classList.remove("show")
}
function repositionTooltip(x,y){            
    const tooltip = document.querySelector(".tooltip")
    tooltip.style.left = x + 'px'
    tooltip.style.top = y + 'px'
}


// Create an async function
async function render(propertyName){
    // Fetch the data
    let planetData = await d3.json('planets.json')
    // Process data
    planetData = planetData.planets            

    // Create the scales
    let xScale = d3.scalePow()
                    .domain( [1, d3.max(planetData, item => item[propertyName])])
                    .range([0, chartWidth])
    let yScale = d3.scaleBand()
                    .domain(planetData.map(planet => planet.name))
                    .range([0, chartHeight])

    // Create the main axes
    let bottomAxis = d3.axisBottom(xScale)
                        .tickFormat(d3.format(".2s"))
                        
    bottomAxis(bottomAxisGroup)

    let leftAxis = d3.axisLeft(yScale)
    leftAxis(leftAxisGroup)
    
    // Create and configure grid lines
    let verticalGridLines = d3.axisTop(xScale)                                
                        .tickSize(chartHeight)
                        .ticks(10)
                        .tickSizeOuter(0)
                        .tickFormat(()=>"")

    verticalGridLinesGroup
        .call(verticalGridLines)
    gridLinesGroup.selectAll(".tick line")
                            .attr("stroke","lightgrey")

    const selection = barGroup.selectAll("rect")
        .data(planetData)

    selection                
        .attr("width", item => xScale(item[propertyName]))

    selection
        .enter()
        .append("rect")
        .attr("y", item => yScale(item.name) + barSize)
        .attr("x", 0)
        .attr("height", barSize)
        .attr("width", item => xScale(item[propertyName]))
        .attr("fill", `rgb(200,50,50)`)
        .on("mouseover", item => renderTooltip(item))
        .on("mousemove", () => repositionTooltip(d3.event.clientX, d3.event.clientY))
        .on("mouseleave", () => hideTooltip())
}

render("surfaceTemperature")

document.querySelector(".dropdown").addEventListener("change", (event) => {
    render(event.target.value);
})


// d3.csv("data.csv",function(movieData) {
//     //data-code management here
// })