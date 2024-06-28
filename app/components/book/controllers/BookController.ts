import { Request, Response } from "express";
import bookService from "../services/BookService.ts";

class BookController {
  async createBook(req: Request, res: Response) {
    const { title, author, genres } = req.body;
    const Book = await bookService.createBook({ title, author, genres });
    return res.json(Book);
  }

  async getBooks(req: Request, res: Response) {
    const Book = await bookService.getBooks();
    return res.json(Book);
  }

  async getBook(req: Request, res: Response) {
    const { id } = req.params;
    const Book = await bookService.getBook({ id: parseInt(id) });
    if (!Book)
      return res.status(404).json({ message: "Не найденно" });
    return res.json(Book);
  }

  async updateBook(req: Request, res: Response) {
    const { id } = req.params;
    const { title, author, genres } = req.body;
    const Book = await bookService.updateBook({ title, author, genres, id: parseInt(id) });

    if (!Book)
      return res.status(404).json({ message: "Не найденно" });

    return res.json(Book);
  }

  async deleteBook(req: Request, res: Response) {
    const { id } = req.params;
    const Book = await bookService.deleteBook({ id: parseInt(id) });
    if (!Book)
      return res.status(404).json({ message: "Не найденно" });
    return res.json("Успешно удаленно");
  }
}

export default new BookController();
