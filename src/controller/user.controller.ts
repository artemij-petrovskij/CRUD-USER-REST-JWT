import User from "../model/user.model";
import { Request, Response, NextFunction } from "express";

interface User {
  getUsers(req: Request, res: Response, next: NextFunction): Promise<any>;
  getOneUser(req: Request, res: Response, next: NextFunction): Promise<any>;
  createUser(req: Request, res: Response, next: NextFunction): Promise<any>;
  deleteUser(req: Request, res: Response, next: NextFunction): Promise<any>;
  updateUser(req: Request, res: Response, next: NextFunction): Promise<any>;
}

class UserController implements User {

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const user = await User.findAll();

      res.status(200).json(user);
    } catch (err) {
    
      res.status(500);
    }
  }

  async getOneUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });

    if (user !== null) {
      res.status(200).json(user);
    } else {
      res.status(404).json(`User with id: ${id} does not exist`);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email, password } = req.body;
    await User.create({
      email: email,
      password: password
    });
    res.status(201).send(`User with email: ${email} created successfully`);
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;

    const checkUserIsset = await User.findOne({ where: { id: id } });
    if (checkUserIsset !== null) {
      await User.destroy({
        where: {
          id: id,
        },
      });
      res.status(201).send("User deleted successfully");
    } else {
      res.status(404).send(`User with id: ${id} does not exist`);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email, password } = req.body;
    const { id } = req.params;
    const checkUserIsset = await User.findOne({ where: { id: id } });
    if (checkUserIsset !== null) {
      await User.update(
        {
          email: email,
          password: password,

        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).send(`User with id: ${id} was updated successfully`);

    } else {
      res.status(404).send(`User with id: ${id} not found`);

    }

  }


}

export { UserController };
