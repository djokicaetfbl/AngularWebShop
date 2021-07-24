import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Category } from "../categories/category.model";


/*
We will be using HttpParams to add the URL Parameter, which is then used by the GET , POST , PUT & PATCH etc methods to send an HTTP request to the back end API
 */

