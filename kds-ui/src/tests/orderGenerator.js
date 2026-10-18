import { faker } from "@faker-js/faker";

export function generateOrder(id) {
    let items = [];

    const numItems = Math.floor(Math.random() * 5) + 1
    for (let i = 0; i < numItems; i++) {
        let subs = []
        const numSubs = Math.floor(Math.random() * 3);
        for (let j = 0; j < numSubs; j++) {
            subs.push(faker.food.ingredient());
        }
        items.push({
            name: faker.food.dish(),
            sub: subs
        })
    }
    
    return {
        id: id,
        ticketNumber: Math.floor(Math.random() * 10000),
        submittedBy: faker.person.firstName(),
        submissionTime: Date.now(),
        orderItems: items
    }
}