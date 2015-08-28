module.exports = (async, util) => async({
  body: {
    color: '#f00'
  },

  a: util({
    color: '#00f',
    '&:hover': {
      fontWeight: 'bold',
      'text-decoration': 'underline'
    }
  }).loop(10, x => ({
    ['loop-' + x]: {
      fontWeight: x
    }
  }))
});
