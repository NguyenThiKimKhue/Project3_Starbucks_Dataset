// Use D3 to select the table

// Use D3 to create a bootstrap striped table
// https://getbootstrap.com/docs/5.3/content/tables/#striped-rows

// Use D3 to select the table body

// BONUS: Dynamic table
// Loop through an array of grades and build the entire table body from scratch


// Use D3 to select the table
let table = d3.select("#stores_table");
let tbody = table.select("tbody");

// Make Table Interactive
let dt_table = new DataTable('#stores_table');

// Event Listener
d3.select("#filter-btn").on("click", function () {
  doWork();
});

// On Page Load
doWork();

// Helper Functions
function doWork() {
  // Fetch the JSON data and console log it
  d3.json("/api/v1.0/bar_data").then(function (data) {  
    // Make Plot
    makeBarPlot(data);
  });

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
    x: filtered_data.map(row => row.state_province),
    y: filtered_data.map(row => row.store_count),
    type: 'bar',
    marker: {
      color: 'firebrick'
    },
    orientation: 'h'
  }

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
  }

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot('plot', traces, layout);
}

