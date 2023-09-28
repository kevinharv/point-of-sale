import Fastify from 'fastify';

// Instantiate the Fastify server
const fastify = Fastify({
  logger: false
});


// Define routes
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
});



// Start the server
const start = async () => {
  try {
    fastify.listen({ port: 3000, host: '::' }, function (err, address) {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
        fastify.log.info(`Server listening on ${address}`)
    })
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();