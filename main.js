var cssify = {
  indent: function(level) {
    return new Array(level + 1).join('  ');
  },

  flatten: function flatten(rules, result, indent) {
    result = result || [];
    indent = indent || 0;

    Object.keys(rules).forEach(function(selector) {
      var node = { selector: selector, indent: indent, props: {} } 
      var parentSelectors = selector.split(/\s*,\s*/);
      result.push(node);

      for (prop in rules[selector]) {
        if (typeof rules[selector][prop] === 'object') {
          var nestedRule = {};
          var selectors = prop.split(/\s*,\s*/);
          var nestedSelectors = [];
          var newSelector;

          for (subselect of selectors) {
            if (/^&[^, ]/.test(subselect)) { // Sub-selector wants attached to parent
              nestedSelectors.push(subselect.slice(1));
            } else {
              nestedSelectors.push(' ' + subselect);
            }
          }

          newSelector = nestedSelectors.map(function (nestedSelector) {
            return parentSelectors.map(function (parentSelector) {
              return parentSelector + nestedSelector.replace(/&/g, parentSelector);
            }).join(', ');
          }).join(', ');

          nestedRule[newSelector] = rules[selector][prop];
          flatten(nestedRule, result, indent + 1);
        } else {
          node.props[prop] = String(rules[selector][prop]);
        }
      };
    });

    return result;
  },

  compile: function(rules) {
    var flat = this.flatten(rules);
    var output = [];
    var spaces;

    for (rule of flat) {
      spaces = this.indent(rule.indent + 1);

      output.push(this.indent(rule.indent) + rule.selector + ' {');
      for (prop in rule.props) {
        output.push(spaces + prop + ': ' + rule.props[prop] + ';');
      }

      output.push(this.indent(rule.indent) + '}');
    }

    return output.join('\n');
  }
};

var style = {
  body: {
    color: '#f00',

    '.content': {
      color: '#0f0',
      position: 'absolute',
      '.inner-content, &:hover': {
        position: 'relative',
        '.foo': {
          background: '#fff'
        }
      }
    }
  },

  '.whatev': {
    div: {
      display: 'inline-block', // teehee
      '&': {
        wow: 'ok'
      },
      '> &': {
        display: 'block'
      }
    }
  }
};

console.log(cssify.compile(style));
