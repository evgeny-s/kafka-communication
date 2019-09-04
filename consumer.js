const Kafka = require('node-rdkafka');

const consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092',
  'rebalance_cb': function (err, assignment) {

    if (err.code === Kafka.CODES.ERRORS.ERR__ASSIGN_PARTITIONS) {
      // Note: this can throw when you are disconnected. Take care and wrap it in
      // a try catch if that matters to you
      this.assign(assignment);
    } else if (err.code === Kafka.CODES.ERRORS.ERR__REVOKE_PARTITIONS) {
      // Same as above
      this.unassign();
    } else {
      // We had a real error
      console.error(err);
    }
  }
});

// Flowing mode
consumer.connect();

consumer
  .on('ready', function () {
    console.log('Consumer ready!!!');

    consumer.subscribe(['some-topic']);

    consumer.consume();
  })
  .on('data', function (data) {
    // Output the actual message contents
    console.log('Accepted new message: ', data);
  });