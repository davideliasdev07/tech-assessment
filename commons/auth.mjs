export default function generateTypedAuth(challenge) {
    const domain = {
        name: "technical-assessment",
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
        "website": 'technical-assessment-nutcloud.vercel.app',
        challenge
    }

    return {
        domain,
        types,
        value
    }
}