import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
export interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  originalPrice: number;
  discountPrice: number;
  category: string;
  brand: string;
  ratings: number;
  stock: number;
  numOfReviews: number;
  reviews: Review[];
  createdAt: string;
}

export interface Review {
  user: string;
  name: string;
  rating: number;
  comment: string;
  _id: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchdata().subscribe((data: any) => {
      this.products = data && data.products;
    });
  }

  fetchdata() {
    return this.http.get(
      'https://prickly-earrings-cow.cyclic.app/api/products/get'
    );
  }
}
