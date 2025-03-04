import jwt from 'jsonwebtoken'

// vet authentication middleware
const authVet = async (req, res, next) => {
    const { vtoken } = req.headers
    if (!vtoken) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {
        const token_decode = jwt.verify(vtoken, process.env.JWT_SECRET)
        req.body.vetId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authVet;