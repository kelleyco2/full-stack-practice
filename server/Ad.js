module.exports = {
    addToDB: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { email, image, rate, per } = req.body 
    
            let response = await db.addAd([image, rate, per, email])

            delete response[0].password

            res.status(200).send(response)

        } catch(error) {
            console.log('Error adding advertisement to the database', error)
            res.status(500).send(error)
        }
    }
}