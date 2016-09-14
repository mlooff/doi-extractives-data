(function(exports) {

  var findParentSVG = function (childObj) {
    var obj = childObj.parentNode;
    while(obj.tagName !== 'svg') {
      obj = obj.parentNode;
    }
    return obj;
  };

  var depixelize = function(value) {
    if (value.indexOf('px') > -1) {
      return +value.substr(0, value.length - 2);
    } else {
      return value;
    }
  };

  var pixelize = function(value) {
    return value + 'px';
  };

  var hideTooltip = function (tooltip) {
    tooltip.attr('aria-hidden', true);
  };

  var attached = function() {
    var self = d3.select(this);
    var svg = d3.select(findParentSVG(this));
    var svgParent = d3.select(findParentSVG(this).parentElement);
    var parent = d3.select(this.parentElement).select('use');

    var tooltip,
      tooltipText;

    var init = function(initialize) {
      tooltip = svgParent.select('.eiti-tooltip');

      if (tooltip.empty()) {
        svgParent.append('div')
          .classed('eiti-tooltip', true);
      }

      tooltip.attr('aria-label', function(){
          return self.attr('alt');
        })
        .attr('aria-hidden', false);

      tooltipText = tooltip.select('p');

      if (tooltipText.empty()) {
        tooltipText = tooltip.append('p');
      }

      // clear <title> text
      // if no javascript runs, <title> will serve as the tooltip
      self.text('');

      if (initialize) {
        hideTooltip(tooltip);
      }
    };

    var update = function() {

      init();

      tooltipText.text(function(){
        return self.attr('desc');
      });

      tooltip
        .style('left', function() {
          var tooltipWidth = depixelize(tooltip.style('width'));
          var svgWidth = depixelize(svg.style('width'));

          if (svgWidth <= tooltipWidth + event.layerX) {
            return pixelize(event.layerX - tooltipWidth);
          } else {
            return pixelize(event.layerX);
          }
        })
        .style('top', function() {
          var tooltipHeight = depixelize(tooltip.style('height'));
          var svgHeight = depixelize(svg.style('height'));

          if (svgHeight <= tooltipHeight + event.layerY) {
            return pixelize(event.layerY - tooltipHeight);
          } else {
            return pixelize(event.layerY);
          }
        });
    };

    var hide = function () {
      if (event.fromElement.nodeName === 'svg') {
        var tooltip = svgParent.select('.eiti-tooltip');
        hideTooltip(tooltip);
      }
    };

    init(this);

    parent.on('mouseover', update);
    svg.on('mouseout', hide);
  };

  var detached = function() {
  };

  exports.EITITooltip = document.registerElement('eiti-tooltip', {
    extends: 'title',
    prototype: Object.create(
      SVGElement.prototype,
      {
        attachedCallback: {value: attached},
        detachdCallback: {value: detached}
      }
    )
  });

})(this);

