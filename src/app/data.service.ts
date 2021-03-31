import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private hc:HttpClient) { }


  //user services
  //mounya
  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj)

  }
  loginUser(userCredObj):Observable<any>{
    return this.hc.post("/user/login",userCredObj)

  }
  getUser(username):Observable<any>{
    return this.hc.get("/user/getuser/"+username)
  }
  getAllUsers():Observable<any>{
    return this.hc.get("/user/getusers")
  }
  getCartItems(username):Observable<any>{
    console.log("the username is ",username)
    return this.hc.get("/user/getcartitems/"+username);
  }



  //admin services-----------------------------------------------
  //create new book
  addNewBook(obj):Observable<any>{
    //console.log("the data in ds is ",obj)
    return this.hc.post("/admin/addnewbook",obj)
  }

  //get all books
  getAllBooks():Observable<any>{
    return this.hc.get("/admin/getallbooks")
  }

  getBookDetails(book):Observable<any>{
    console.log("the book is ",book)
    return this.hc.get("/admin/bookdetails/"+book)
  }

  editBook(obj):Observable<any>{
    //console.log(obj," in ds")
    return this.hc.put("/admin/updatebook",obj)
  }
  
  deleteBook(obj):Observable<any>{
    console.log(obj," in ds")
    return this.hc.post("/admin/deletebook",obj);
  }

}
