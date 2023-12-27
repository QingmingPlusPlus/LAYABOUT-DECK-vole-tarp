type Card = {
    name: string,
    image: string,
}

interface CardFilter {
    name?: string,
}

function getCardList(filterConfig?: CardFilter) {

    return new Promise<Card[]>(async resolve => {
        const response = await fetch('/card-database/cards.json');
        let data = await response.json()

        if (filterConfig && filterConfig.name) {

            const nameParams = filterConfig.name.toUpperCase()
            data = data.filter((card: Card) => {
                return card.name.toUpperCase().includes(nameParams)
            })

        }

        resolve(data as Card[])
    })
}

export {
    getCardList
}

export type {
    Card, CardFilter
}