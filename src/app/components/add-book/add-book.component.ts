import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  listaktif = [{
    val: false,
    text: 'Tidak Aktif'
  },
  {
    val: true,
    text: 'Aktif'
  }
  ];

  listkategori = [{
    name: 'Fiksi',
    code: 'fik'
  },
  {
    name: 'Thriller',
    code: 'thril'
  },
  {
    name: 'Comedy',
    code: 'come'
  }];

  book: Book = {
    judul: '',
    kategori: this.listkategori[0].code,
    harga: 0,
    penulis: '',
    penerbit: '',
    // tslint:disable-next-line: variable-name
    jumlah_stok: 0,
    sinopsis: '',
    gambar: '',
    aktif: false,
  };

  submitted = false;

  constructor(private tutorialService: BookService) { }

  ngOnInit(): void {
  }

  saveBook(): void {
    const data = {
      judul: this.book.judul,
      kategori: this.book.kategori,
      harga: this.book.harga,
      penulis: this.book.penulis,
      penerbit: this.book.penerbit,
      // tslint:disable-next-line: variable-name
      jumlah_stok: this.book.jumlah_stok,
      sinopsis: this.book.sinopsis,
      gambar: this.book.gambar,
      aktif: this.book.aktif,
    };

    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      judul: '',
      kategori: '',
      harga: 0,
      penulis: '',
      penerbit: '',
      // tslint:disable-next-line: variable-name
      jumlah_stok: 0,
      sinopsis: '',
      gambar: '',
      aktif: false,
    };
  }

}
