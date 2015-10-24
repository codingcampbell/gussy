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
  return typeof rule !== 'object' || typeof rule === 'function' || typeof rule.then === 'function' || rule.constructor === Array;
};

var arrayWrap = function(value) {
  return value && value.constructor === Array && value || [value];
};

var unwrapRules = function(rules) {
  // Support util/underscore/lodash wraps
  return rules._wrapped || rules.__wrapped__ || rules;
};

var flatten = function(rules, result, indent) {
  result = result || [];
  indent = indent || 0;

  Object.keys(rules).forEach(function(selector) {
    rules[selector] = unwrapRules(rules[selector]);

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
        var funcValue, funcProp;

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
        if (typeof rules[selector][prop] === 'function') {
          funcValue = rules[selector][prop](prop);
          for (funcProp in funcValue) {
            node.props[funcProp] = arrayWrap(funcValue[funcProp]);
          }
        } else {
          node.props[prop] = arrayWrap(rules[selector][prop]);
        }
      }
    };
  });

  return result;
};

// Resolve all values that are Promises
var resolve = function(flatRules, callback) {
  var rule, prop, index, promises = [];

  for (rule of flatRules) {
    for (prop in rule.props) {
      for (index in rule.props[prop]) {
        if (typeof rule.props[prop][index].then !== 'function') {
          continue;
        }

        promises.push(Promise.resolve(rule.props[prop][index]).then(function(prop, index, value) {
          prop[index] = value;
        }.bind(this, rule.props[prop], index)));
      }
    }
  }

  Promise.all(promises).then(function() {
    callback(flatRules);
  });
};

var output = {};
output.base = function(flatRules, noIndent, indentIncrease, space, ruleSpace, closeBracketSeparator, newline, compressed) {
  var output = [];
  var spaces, rule, prop;

  for (rule of flatRules) {
    rule.indent = noIndent ? 0 : rule.indent;

    // Root-level rules have an empty line after the closing brace
    if (output.length && rule.indent === 0) {
      output.push('');
    }

    spaces = indent(rule.indent + indentIncrease);

    output.push(indent(rule.indent) + rule.selector + space + '{' + ruleSpace);
    for (prop in rule.props) {
      output.push(spaces + camelToHyphen(prop.trim()) + ':' + space + rule.props[prop].join('').trim() + ';' + ruleSpace);
    }

    if (compressed) {
      /* Remove the last character from the last rule.
      * In compressed-mode, this would be a semicolon.
      * In compact-mode, this would be an extra space.
      */
      output.push(output.pop().slice(0, -1));
    }

    output.push(output.pop() + closeBracketSeparator + '}');
  }

  return output.join(newline);
};

output.nested = function(flatRules) {
  return output.base(flatRules, false, 1, ' ', '', ' ', '\n');
}

output.expanded = function(flatRules) {
  return output.base(flatRules, true, 1, ' ', '', '\n', '\n');
};

output.compact = function(flatRules) {
  var result = [], rule;
  for (rule of flatRules) {
    result.push(output.base([rule], true, 0, ' ', ' ', ' ', '', true));
  }

  return result.join('\n\n');
};

output.compressed = function(flatRules) {
  return output.base(flatRules, true, 0, '', '', '', '', true);
};

var compile = function(options, rules, callback) {
  if (typeof rules === 'function') {
    return rules(function(asyncRules) {
      compile(options, asyncRules, callback);
    }, util);
  }

  resolve(flatten(unwrapRules(rules)), function(result) {
    callback(output[options.outputStyle](result));
  });
};

module.exports = function(options) {
  options = options || {};

  if (!options.outputStyle || options.outputStyle === 'base' || !output[options.outputStyle]) {
    options.outputStyle = 'nested';
  }

  return {
    compile: compile.bind(this, options)
  };
};
