// set the dimensions and margins of the graph
var dataLength = 3;
const dataRange = 5;
const xLabels = ['Test1', 'Test2', 'Test3'];
const yLabels = [undefined, 1, 2, 3, 4, 5, undefined];
const datum = [{ values: [1, 2, 3], dotted: false, lineColor: '#ff9800' }];
const margin = { top: 20, right: 30, bottom: 80, left: 30 };
const deltaY = document.getElementById('chart_area').offsetTop + margin.top;
const deltaWidth = 200;
const deltaHeight = 50;
// append the svg object to the body of the page

window.addColumn = function (index) {
  dataLength++;
  xLabels.splice(index, 0, 'New Column');
  datum.forEach((data) => {
    data.values.splice(index, 0, 1);
  });
  drawTotal(dataLength, datum, xLabels);
};

window.enableColumnUpdate = function (elem) {
  elem.parentElement.style.display = 'none';
  elem.parentElement.nextElementSibling.style.display = 'block';
  elem.parentElement.nextElementSibling.firstElementChild.focus();
  elem.parentElement.nextElementSibling.firstElementChild.selectionStart =
    elem.parentElement.nextElementSibling.firstElementChild.value.length;
};

window.updateColumnName = function (elem, index) {
  const newLabel = elem.parentElement.firstElementChild.value;
  elem.parentElement.style.display = 'none';
  elem.parentElement.previousElementSibling.style.display = 'block';
  elem.parentElement.previousElementSibling.firstElementChild.innerHTML =
    newLabel;
  xLabels[index] = newLabel;
};

function drawXLabels(_labels, _xLabels, _height) {
  _xLabels.forEach((xLabel, index) => {
    _labels
      .append('foreignObject')
      .attr('x', deltaWidth * (index + 1) - 70)
      .attr('y', _height + 15)
      .attr('width', 140)
      .attr('height', 100)
      .html(
        `<div style="height:100%;width:100%;padding:5px;box-sizing:border-box;">
          <div style="text-align:center">
            <div style="text-align:center">${xLabel}</div>
            <i class="fa-solid fa-pen column-button" onclick="enableColumnUpdate(this)"></i>
            <i class="fa-solid fa-trash-can column-button"></i>
          </div>
          <div style="text-align:center;display:none;">
            <input style="text-align:center;width:100%;box-sizing:border-box;outline:none;border:none;border-bottom:1px solid black;" value="${xLabel}" />
            <i class="fa-solid fa-check column-button" onclick="updateColumnName(this, ${index})"></i>
          </div>
        </div>`
      );
  });
}

function drawCoordinate(
  _width,
  _height,
  _coordinate,
  _labels,
  _xLabels,
  _yLabels
) {
  _coordinate
    .append('foreignObject')
    .attr('x', -15)
    .attr('y', -15)
    .attr('width', _width + 30)
    .attr('height', _height + 30)
    .html(
      `<div style="height:100%;width:100%;padding:5px;box-sizing:border-box">
        <div style="height:100%;width:100%;border-radius:4px;box-shadow:0px 2px 1px -1px rgb(0 0 0 / 20%),0px 1px 1px 0px rgb(0 0 0 / 14%),0px 1px 3px 0px rgb(0 0 0 / 12%);">
        </div>
      </div>`
    );

  _yLabels.forEach((yLabel, index) => {
    _coordinate
      .append('line')
      .attr('x1', 0)
      .attr('y1', deltaHeight * (dataRange + 1 - index))
      .attr('x2', _width)
      .attr('y2', deltaHeight * (dataRange + 1 - index));
    _coordinate
      .append('text')
      .attr('x', -15)
      .attr('y', deltaHeight * (dataRange + 1 - index))
      .attr('text-anchor', 'end')
      .attr('alignment-baseline', 'central')
      .attr('stroke', 'black')
      .html(yLabel);
  });
  _coordinate
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', _height);
  _coordinate
    .append('line')
    .attr('x1', _width)
    .attr('y1', 0)
    .attr('x2', _width)
    .attr('y2', _height);
  _xLabels.forEach((_, index) => {
    _coordinate
      .append('line')
      .attr('x1', deltaWidth * (index + 1))
      .attr('y1', 0)
      .attr('x2', deltaWidth * (index + 1))
      .attr('y2', _height);
    _coordinate
      .append('foreignObject')
      .attr('x', deltaWidth * (index + 0.5) - 20)
      .attr('y', _height + 15)
      .attr('width', 40)
      .attr('height', 30)
      .html(
        `<div style="height:100%;width:100%;padding:5px;box-sizing:border-box;text-align:center">
          <i onclick="addColumn(${index})" class="fa-solid fa-circle-plus column-add-icon"></i>
        </div>`
      );
  });
  _coordinate
    .append('foreignObject')
    .attr('x', deltaWidth * (_xLabels.length + 0.5) - 20)
    .attr('y', _height + 15)
    .attr('width', 40)
    .attr('height', 30)
    .html(
      `<div style="height:100%;width:100%;padding:5px;box-sizing:border-box;text-align:center">
        <i onclick="addColumn(${_xLabels.length})" class="fa-solid fa-circle-plus column-add-icon"></i>
      </div>`
    );
  drawXLabels(_labels, _xLabels, _height);
}

function drawGraph(_graph, _datum) {
  datum.forEach((data) => {
    _graph.html(null);
    data.values.forEach((value, index, values) => {
      if (index < values.length - 1) {
        _graph
          .append('line')
          .attr('x1', deltaWidth * (index + 1))
          .attr('y1', deltaHeight * (dataRange + 1 - value))
          .attr('x2', deltaWidth * (index + 2))
          .attr('y2', deltaHeight * (dataRange + 1 - values[index + 1]))
          .attr('stroke', data.lineColor)
          .attr('stroke-dasharray', data.dotted ? '5,5' : undefined)
          .attr('stroke-width', 2);
      }
      _graph
        .append('foreignObject')
        .attr('x', deltaWidth * (index + 1) - 25)
        .attr('y', deltaHeight * (dataRange + 1 - value) - 25)
        .attr('width', 50)
        .attr('height', 50)
        .html(
          `<div style="height:100%;width:100%;background:#33ce33;border-radius:50%"></div>`
        )
        .call(
          d3
            .drag()
            .on('drag', function () {
              d3.select(this).attr('y', event.y - deltaY - 25);
            })
            .on('end', function () {
              const newPosition = Math.min(
                5,
                Math.max(1, Math.round((event.y - deltaY) / deltaHeight))
              );
              d3.select(this).attr('y', deltaHeight * newPosition - 25);
              if (values[index] !== 6 - newPosition) {
                values[index] = 6 - newPosition;
                drawGraph(_graph, _datum);
              }
            })
        );
    });
  });
}

function drawTotal(_dataLength, _datum, _xLabels) {
  const width = deltaWidth * (_dataLength + 1);
  const height = deltaHeight * (dataRange + 1);
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  d3.select('#chart_area svg').remove();
  const svg = d3
    .select('#chart_area')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  const coordinate = svg
    .append('g')
    .attr('stroke', '#cccccc')
    .attr('fill', '#cccccc');
  const labels = svg.append('g');
  const graph = svg.append('g').attr('stroke', 'grey').attr('fill', 'grey');

  drawCoordinate(width, height, coordinate, labels, _xLabels, yLabels);
  drawGraph(graph, _datum);
}

drawTotal(dataLength, datum, xLabels);

// graph.html(null);
// console.dir(document.getElementById('chart_area'));
// foreignObject
//   .append('div')
//   .style('height', '100%')
//   .style('width', '100%')
// .style('background-color', 'green');
// .style('box-shadow', '0 2px 5px 1px rgb(64 60 67 / 16%)');
// xLabels.forEach();
