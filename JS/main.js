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

// Create an async function
const fetchData = async () => {
    // Data
    let movieData = await d3.json('./IMDB-Data.json')
    // Data => array
    let ninetyFiveMoviesArray = Object.entries(movieData["1995"])
    // Map through array => get genres
    ninetyFiveMoviesArray.map(movie => {
        movie[1].genre.map(genre => {
            bigArray.push(genre)
        })
        // console.log(movie[1].genre);
    })

    let bigArray = []
    let horrorArray = []
    let dramaArray = []
    let comedyArray = []

    bigArray.map(genre => {
        if (genre === "Comedy") {
            comedyArray.push(genre) 
        } else if (genre === "Horror") {
                horrorArray.push(genre)
        } else if (genre === "Drama") {
        dramaArray.push(genre)
        }
    })

}
fetchData();

// Create the scales
let xScale = d3.scalePow()
.domain( [1, d3.max(movieData, item => item[propertyName])])
.range([0, chartWidth])
let yScale = d3.scaleBand()
.domain(movieData.map(movie => movie.name))
.range([0, chartHeight])

// Create the main axes
let bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format(".2s"))
    
bottomAxis(bottomAxisGroup)

let leftAxis = d3.axisLeft(yScale)
leftAxis(leftAxisGroup)

// async function render(propertyName){
//     // Fetch the data
//     let planetData = await d3.json('planets.json')
//     // Process data
//     planetData = planetData.planets            

    
// render()