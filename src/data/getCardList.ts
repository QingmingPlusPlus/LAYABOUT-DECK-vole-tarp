type Card ={
    name:string,
    image:string,
}
function getCardList() {
    return new Promise<Card[]>(async resolve => {
        const response = await fetch('/card-database/cards.json');
        const data = await response.json()

        resolve(data as Card[])
    })
}

export {
    getCardList
}

export  type {Card}