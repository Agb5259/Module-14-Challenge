// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Log the entire data to see its structure
    console.log("Metadata fetched:", data);

    // get the metadata field
const metadata = data.metadata;

    // Log the entire data to see its structure
console.log("Metadata field:", metadata);

    // Filter the metadata for the object with the desired sample number
const resultArray = metadata.filter(metaObj => metaObj.id == sample);
    const result = resultArray[0];

    // Log the entire data to see its structure
    console.log("Filtered metadata for sample:", result);


    // Use d3 to select the panel with id of `#sample-metadata`
const PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
PANEL.html("");


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
 Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
   });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Log the entire data to see its structure
    console.log("Data fetched:", data);

    // Get the samples field
     const samples = data.samples;

     // Log the entire data to see its structure
     console.log("Samples field:", samples);


    // Filter the samples for the object with the desired sample number
    const resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    const result = resultArray[0];

    // Log the entire data to see its structure
    console.log("Filtered sample data for sample:", result);


    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = result.otu_ids;
    const otu_labels = result.otu_labels;
    const sample_values = result.sample_values;

    // Log the data to see its structure
    console.log("otu_ids:", otu_ids);
    console.log("otu_labels:", otu_labels);
    console.log("sample_values:", sample_values);


    // Build a Bubble Chart
    const bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }];

    const bubbleLayout = {
      title: "OTU Samples",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30 }
    };


    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    const yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Log the data to see its structure
     console.log("yticks for bar chart:", yticks);


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    const barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    const barLayout = {
      title: "Top 10 OTUs",
      margin: { t: 30, l: 150 }
    };


    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

     // Log the entire data to see its structure
    console.log("Data fetched on init:", data);


    // Get the names field
     const sampleNames = data.names;

     // Log the entire data to see its structure
     console.log("Sample names:", sampleNames);


    // Use d3 to select the dropdown with id of `#selDataset`
      const selector = d3.select("#selDataset");


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
     sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  

    // Get the first sample from the list
      const firstSample = sampleNames[0];

    //Log the first sample to see its structure
    console.log("First sample:", firstSample); 


    // Build charts and metadata panel with the first sample
       buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}


// Function for event listener
function optionChanged(newSample) {

// Log the entire data to see its structure
  console.log("New sample selected:", newSample); 


  // Build charts and metadata panel each time a new sample is selected
   buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
