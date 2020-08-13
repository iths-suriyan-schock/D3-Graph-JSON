// Setup config paramaters
const width = 600;
const height = 600;
const margin = 60;
const chartWidth = width - margin * 2;
const chartHeight = height - margin * 2;
const barSize = 20;

// Create SVG
const svg = d3
    .select(".container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create a Group for our chart
const chart = svg
    .append("g")
    .attr("class", "chart")
    .attr("transform", `translate(${margin},${margin})`);

// Create groups for our axes and gridlines
const axesGroup = chart.append("g").attr("class", "axes");

const gridLinesGroup = axesGroup.append("g").attr("class", "grid-lines");

const horizontalGridLinesGroup = gridLinesGroup
    .append("g")
    .attr("class", "horizontal-lines");

// Create groups for vertical axes and translate them to the bottom
const verticalGridLinesGroup = gridLinesGroup
    .append("g")
    .attr("class", "vertical-lines")
    .attr("transform", `translate(0,${chartHeight})`);

const bottomAxisGroup = axesGroup
    .append("g")
    .attr("class", "bottom-axis")
    .attr("transform", `translate(0,${chartHeight})`);

const leftAxisGroup = axesGroup.append("g").attr("class", "left-axis");

const barGroup = chart.append("g").attr("class", "bars");

const fetchData = async () => {
    let bigArray = [];
    let horrorArray = [];
    let actionArray = [];
    let comedyArray = [];
    // data
    let movieData = await d3.json("../D3-Graph-JSON/imdbData.json");
    // data => array
    let ninetyFiveMoviesArray = Object.entries(movieData["1995"]);
    // map through array => get genres
    ninetyFiveMoviesArray.map(movie => {
        movie[1].genre.map(genre => {
            bigArray.push(genre);
        });
    });
    bigArray.map(genre => {
        if (genre === "Comedy") {
            comedyArray.push(genre);
        } else if (genre === "Horror") {
            horrorArray.push(genre);
        } else if (genre === "Action") {
            actionArray.push(genre);
        }
    });
    console.log(`Number of comedy movies: ${comedyArray.length}`);
    console.log(`Number of horror movies: ${horrorArray.length}`);
    console.log(`Number of action movies: ${actionArray.length}`);
};
fetchData();

// Create an async function
// const render = async propertyName => {
//     // Fetch the data
//     let planetData = await d3.json("../D3-Graph-JSON/dump.json");
//     // Process data
//     planetData = planetData.planets;

// Create the scales
//     let xScale = d3
//         .scalePow()
//         .domain([1, d3.max(planetData, item => item[propertyName])])
//         .range([0, chartWidth]);
//     let yScale = d3
//         .scaleBand()
//         .domain(planetData.map(planet => planet.name))
//         .range([0, chartHeight]);

//     // Create the main axes
//     let bottomAxis = d3.axisBottom(xScale).tickFormat(d3.format(".2s"));

//     bottomAxis(bottomAxisGroup);

//     let leftAxis = d3.axisLeft(yScale);
//     leftAxis(leftAxisGroup);

//     // Create and configure grid lines
//     let verticalGridLines = d3
//         .axisTop(xScale)
//         .tickSize(chartHeight)
//         .ticks(10)
//         .tickSizeOuter(0)
//         .tickFormat(() => "");

//     verticalGridLinesGroup.call(verticalGridLines);
//     gridLinesGroup.selectAll(".tick line").attr("stroke", "lightgrey");

//     const selection = barGroup.selectAll("rect").data(planetData);

//     selection
//         .transition()
//         .duration(2000)
//         .attr("width", d => xScale(d[propertyName]));

//     selection
//         .enter()
//         .append("rect")
//         .attr("y", d => yScale(d.name) + barSize)
//         .attr("x", 0)
//         .attr("height", barSize)
//         .transition()
//         .duration(2000)
//         .attr("width", d => xScale(d[propertyName]))
//         .attr("fill", `rgb(200,50,50)`);
// };

// render("surfaceTemperature");

// document.querySelector(".dropdown").addEventListener("change", event => {
//     render(event.target.value);
// });
