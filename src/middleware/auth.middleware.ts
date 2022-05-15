const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from "express";

module.exports.authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        next()
    }


    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({ message: "user is not authorized" })
        }
        const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedData)
        jwt.sign({
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }, (err: any, token: string) => {
            // just save this on localStorage
            // new token generator without payload
            console.log(`RT token ${token}`)
        })

        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Header empty' })
    }

}