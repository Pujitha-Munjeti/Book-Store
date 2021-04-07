import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {


  username;
  wishlist=[];
  book;
  userCartSize;
  b: any;
  constructor(private ds:DataService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {

    this.username=localStorage.getItem("username")
    
    this.getWishlist();
    this.cartStatus();
  }

  getWishlist(){
    this.ds.getWishlistItems(this.username).subscribe(
      res=>{
        this.wishlist=res.message
        //console.log("the wishlist items",this.wishlist)
      },
      err=>{
        this.toastr.error("Something went wrong in Adding Course")
        console.log(err)
      }
    )
  }

  cartStatus(){
    this.ds.getCartSize(this.username).subscribe(
      res=>{
        this.userCartSize=res.cartsize;
      },
      err=>{
        this.toastr.error("Something went wrong in getting all products")
        console.log(err)
      }
    )

  }

  additem(b){
    console.log("books is ",b.booktitle)
    if(this.username!==null){
      let obj={
      username:this.username,
      booktitle:b.booktitle,
      author:b.author,
      paperback:b.paperback,
      price:b.price,
      publisher:b.publisher,
      publicationdate:b.publicationdate,
      rating:b.rating,
      category:b.category,
      description:b.description,
      bookImgLink:b.bookImgLink,
      quantity:1
      }
      //console.log("the obj ",obj)
     
      //console.log("this new obj is ",obj)
      this.ds.usercart(obj).subscribe(
        res=>{
          if(res.message=="book already existed"){
            this.toastr.warning("book is already there in cart")
           
          }
          else{
            this.toastr.success("book added to cart")
            this.cartStatus();
          }
         
        },
        err=>{
          this.toastr.error("Something went wrong in Adding book")
        console.log(err)
        }
      )
     
    }
   
  }
  delete(n:number){
    let obj=this.wishlist[n];
    console.log("the deleted obj is ",obj)

    this.ds.deleteWishlistProduct(obj).subscribe(
      res=>{
        if(res.message){
          this.toastr.success("Product removed from usercart")
          window. location. reload ();
        }
      },
      err=>{
        this.toastr.error("Something went wrong in user creation");
        console.log(err);
      }
    )
  }


}
