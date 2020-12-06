import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  currentBook: Book = {
    judul: '',
    kategori: '',
    aktif: false
  };
  message = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getBook(this.route.snapshot.params.id);
  }

  getBook(id: string): void {
    this.bookService.get(id)
      .subscribe(
        data => {
          this.currentBook = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateAktif(statusAktif: boolean): void {
    const data = {
      judul: this.currentBook.judul,
      kategori: this.currentBook.kategori,
      aktif: statusAktif
    };

    this.bookService.update(this.currentBook.id, data)
      .subscribe(
        response => {
          this.currentBook.aktif = statusAktif;
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  updateBook(): void {
    this.bookService.update(this.currentBook.id, this.currentBook)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  deleteBook(): void {
    this.bookService.delete(this.currentBook.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/books']);
        },
        error => {
          console.log(error);
        });
  }
}
