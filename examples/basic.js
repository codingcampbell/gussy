module.exports = function(async) {
  async({
    body: {
      color: '#f00'
    },

    a: {
      color: '#00f',
      '&:hover': {
        fontWeight: 'bold',
        'text-decoration': 'underline'
      }
    }
  });
};
