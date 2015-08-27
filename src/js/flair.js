module.exports = {
  indent: function(level) {
    return new Array(level + 1).join('  ');
  },

  camelToHyphen: function(text) {
    return text.replace(/([^\b])([A-Z]{1})/g, function(match, extra, letter) {
      return extra + '-' + letter.toLowerCase();
    });
  },

  flatten: function flatten(rules, result, indent) {
    result = result || [];
    indent = indent || 0;

    Object.keys(rules).forEach(function(selector) {
      var node = { selector: selector, indent: indent, props: {} }
      var parentSelectors = selector.split(/\s*,\s*/);
      var prop, subselect;
      result.push(node);

      var valueProps = Object.keys(rules[selector]).filter(function(rule) {
        return typeof rules[selector][rule] !== 'object';
      });

      /* Don't include selectors which have no rules
      * (this happens when only nested selectors exist under a selector)
      */
      if (!valueProps.length) {
        result.pop();
      }

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
              if (/&/.test(nestedSelector)) {
                return nestedSelector.replace(/^\s+/g, '').replace(/&/g, parentSelector);
              }

              return parentSelector + nestedSelector;
            }).join(', ');
          }).join(', ');

          nestedRule[newSelector] = rules[selector][prop];
          flatten(nestedRule, result, valueProps.length ? indent + 1 : indent);
        } else {
          node.props[prop] = String(rules[selector][prop]);
        }
      };
    });

    return result;
  },

  compile: function(rules, callback) {
    if (typeof rules === 'function') {
      return rules(function(asyncRules) {
        this.compile(asyncRules, callback);
      }.bind(this));
    }

    var flat = this.flatten(rules);
    var output = [];
    var spaces, rule, prop;

    for (rule of flat) {
      /* This is just to match libsass output:
      * Root-level rules have an empty line after the closing brace
      */
      if (output.length && rule.indent === 0) {
        output.push('');
      }

      spaces = this.indent(rule.indent + 1);

      output.push(this.indent(rule.indent) + rule.selector + ' {');
      for (prop in rule.props) {
        output.push(spaces + this.camelToHyphen(prop) + ': ' + rule.props[prop] + ';');
      }

      output.push(output.pop() + ' }');
    }

    var result = output.join('\n');
    callback(result);
    return result;
  }
};
