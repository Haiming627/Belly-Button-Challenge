
const url='https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
d3.json(url).then(function(data){
  console.log(data);
});


function init() {
    let dropdown_options = d3.select('#selDataset');
    
    d3.json(url).then((data) => {
        let names = data.names;
        names.forEach((i) => {
            dropdown_options.append('option').text(i).property('value',i);
        });
        let extraction = names[0];
        info(extraction);
        bar(extraction);
        bubble(extraction);
    });
};

init();

function info(data_set) {
  d3.json(url).then((data) => {
    let metadata = data.metadata;
    let array = metadata.filter(item => item.id == data_set);
    let info = array[0];
    d3.select('#sample-metadata').html("");
    Object.entries(info).forEach(([key,value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
  });
});

};



function bar(data_set) {
  d3.json(url).then((data) => {
    let samples = data.samples;
    let array = samples.filter(item => item.id == data_set);
    let info1 = array[0];
    let xaxis = info1.sample_values.slice(0,10).reverse();
    let yaxis = info1.otu_ids.map(item => `OTU`+item).slice(0,10).reverse();
    let labels = info1.otu_labels.slice(0,10).reverse();
      
    let trace = {
          x: xaxis,
          y: yaxis,
          text: labels,
          type: "bar",
          orientation: "h"
      };

    Plotly.newPlot("bar", [trace])
  })
};

function bubble(data_set) {
  d3.json(url).then((data) => {
    let samples = data.samples;
    let array = samples.filter(item => item.id == data_set);
    let info2 = array[0];
    let ids = info2.otu_ids;
    let labels1 = info2.otu_labels;
    let values = info2.sample_values;
      
    let trace1 = {
          x: ids,
          y: values,
          text: labels1,
          mode:'markers',
          marker:{
            size: values,
            color: ids,
            colorscale:'darkmint'
      }};

    Plotly.newPlot("bubble", [trace1])
  }
)};
