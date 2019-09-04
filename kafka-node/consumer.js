const kafka = require('kafka-node'),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient({kafkaHost: 'localhost:9092', requestTimeout: 5000}),
  consumer = new Consumer(
    client,
    [
      { topic: 'my-topic', partition: 0 },
    ],
    {
      autoCommit: false
    }
  );

consumer.on('message', function (message) {
  console.log(message);
});