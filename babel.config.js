module.exports = {
    presets: [
      ['@babel/env', {
        targets: {
          node: 'current',
          firefox: '60',
          chrome: '64',
          safari: '11.1',
        },
      }],
    ],
  };