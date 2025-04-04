import json
from confluent_kafka import Consumer
from pydantic import BaseModel
from shared.models import Ticket

consumer = Consumer({
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'print-service',
    'auto.offset.reset': 'smallest'
})

consumer.subscribe(["print-requests"])

print("STARTING")

try:
    while True:
        msg = consumer.poll(1.0)  # Wait for a message
        if msg is None:
            continue
        if msg.error():
            print(f"Consumer error: {msg.error()}")
            continue

        print(msg.value())
        json_data = msg.value().decode("utf-8")
        print(json.loads(json_data))
        obj = Ticket.model_validate_json(json_data)  # Deserialize JSON using Pydantic
        print(obj)

except KeyboardInterrupt:
        pass

finally:
    # Leave group and commit final offsets
    consumer.close()