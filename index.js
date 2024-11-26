import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const getRandomInterval = (minMinutes, maxMinutes) => {
    const min = minMinutes * 60 * 1000
    const max = maxMinutes * 60 * 1000
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const run = async () => {
    try {
        await getDust(process.env.SESSION)
    } catch (error) {
        console.error(error)
    }
}

const getDust = async (sessionParam) => {
    const baseUrl = 'https://api.tonverse.app'
    const collectUri = '/galaxy/collect'

    await collect(baseUrl, collectUri, sessionParam)
}

const collect = async (baseUrl, collectUri, sessionParam) => {
    axios.get(baseUrl + collectUri, {
        params: {
            session: sessionParam
        }
    }).then(response => {
        if (response.data.response.success) {
            console.log(`Собрано ${response.data.response.dust} пыли`)
        }
    })
}

await run()

setTimeout(async function update() {
    try {
        await getDust(process.env.SESSION)
    } catch (error) {
        console.error(error)
    }

    const nextInterval = getRandomInterval(30, 60)
    setTimeout(update, nextInterval)
}, getRandomInterval(30, 60))