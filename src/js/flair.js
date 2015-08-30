var util = require('./util');

var indent = function(level) {
  return new Array(level + 1).join('  ');
};

var camelToHyphen = function(text) {
  return text.replace(/([^\b])([A-Z]{1})/g, function(match, extra, letter) {
    return extra + '-' + letter.toLowerCase();
  });
};

var isValue = function(rule) {
  return typeof rule !== 'object' || rule.constructor === Promise;
};

var flatten = function(rules, result, indent) {
  result = result || [];
  indent = indent || 0;

  Object.keys(rules).forEach(function(selector) {
    // Support util/underscore/lodash wraps
    rules[selector] = rules[selector]._wrapped || rules[selector].__wrapped__ || rules[selector];

    var node = { selector: selector, indent: indent, props: {} }
    var parentSelectors = selector.split(/\s*,\s*/);
    var prop, subselect;
    result.push(node);

    var valueProps = Object.keys(rules[selector]).filter(function(rule) {
      return isValue(rules[selector][rule]);
    });

    /* Don't include selectors which have no rules
    * (this happens when only nested selectors exist under a selector)
    */
    if (!valueProps.length) {
      result.pop();
    }

    for (prop in rules[selector]) {
      if (!isValue(rules[selector][prop])) {
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
            // Special case: non-leading ampersand (leading ampersands are removed above)
            if (/&/.test(nestedSelector)) {
              return nestedSelector.replace(/^\s+/g, '').replace(/&/g, parentSelector);
            }

            return parentSelector + nestedSelector;
          }).join(', ');
        }).join(', ');

        nestedRule[newSelector] = rules[selector][prop];
        flatten(nestedRule, result, valueProps.length ? indent + 1 : indent);
      } else {
        node.props[prop] = rules[selector][prop];
      }
    };
  });

  return result;
};

// Resolve all values that are Promises
var resolve = function(flatRules, callback) {
  var rule, prop, promises = [];

  for (rule of flatRules) {
    for (prop in rule.props) {
      if (rule.props[prop].constructor === Promise) {
        promises.push(rule.props[prop].then(function(props, prop, value) {
          props[prop] = value;
        }.bind(this, rule.props, prop)));
      }
    }
  }

  Promise.all(promises).then(function() {
    callback(flatRules);
  });
};

var output = {};
output.nested = function(flatRules) {
  var output = [];
  var spaces, rule, prop;

  for (rule of flatRules) {
    /* This is just to match libsass output:
    * Root-level rules have an empty line after the closing brace
    */
    if (output.length && rule.indent === 0) {
      output.push('');
    }

    spaces = indent(rule.indent + 1);

    output.push(indent(rule.indent) + rule.selector + ' {');
    for (prop in rule.props) {
      output.push(spaces + camelToHyphen(prop) + ': ' + rule.props[prop] + ';');
    }

    output.push(output.pop() + ' }');
  }

  return output.join('\n');
};

var compile = function(rules, callback) {
  if (typeof rules === 'function') {
    return rules(function(asyncRules) {
      compile(asyncRules, callback);
    }, util);
  }

  resolve(flatten(rules), function(result) {
    callback(output.nested(result));
  });
};

module.exports = {
  compile: compile
};
