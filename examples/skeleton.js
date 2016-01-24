/*
* Skeleton V2.0.4
* Copyright 2014, Dave Gamache
* www.getskeleton.com
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 12/29/2014
*/


/* Table of contents
––––––––––––––––––––––––––––––––––––––––––––––––––
- Grid
- Base Styles
- Typography
- Links
- Buttons
- Forms
- Lists
- Code
- Tables
- Spacing
- Utilities
- Clearing
- Media Queries
*/


module.exports = {

/* Grid
–––––––––––––––––––––––––––––––––––––––––––––––––– */
'.container': {
  position: 'relative',
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
  padding: '0 20px',
  boxSizing: 'border-box'
},

'.column, .columns': {
  width: '100%',
  float: 'left',
  boxSizing: 'border-box'
},

/* For devices larger than 400px */
'@media (min-width: 400px)': {
  '.container': {
    width: '85%',
    padding: '0',
  },
},

/* For devices larger than 550px */
'@media (min-width: 550px)': {
  '.container': {
    width: '80%',
  },
  '.column, .columns': {
    marginLeft: '4%',
  },
  '.column:first-child, .columns:first-child': {
    marginLeft: '0',
  },

  '.one.column, .one.columns': {
    width: '4.66666666667%',
  },
  '.two.columns': {
    width: '13.3333333333%',
  },
  '.three.columns': {
    width: '22%',
  },
  '.four.columns': {
    width: '30.6666666667%',
  },
  '.five.columns': {
    width: '39.3333333333%',
  },
  '.six.columns': {
    width: '48%',
  },
  '.seven.columns': {
    width: '56.6666666667%',
  },
  '.eight.columns': {
    width: '65.3333333333%',
  },
  '.nine.columns': {
    width: '74.0%',
  },
  '.ten.columns': {
    width: '82.6666666667%',
  },
  '.eleven.columns': {
    width: '91.3333333333%',
  },
  '.twelve.columns': {
    width: '100%',
    marginLeft: '0',
  },

  '.one-third.column': {
    width: '30.6666666667%',
  },
  '.two-thirds.column': {
    width: '65.3333333333%',
  },

  '.one-half.column': {
    width: '48%',
  },

  /* Offsets */
  '.offset-by-one.column, .offset-by-one.columns': {
    marginLeft: '8.66666666667%',
  },
  '.offset-by-two.column, .offset-by-two.columns': {
    marginLeft: '17.3333333333%',
  },
  '.offset-by-three.column, .offset-by-three.columns': {
    marginLeft: '26%',
  },
  '.offset-by-four.column, .offset-by-four.columns': {
    marginLeft: '34.6666666667%',
  },
  '.offset-by-five.column, .offset-by-five.columns': {
    marginLeft: '43.3333333333%',
  },
  '.offset-by-six.column, .offset-by-six.columns': {
    marginLeft: '52%',
  },
  '.offset-by-seven.column, .offset-by-seven.columns': {
    marginLeft: '60.6666666667%',
  },
  '.offset-by-eight.column, .offset-by-eight.columns': {
    marginLeft: '69.3333333333%',
  },
  '.offset-by-nine.column, .offset-by-nine.columns': {
    marginLeft: '78.0%',
  },
  '.offset-by-ten.column, .offset-by-ten.columns': {
    marginLeft: '86.6666666667%',
  },
  '.offset-by-eleven.column, .offset-by-eleven.columns': {
    marginLeft: '95.3333333333%',
  },

  '.offset-by-one-third.column, .offset-by-one-third.columns': {
    marginLeft: '34.6666666667%',
  },
  '.offset-by-two-thirds.column, .offset-by-two-thirds.columns': {
    marginLeft: '69.3333333333%',
  },

  '.offset-by-one-half.column, .offset-by-one-half.columns': {
    marginLeft: '52%',
  },
},


/* Base Styles
–––––––––––––––––––––––––––––––––––––––––––––––––– */
/* NOTE
html is set to 62.5% so that all the REM measurements throughout Skeleton
are based on 10px sizing. So basically 1.5rem = 15px :) */
html: {
  fontSize: '62.5%',
},
body: {
  fontSize: '1.5em', /* currently ems cause chrome bug misinterpreting rems on body element */
  lineHeight: '1.6',
  fontWeight: '400',
  fontFamily: '"Raleway", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif',
  color: '#222',
},


/* Typography
–––––––––––––––––––––––––––––––––––––––––––––––––– */
'h1, h2, h3, h4, h5, h6': {
  marginTop: '0',
  marginBottom: '2rem',
  fontWeight: '300',
},
h1: {
  fontSize: '4.0rem',
  lineHeight: '1.2',
  letterSpacing: '-.1rem',
},
h2: {
  fontSize: '3.6rem',
  lineHeight: '1.25',
  letterSpacing: '-.1rem',
},
h3: {
  fontSize: '3.0rem',
  lineHeight: '1.3',
  letterSpacing: '-.1rem',
},
h4: {
  fontSize: '2.4rem',
  lineHeight: '1.35',
  letterSpacing: '-.08rem',
},
h5: {
  fontSize: '1.8rem',
  lineHeight: '1.5',
  letterSpacing: '-.05rem',
},
h6: {
  fontSize: '1.5rem',
  lineHeight: '1.6',
  letterSpacing: '0',
},

/* Larger than phablet */
' @media (min-width: 550px)': {
  h1: {
    fontSize: '5.0rem',
  },
  h2: {
    fontSize: '4.2rem',
  },
  h3: {
    fontSize: '3.6rem',
  },
  h4: {
    fontSize: '3.0rem',
  },
  h5: {
    fontSize: '2.4rem',
  },
  h6: {
    fontSize: '1.5rem',
  },
},

p: {
  marginTop: '0',
},


/* Links
–––––––––––––––––––––––––––––––––––––––––––––––––– */
a: {
  color: '#1EAEDB',
},
'a:hover': {
  color: '#0FA0CE',
},


/* Buttons
–––––––––––––––––––––––––––––––––––––––––––––––––– */
'.button, button, input[type="submit"], input[type="reset"], input[type="button"]': {
  display: 'inline-block',
  height: '38px',
  padding: '0 30px',
  color: '#555',
  textAlign: 'center',
  fontSize: '11px',
  fontWeight: '600',
  lineHeight: '38px',
  letterSpacing: '.1rem',
  textTransform: 'uppercase',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  border: '1px solid #bbb',
  cursor: 'pointer',
  boxSizing: 'border-box',
},

'.button:hover, button:hover, input[type="submit"]:hover, input[type="reset"]:hover, input[type="button"]:hover, .button:focus, button:focus, input[type="submit"]:focus, input[type="reset"]:focus, input[type="button"]:focus': {
  color: '#333',
  borderColor: '#888',
  outline: '0',
},

'.button.button-primary, button.button-primary, input[type="submit"].button-primary, input[type="reset"].button-primary, input[type="button"].button-primary': {
  color: '#FFF',
  backgroundColor: '#33C3F0',
  borderColor: '#33C3F0',
},

'.button.button-primary:hover, button.button-primary:hover, input[type="submit"].button-primary:hover, input[type="reset"].button-primary:hover, input[type="button"].button-primary:hover, .button.button-primary:focus, button.button-primary:focus, input[type="submit"].button-primary:focus, input[type="reset"].button-primary:focus, input[type="button"].button-primary:focus': {
  color: '#FFF',
  backgroundColor: '#1EAEDB',
  borderColor: '#1EAEDB',
},


/* Forms
–––––––––––––––––––––––––––––––––––––––––––––––––– */
'input[type="email"], input[type="number"], input[type="search"], input[type="text"], input[type="tel"], input[type="url"], input[type="password"], textarea, select': {
  height: '38px',
  padding: '6px 10px', /* The 6px vertically centers text on FF, ignored by Webkit */
  backgroundColor: '#fff',
  border: '1px solid #D1D1D1',
  borderRadius: '4px',
  boxShadow: 'none',
  boxSizing: 'border-box',
},
/* Removes awkward default styles on some inputs for iOS */
'input[type="email"], input[type="number"], input[type="search"], input[type="text"], input[type="tel"], input[type="url"], input[type="password"], textarea': {
  '-webkit-appearance': 'none',
     '-moz-appearance': 'none',
          appearance: 'none',
},
textarea: {
  minHeight: '65px',
  paddingTop: '6px',
  paddingBottom: '6px',
},
'input[type="email"]:focus, input[type="number"]:focus, input[type="search"]:focus, input[type="text"]:focus, input[type="tel"]:focus, input[type="url"]:focus, input[type="password"]:focus, textarea:focus, select:focus': {
  border: '1px solid #33C3F0',
  outline: '0',
},
'label, legend': {
  display: 'block',
  marginBottom: '.5rem',
  fontWeight: '600',
},
fieldset: {
  padding: '0',
  borderWidth: '0',
},
'input[type="checkbox"], input[type="radio"]': {
  display: 'inline',
},
'label > .label-body': {
  display: 'inline-block',
  marginLeft: '.5rem',
  fontWeight: 'normal',
},


/* Lists
–––––––––––––––––––––––––––––––––––––––––––––––––– */
ul: {
  listStyle: 'circle inside',
},
ol: {
  listStyle: 'decimal inside',
},
'ol, ul': {
  paddingLeft: '0',
  marginTop: '0',
},
'ul ul, ul ol, ol ol, ol ul': {
  margin: '1.5rem 0 1.5rem 3rem',
  fontSize: '90%',
},
li: {
  marginBottom: '1rem',
},


/* Code
–––––––––––––––––––––––––––––––––––––––––––––––––– */
code: {
  padding: '.2rem .5rem',
  margin: '0 .2rem',
  fontSize: '90%',
  whiteSpace: 'nowrap',
  background: '#F1F1F1',
  border: '1px solid #E1E1E1',
  borderRadius: '4px',
},
'pre > code': {
  display: 'block',
  padding: '1rem 1.5rem',
  whiteSpace: 'pre',
},


/* Tables
–––––––––––––––––––––––––––––––––––––––––––––––––– */
'th, td': {
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #E1E1E1',
},
'th:first-child, td:first-child': {
  paddingLeft: '0',
},
'th:last-child, td:last-child': {
  paddingRight: '0',
},


/* Spacing
–––––––––––––––––––––––––––––––––––––––––––––––––– */
'button, .button': {
  marginBottom: '1rem',
},
'input, textarea, select, fieldset': {
  marginBottom: '1.5rem',
},
'pre, blockquote, dl, figure, table, p, ul, ol, form': {
  marginBottom: '2.5rem',
},


/* Utilities
–––––––––––––––––––––––––––––––––––––––––––––––––– */
'.u-full-width': {
  width: '100%',
  boxSizing: 'border-box',
},
'.u-max-full-width': {
  maxWidth: '100%',
  boxSizing: 'border-box',
},
'.u-pull-right': {
  float: 'right',
},
'.u-pull-left': {
  float: 'left',
},


/* Misc
–––––––––––––––––––––––––––––––––––––––––––––––––– */
hr: {
  marginTop: '3rem',
  marginBottom: '3.5rem',
  borderWidth: '0',
  borderTop: '1px solid #E1E1E1',
},


/* Clearing
–––––––––––––––––––––––––––––––––––––––––––––––––– */

/* Self Clearing Goodness */
'.container:after, .row:after, .u-cf': {
  content: '""',
  display: 'table',
  clear: 'both',
},


/* Media Queries
–––––––––––––––––––––––––––––––––––––––––––––––––– */
/*
Note: 'The best way to structure the use of media queries is to create the queries
near the relevant code. For example, if you wanted to change the styles for buttons
on small devices, paste the mobile query code up in the buttons section and style it
there.
*/


/* Larger than mobile */
' @media (min-width: 400px)': {},

/* Larger than phablet (also point when grid becomes active) */
'@media (min-width: 550px)': {},

/* Larger than tablet */
'@media (min-width: 750px)': {},

/* Larger than desktop */
'@media (min-width: 1000px)': {},

/* Larger than Desktop HD */
'@media (min-width: 1200px)': {},
};
