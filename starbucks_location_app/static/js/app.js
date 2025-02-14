// Use D3 to select the table
let table = d3.select("#stores_table");
let tbody = table.select("tbody");

// Make Table Interactive
let dt_table = new DataTable('#stores_table');

// Event Listener for Filter Button
d3.select("#filter-btn").on("click", function () {
  doWork();
});

// On Page Load
doWork();
createMap();

// Helper Functions
function doWork() {
  // Fetch the JSON data for the bar plot and console log it
  d3.json("/api/v1.0/bar_data").then(function (data) {  
    // Make Plot
    makeBarPlot(data);
  });

  // Fetch the JSON data for the table
  d3.json("/api/v1.0/table_data").then(function (data) {  
    // Make table
    makeTable(data);
  });
}

function makeTable(data) {
  // Clear Table
  tbody.html("");
  dt_table.clear().destroy();

  // Create Table
  for (let i = 0; i < data.length; i++) {
    let row = data[i];

    // Create Table Row
    let table_row = tbody.append("tr");

    // Append Cells
    table_row.append("td").text(row.store_number);
    table_row.append("td").text(row.country);
    table_row.append("td").text(row.city);
    table_row.append("td").text(row.state_province);
    table_row.append("td").text(row.latitude);
    table_row.append("td").text(row.longitude);
  }

  // Make Table Interactive (again)
  dt_table = new DataTable('#stores_table', {
    order: [[0, 'desc']] // Sort by column 1 desc
  });
}

function makeBarPlot(data) {
  // Create Trace
  let trace = {
    x: data.map(row => row.state_province), // Ensure you're using the correct data structure
    y: data.map(row => row.store_count), // Ensure you're using the correct data structure
    type: 'bar',
    marker: {
      color: '#ffc300'
    },
  };

  // Data trace array
  let traces = [trace];

  // Apply a title to the layout
  let layout = {
    title: {
      text: `Number of Starbucks Stores per State/Province`
    },
    yaxis: {
      title: {
        text: 'Number of Stores'
      }
    },
    xaxis: {
      title: {
        text: 'State/Province'
      }
    },
    height: 600
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot('plot', traces, layout);
}

function createMap() {
  // Step 1: CREATE THE BASE LAYERS
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Assemble the API query URL for map data
  let url = "/api/v1.0/map_data";
  console.log(url);

  d3.json(url).then(function (data) {
    // Step 2: CREATE THE DATA/OVERLAY LAYERS
    console.log(data);

    // Initialize the Cluster Group
    let heatArray = [];
    let markers = L.markerClusterGroup();

    // Loop and create markers
    for (let i = 0; i < data.length; i++) {
      let row = data[i];

      let marker = L.marker([row.latitude, row.longitude]).bindPopup(`<h1>${row.country}</h1><h3>${row.region}</h3>`);
      markers.addLayer(marker);

      // Heatmap point
      heatArray.push([row.latitude, row.longitude]);
    }

    // Create Heatmap Layer
    let heatLayer = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
   })

    // Step 3: CREATE THE LAYER CONTROL
    let baseMaps = {
      Street: street,
      Topography: topo
    };

    let overlayMaps = {
      HeatMap: heatLayer,
      Stores: markers
    };

    // Step 4: INITIALIZE THE MAP
    let myMap = L.map("map_container", {
      center: [40.7128, -74.0059],
      zoom: 7,
      layers: [street, markers]
    });

    // Step 5: Add the Layer Control
    L.control.layers(baseMaps, overlayMaps, heatLayer).addTo(myMap);
  });
}

function init() {
  createMap();
}

// on page load
init();