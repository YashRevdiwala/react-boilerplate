module.exports = {
  apps: [
    {
      name: 'react-boiler',
      script: 'node',
      args: 'server.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
