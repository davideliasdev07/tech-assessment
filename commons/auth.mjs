export default function generateTypedAuth(challenge) {
    const domain = {
        name: "blockchain game",
        version: '1',
        chainId: 31337,
    }

    const types = {
        Challenge: [
            { name: 'challenge', type: 'string' },
            { name: 'website', type: 'string' }
        ]
    }

    const value = {
        "website": 'blockchain-game-nutcloud.vercel.app',
        challenge
    }

    return {
        domain,
        types,
        value
    }
}