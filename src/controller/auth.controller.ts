import User from "../model/user.model";
import { Request, Response } from "express";
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')


interface Auth {
    loginUser(req: Request, res: Response): Promise<any>;
    signupUser(req: Request, res: Response): Promise<any>;

}

class UserAuth implements Auth {

    async loginUser(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (user !== null && bcrypt.compareSync(password, user.password)) {

                jwt.sign({
                    email
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }, (err: any, token: string) => {

                    res.status(200).json({
                        message: `Welcome user with email: ${email.trim()}`,
                        token: token
                    })

                })
            } else {
                res.status(404).json({ res: `User with email: ${email} not found or does not exist` });
            }
        } catch (err) {
            console.error(`Server error ` + err);
            res.status(500).json({ 'error': err })
        }
    }

    async signupUser(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email.trim() } });

            if (user !== null) {
                res.status(404).json({ res: `User with email: ${email.trim()} already exist` });
            } else {
                const salt = bcrypt.genSaltSync(10)

                await User.create({
                    email: email.trim(),
                    password: bcrypt.hashSync(password, salt)
                });

                jwt.sign({
                    email
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }, (err: any, token: string) => {

                    res.status(201).json({
                        message: `User with email: ${email.trim()} created successfully`,
                        token: token
                    })

                })
            }
        } catch (err) {
            console.error(`Server error ` + err);
            res.status(500).json({ 'error': err })
        }
    }



}

export { UserAuth };
