const Kafka = require('node-rdkafka');

const client = Kafka.AdminClient.create({
  'client.id': 'admin',
  'metadata.broker.list': 'localhost:9092'
});

client.createTopic({
  topic: 'some-topic',
  num_partitions: 1,
  replication_factor: 1
}, function(err) {
  console.log('Error creating topic. Details: ', err);
});