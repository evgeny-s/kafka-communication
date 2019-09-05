const Kafka = require('node-rdkafka');

const producer = new Kafka.Producer({
  'metadata.broker.list': '172.18.0.4:9092',
  'client.id': 'kafka',
  'compression.codec': 'gzip',
  'retry.backoff.ms': 200,
  'message.send.max.retries': 10,
  'socket.keepalive.enable': true,
  'queue.buffering.max.messages': 100000,
  'queue.buffering.max.ms': 1000,
  'batch.num.messages': 1000000,
  'dr_cb': true
});

producer.connect();

producer.on('ready', function() {
  try {
    console.log('Client ready. Trying to produce message: ');

    producer.produce(
      'some-topic',
      null,
      Buffer.from('Some custom message from producer!!!'),
    );

    console.log('Sent!');

  } catch (err) {
    console.error('A problem occurred when sending our message');
    console.error(err);
  }
});

producer.on('delivery-report', function(err, report) {
  // Report of delivery statistics here:
  //
  console.log('Report: ', report);
});

producer.on('event.error', function(err) {
  console.error('Error from producer');
  console.error(err);
});
