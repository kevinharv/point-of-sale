from typing import Any, Dict
from http import HTTPStatus
import json
from faker import Faker

def handler(event: Any, context: Any) -> Dict[str, Any]:
    print(event)
    print(context)

    method: str = event["requestContext"]["http"]["method"]
    path: str = event["requestContext"]["http"]["path"]

    faker = Faker()

    return {
        "statusCode": HTTPStatus.OK,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "method": method,
            "path": path,
            "customer": faker.name(),
            "ticketID": faker.random_int(10000, 1000000),
        })
    }
