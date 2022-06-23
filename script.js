// set the dimensions and margins of the graph
var dataLength = 3;
const dataRange = 5;
const xLabels = ['Emotional Fulfillment', 'Job Satisfaction', 'Flexibility'];
const yLabels = [undefined, 1, 2, 3, 4, 5, undefined];
const datum = [
  {
    label: 'What you want',
    visible: true,
    type: 'fa-star',
    values: [5, 4, 4],
    dotted: true,
    color: '#ffd600',
    lineColor: '#969696',
  },
  {
    label: 'What your family wants',
    visible: true,
    type: 'fa-heart',
    values: [3, 5, 4],
    dotted: false,
    color: '#ea5e5e',
    lineColor: '#98e6ff',
  },
  {
    label: 'Some really long key that causes 2 lines',
    visible: true,
    type: 'fa-rocket',
    values: [3, 2, 4],
    dotted: true,
    color: '#4ecb71',
    lineColor: '#ffbf75',
  },
];
const margin = { top: 20, right: 30, bottom: 80, left: 30 };
const deltaY = document.getElementById('chart_area').offsetTop + margin.top;
const deltaWidth = 200;
const deltaHeight = 50;

var graph;

window.addColumn = function (index) {
  dataLength++;
  xLabels.splice(index, 0, 'New Column');
  datum.forEach((data) => {
    data.values.splice(index, 0, 1);
  });
  drawTotal(dataLength, datum, xLabels);
};

window.removeColumn = function (index) {
  dataLength--;
  xLabels.splice(index, 1);
  datum.forEach((data) => {
    data.values.splice(index, 1);
  });
  drawTotal(dataLength, datum, xLabels);
};

window.enableTitleUpdate = function (elem) {
  elem.parentElement.style.display = 'none';
  elem.parentElement.nextElementSibling.style.display = 'flex';
  elem.parentElement.nextElementSibling.firstElementChild.focus();
  elem.parentElement.nextElementSibling.firstElementChild.selectionStart =
    elem.parentElement.nextElementSibling.firstElementChild.value.length;
};

window.updateTitle = function (elem) {
  const newLabel = elem.parentElement.firstElementChild.value;
  elem.parentElement.style.display = 'none';
  elem.parentElement.previousElementSibling.style.display = 'flex';
  elem.parentElement.previousElementSibling.firstElementChild.innerHTML =
    newLabel;
};

window.enableXLabelUpdate = function (elem) {
  elem.parentElement.parentElement.style.display = 'none';
  elem.parentElement.parentElement.nextElementSibling.style.display = 'block';
  elem.parentElement.parentElement.nextElementSibling.firstElementChild.focus();
  elem.parentElement.parentElement.nextElementSibling.firstElementChild.selectionStart =
    elem.parentElement.parentElement.nextElementSibling.firstElementChild.value.length;
};

window.updateXLabel = function (elem, index) {
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
      .attr('x', deltaWidth * (index + 1) - 80)
      .attr('y', _height + 15)
      .attr('width', 160)
      .attr('height', 100)
      .on('mouseenter', function () {
        document.getElementById(`circle-plus-${index}`).classList.add('show');
        document
          .getElementById(`circle-plus-${index + 1}`)
          .classList.add('show');
      })
      .on('mouseleave', function () {
        document
          .getElementById(`circle-plus-${index}`)
          .classList.remove('show');
        document
          .getElementById(`circle-plus-${index + 1}`)
          .classList.remove('show');
      })
      .html(
        `<div style="height:100%;width:100%;padding:5px;">
          <div class="y-label-staic">
            <div style="text-align:center;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">${xLabel}</div>
            <span>
              <i class="fa-solid fa-pen icon-button" onclick="enableXLabelUpdate(this)"></i>
              <i class="fa-solid fa-trash-can icon-button" onclick="removeColumn(${index})"></i>
            </span>
          </div>
          <div style="text-align:center;display:none;">
            <input style="text-align:center;width:100%;outline:none;border:none;border-bottom:1px solid black;display:block;" value="${xLabel}" />
            <i class="fa-solid fa-check icon-button" onclick="updateXLabel(this, ${index})"></i>
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
  _yLabelSvg,
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
    _yLabelSvg
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
      .attr('id', `circle-plus-${index}`)
      .attr('class', 'circle-plus')
      .attr('x', deltaWidth * (index + 0.5) - 20)
      .attr('y', _height + 15)
      .attr('width', 40)
      .attr('height', 30)
      .html(
        `<div style="height:100%;width:100%;padding:5px;text-align:center">
          <i onclick="addColumn(${index})" class="fa-solid fa-circle-plus column-add-icon"></i>
        </div>`
      );
  });
  _coordinate
    .append('foreignObject')
    .attr('id', `circle-plus-${_xLabels.length}`)
    .attr('class', 'circle-plus')
    .attr('x', deltaWidth * (_xLabels.length + 0.5) - 20)
    .attr('y', _height + 15)
    .attr('width', 40)
    .attr('height', 30)
    .html(
      `<div style="height:100%;width:100%;padding:5px;text-align:center">
        <i onclick="addColumn(${_xLabels.length})" class="fa-solid fa-circle-plus column-add-icon"></i>
      </div>`
    );
  drawXLabels(_labels, _xLabels, _height);
}

function drawGraph(_graph, _datum) {
  _graph.html(null);
  _datum.forEach((data, dataIndex) => {
    data.values.forEach((value, index, values) => {
      if (index < values.length - 1) {
        _graph
          .append('line')
          .attr('id', `line-${dataIndex}-${index}`)
          .attr('class', `graph-${dataIndex}`)
          .attr('x1', deltaWidth * (index + 1))
          .attr('y1', deltaHeight * (dataRange + 1 - value))
          .attr('x2', deltaWidth * (index + 2))
          .attr('y2', deltaHeight * (dataRange + 1 - values[index + 1]))
          .attr('stroke', data.lineColor)
          .attr('stroke-dasharray', data.dotted ? '5,5' : undefined)
          .attr('stroke-width', 2)
          .style('visibility', data.visible ? 'visible' : 'hidden');
      }
      _graph
        .append('foreignObject')
        .attr('class', `graph-${dataIndex}`)
        .attr('x', deltaWidth * (index + 1) - 25)
        .attr('y', deltaHeight * (dataRange + 1 - value) - 25)
        .attr('width', 50)
        .attr('height', 50)
        .html(
          `<div class="node-wrapper">
            <div class="node">
              <i class="fa-solid ${data.type}" style="color:${data.color}"></i>
            </div>
          </div>`
        )
        .style('visibility', data.visible ? 'visible' : 'hidden')
        .call(
          d3
            .drag()
            .on('start', function () {
              document.body.style.cursor = 'grab';
            })
            .on('drag', function () {
              const newPosition = Math.min(
                5,
                Math.max(1, Math.round((event.y - deltaY) / deltaHeight))
              );
              d3.select(this).attr('y', deltaHeight * newPosition - 25);
              _graph.selectAll(`.graph-${dataIndex}`).raise();
              d3.select(this.parentElement)
                .select(`#line-${dataIndex}-${index}`)
                .attr('y1', deltaHeight * newPosition);
              if (index > 0)
                d3.select(this.parentElement)
                  .select(`#line-${dataIndex}-${index - 1}`)
                  .attr('y2', deltaHeight * newPosition);
            })
            .on('end', function () {
              document.body.style.cursor = 'default';
              const newPosition = Math.min(
                5,
                Math.max(1, Math.round((event.y - deltaY) / deltaHeight))
              );
              if (values[index] !== 6 - newPosition) {
                values[index] = 6 - newPosition;
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
  d3.selectAll('#chart_area svg').remove();
  const yLabelSvg = d3
    .select('#chart_area')
    .append('svg')
    .attr('width', 20)
    .attr('height', svgHeight)
    .style('display', 'inline')
    .style('background-color', '#ffffff')
    .style('position', 'sticky')
    .style('left', 0)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('stroke', '#cccccc')
    .attr('fill', '#cccccc');
  const svg = d3
    .select('#chart_area')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .style('display', 'inline')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  const coordinate = svg
    .append('g')
    .attr('stroke', '#cccccc')
    .attr('fill', '#cccccc');
  const labels = svg.append('g');
  graph = svg.append('g').attr('stroke', 'grey').attr('fill', 'grey');

  drawCoordinate(
    width,
    height,
    coordinate,
    labels,
    yLabelSvg,
    _xLabels,
    yLabels
  );
  drawGraph(graph, _datum);
}

drawTotal(dataLength, datum, xLabels);

window.changeVisiblity = function (elem, index) {
  if (datum[index].visible) {
    datum[index].visible = false;
    d3.select(elem).attr('class', 'fa-solid fa-eye-slash icon-button');
    graph.selectAll(`.graph-${index}`).style('visibility', 'hidden');
  } else {
    datum[index].visible = true;
    d3.select(elem).attr('class', 'fa-solid fa-eye icon-button');
    graph.selectAll(`.graph-${index}`).style('visibility', 'visible');
  }
};

window.removeData = function (index) {
  datum.splice(index, 1);
  drawTotal(dataLength, datum, xLabels);
  drawLegend();
};

window.addData = async function (index) {
  const { value: formValues } = await Swal.fire({
    title: 'Add data',
    html: `
      <div style="display:flex;align-items:center;">
        <label class="swal2-input-label" style="margin:0 5px;flex-basis:60px;">Label</label>
        <input id="swal2-input-label" class="swal2-input" style="margin:0 5px;" value="Label">
      </div>
      <div style="display:flex;align-items:center;margin-top:10px;">
        <label class="swal2-input-label" style="margin:0 5px;flex-basis:60px;">Icon</label>
        <select id="swal2-select-type" class="swal2-select" style="margin:0 5px;">
          <option value="fa-star">Star</option>
          <option value="fa-heart">Heart</option>
          <option value="fa-rocket">Rocket</option>
        </select>
        <input id="swal2-input-color" type="color">
      </div>
      <div style="display:flex;align-items:center;margin-top:10px;">
        <label class="swal2-input-label" style="margin:0 5px;flex-basis:60px;">Line</label>
        <label for="swal2-checkbox-dotted" class="swal2-checkbox" style="display:flex;margin:0 5px;">
          <input id="swal2-checkbox-dotted" type="checkbox">
          <span class="swal2-label">Dotted</span>
        </label>
        <input id="swal2-input-line-color" type="color">
      </div>`,
    focusConfirm: false,
    preConfirm: () => {
      return {
        label: document.getElementById('swal2-input-label').value,
        type: document.getElementById('swal2-select-type').value,
        color: document.getElementById('swal2-input-color').value,
        dotted: document.getElementById('swal2-checkbox-dotted').checked,
        lineColor: document.getElementById('swal2-input-line-color').value,
      };
    },
  });
  datum.push({
    ...formValues,
    visible: true,
    values: Array.from({ length: dataLength }, () => 1),
  });
  drawTotal(dataLength, datum, xLabels);
  drawLegend();
};

window.updateData = async function (index) {
  const { value: formValues } = await Swal.fire({
    title: 'Update data',
    html: `
      <div style="display:flex;align-items:center;">
        <label class="swal2-input-label" style="margin:0 5px;flex-basis:60px;">Label</label>
        <input id="swal2-input-label" class="swal2-input" style="margin:0 5px;" value="${
          datum[index].label
        }">
      </div>
      <div style="display:flex;align-items:center;margin-top:10px;">
        <label class="swal2-input-label" style="margin:0 5px;flex-basis:60px;">Icon</label>
        <select id="swal2-select-type" class="swal2-select" style="margin:0 5px;">
          <option value="fa-star"${
            datum[index].type === 'fa-star' ? ' selected' : ''
          }>Star</option>
          <option value="fa-heart"${
            datum[index].type === 'fa-heart' ? ' selected' : ''
          }>Heart</option>
          <option value="fa-rocket"${
            datum[index].type === 'fa-rocket' ? ' selected' : ''
          }>Rocket</option>
        </select>
        <input id="swal2-input-color" type="color" value="${
          datum[index].color
        }">
      </div>
      <div style="display:flex;align-items:center;margin-top:10px;">
        <label class="swal2-input-label" style="margin:0 5px;flex-basis:60px;">Line</label>
        <label for="swal2-checkbox-dotted" class="swal2-checkbox" style="display:flex;margin:0 5px;">
          <input id="swal2-checkbox-dotted" type="checkbox"${
            datum[index].dotted ? ' checked' : ''
          }>
          <span class="swal2-label">Dotted</span>
        </label>
        <input id="swal2-input-line-color" type="color" value="${
          datum[index].lineColor
        }">
      </div>`,
    focusConfirm: false,
    preConfirm: () => {
      return {
        label: document.getElementById('swal2-input-label').value,
        type: document.getElementById('swal2-select-type').value,
        color: document.getElementById('swal2-input-color').value,
        dotted: document.getElementById('swal2-checkbox-dotted').checked,
        lineColor: document.getElementById('swal2-input-line-color').value,
      };
    },
  });
  Object.assign(datum[index], formValues);
  drawTotal(dataLength, datum, xLabels);
  drawLegend();
};

function drawLegend() {
  const content = d3.select('#chart_legend > .content');
  content.html(null);
  datum.forEach((data, dataIndex) => {
    const row = content.append('div').attr('class', 'flex-row');
    const icon = row.append('div').attr('class', 'icon');
    const action = row.append('div').attr('class', 'action');
    action
      .append('i')
      .attr('class', 'fa-solid fa-pencil icon-button')
      .attr('onclick', `updateData(${dataIndex})`);

    action
      .append('i')
      .attr('class', 'fa-solid fa-list-ul icon-button')
      .style('cursor', 'grab')
      .call(
        d3
          .drag()
          .on('start', function () {
            this.parentElement.classList.add('dragging');
          })
          .on('drag', function () {
            const children =
              this.parentElement.parentElement.parentElement.children;
            var index = 0;
            var currentIndex = -1;
            for (index = 0; index < children.length; index++) {
              if (children[index] === this.parentElement.parentElement)
                currentIndex = index;
              if (
                children[index].offsetTop + children[index].offsetHeight >
                event.clientY
              )
                break;
            }
            if (index !== currentIndex) {
              if (currentIndex >= 0)
                this.parentElement.parentElement.parentElement.insertBefore(
                  this.parentElement.parentElement,
                  children[index + 1]
                );
              else
                this.parentElement.parentElement.parentElement.insertBefore(
                  this.parentElement.parentElement,
                  children[index]
                );
            }
          })
          .on('end', function () {
            this.parentElement.classList.remove('dragging');
          })
      );
    action
      .append('i')
      .attr(
        'class',
        `fa-solid ${data.visible ? 'fa-eye' : 'fa-eye-slash'} icon-button`
      )
      .attr('onclick', `changeVisiblity(this, ${dataIndex})`);
    action
      .append('i')
      .attr('class', 'fa-solid fa-trash-can icon-button')
      .attr('onclick', `removeData(${dataIndex})`);
    icon
      .append('div')
      .attr('class', 'line')
      .style('border-top-color', data.lineColor)
      .style('border-top-style', data.dotted ? 'dotted' : 'solid');
    icon
      .append('i')
      .attr('class', `fa-solid ${data.type}`)
      .style('color', data.color);
    row.append('div').html(data.label);
  });
}

drawLegend();
