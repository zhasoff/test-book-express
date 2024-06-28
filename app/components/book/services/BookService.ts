import { BookInterface } from "../interfaces/BookInterface.ts";
import BookModel from "../models/Book.ts";

class BookService {
  async createBook({ title, author, genres }: BookInterface) {
    try {
      const book = await BookModel.create({ title, author, genres });
      return book;
    } catch (err) {
      console.log(err);
    }
  }

  async getBooks() {
    try {
      const categories = await BookModel.findAll();
      return categories;
    } catch (err) {
      console.log(err);
    }
  }

  async getBook({ id }: BookInterface) {
    try {
      const book = await BookModel.findByPk(id);
      return book;
    } catch (err) {
      console.log(err);
    }
  }

  async updateBook({ title, author, genres, id }: BookInterface) {
    try {
      await BookModel.update({ title, author, genres }, { where: { id } });
      const book = await BookModel.findByPk(id);
      return book;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteBook({ id }: BookInterface) {
    try {
      const book = await BookModel.destroy({ where: { id } });
      return book;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new BookService();
