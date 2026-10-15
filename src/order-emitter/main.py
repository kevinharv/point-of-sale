import json
import random
from time import sleep
from datetime import datetime
from faker import Faker

fake = Faker()

def generate_example() -> dict[str, object]:
    return {
        "id": random.randint(100_000, 999_999),
        "metadata": {
            "createdAt": fake.date_time_between(
                datetime.fromisoformat("2025-01-01"), datetime.fromisoformat("2026-01-01")
            ),
            "submittedBy": {
                "username": fake.user_name(),
                "displayName": fake.name(),
            },
        },
        "location": {
            "section": random.choice(["Dining Room", "Patio", "Bar", "To-Go"]),
            "table": f"{fake.random_uppercase_letter()}{random.randint(1, 29)}",
        },
        "items": [
            {
                "id": random.randint(10_000, 14_000),
                "title": random.choice(["Burger", "Hot Dog", "Chicken Sandwhich"]),
                "modifications": random.choices([
                    "No Bacon",
                    "No Mayo",
                    "Add American",
                    "Add Pickles",
                    "Add Peperjack",
                    "No Bun",
                    "Gluten-Free Bun"
                ], k=random.randint(0, 5)),
                "note": "",
            }
        ],
    }


def main():
    while True:
        print(json.dumps(generate_example(), indent=2, default=str))
        sleep(1)


if __name__ == "__main__":
    main()
