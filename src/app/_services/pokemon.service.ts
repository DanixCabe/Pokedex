import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonList } from '../_models/pokemon.list';
import { PokemonDetail } from '../_models/pokemon.detail';
import { map } from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    public url: string
    constructor(
        public http: HttpClient
    ) {
        this.url = 'https://pokeapi.co/api/v2/'
    }

    getPokemonList(offset: number, limit: number = 20): Observable<PokemonList[]>{
        return this.http.get<PokemonList[]>(this.url + 'pokemon?offset=' + offset + '&limit=' + limit)
        .pipe(
            map((x:any) => x.results) 
        );
        /* return this.http.get(this.url+'pokemon/'+id).toPromise(); */
    }

    getPokemonDetail(pokemon: number | string): Observable<PokemonDetail>{
        return this.http.get<PokemonDetail>(this.url + 'pokemon/' + pokemon)
    }
}
