const kafka = require('kafka-node'),
  Producer = kafka.Producer,
  client = new kafka.KafkaClient({kafkaHost: 'localhost:9092', requestTimeout: 5000}),
  producer = new Producer(client),
  payloads = [
    { topic: 'my-topic', messages: 'hi', partition: 0 },
  ];

producer.on('ready', function () {
  console.log('ready!');

  producer.send(payloads, function (err, data) {
    console.log('message sent!');

    if (err) {
      console.log('error: ', err);
    }

    console.log(data);
  });
});

producer.on('error', function (err) {
  console.log('error: ', err);
});