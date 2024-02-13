import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  canonicalUrl: any;

  product: any;

  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.fetchDetail(id).subscribe((data: any) => {
        this.product = data.product;
        this.updateMetaTags(this.product);
      });
    });
  }

  fetchDetail(id: string) {
    return this.http.get(
      `https://prickly-earrings-cow.cyclic.app/api/products/get/${id}`
    );
  }

  /// metadata
  updateMetaTags(res: any) {
    let formatCanonicalLink = `https://ahatechnocrats${
      this.location.path() == '' ? '.com' : '.com' + this.location.path()
    }`;
    this.title.setTitle(res.title);
    this.meta.updateTag({ name: 'keywords', content: res.title });
    this.meta.updateTag({ name: 'description', content: res.description });
    this.meta.updateTag({ name: 'og:title', content: res.title });
    this.meta.updateTag({
      property: 'og:description',
      content: res.description,
    });
    this.meta.updateTag({ property: 'og:url', content: formatCanonicalLink });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'aha technocrats',
    });

    this.meta.updateTag({
      property: 'og:image',
      content:
        'https://api.ahatechnocrats.com/wp-content/uploads/2023/06/laundry-product.png',
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content:
        'https://api.ahatechnocrats.com/wp-content/uploads/2023/06/laundry-product.png',
    });

    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    this.meta.updateTag({ property: 'og:type', content: 'Website' });
    this.meta.updateTag({ name: 'fb:app_id', content: '1040935519256798' });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'twitter:card',
    });
    this.meta.updateTag({ name: 'twitter:title', content: res.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: res.description,
    });
    this.meta.updateTag({ name: 'twitter:url', content: formatCanonicalLink });

    // selecting cononical rel
    const canonicalLink: HTMLLinkElement = this.document.querySelector(
      'link[rel="canonical"]'
    )!;

    // if exits
    if (canonicalLink) {
      canonicalLink.href = formatCanonicalLink;
    } else {
      // Create the <link rel="canonical"> tag if it doesn't exist
      const newCanonicalLink = this.document.createElement('link');
      /// adding rel attribute to link tag
      newCanonicalLink.rel = 'canonical';
      // adding href attribute to link tag with value
      newCanonicalLink.href = formatCanonicalLink;
      this.document.head.appendChild(newCanonicalLink);
    }
  }
}
