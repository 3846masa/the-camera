if (process.env.NODE_ENV !== 'production') {
  const { connectToDevTools } = require('react-devtools-core');
  connectToDevTools({ host: location.hostname });
}
