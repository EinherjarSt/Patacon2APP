// Code extracted of StackOVerflow https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
// and will use to close db pool
// Object to capture process exits and call app specific cleanup function

function noOp() {};

exports.Cleanup = function Cleanup(callback) {

  // attach user callback to the process event emitter
  // if no callback, it will still exit gracefully on Ctrl-C
  callback = callback || noOp;
  process.on('cleanup', callback);

  // do app specific cleaning before exiting
  process.on('exit', function () {
    process.emit('cleanup');
  });

  // catch ctrl+c event and exit normally
  process.on('SIGINT', function () {
    console.log('\nCtrl-C...');
    process.exit(2);
  });

  //catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e);
    process.exit(99);
  });
};