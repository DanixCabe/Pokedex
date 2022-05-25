import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { PokemonDetail } from 'src/app/_models/pokemon.detail';
import { PokemonList } from 'src/app/_models/pokemon.list';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { PokemonService } from 'src/app/_services/pokemon.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

declare var $;

@Component({
    selector: 'app-pokedex',
    templateUrl: './pokedex.component.html',
    styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
    search: FormControl = new FormControl('');

    public pokemonDetail: PokemonDetail = new PokemonDetail();

    public missingno: boolean = false;
    public pokeSearch: any;
    public pokedex:any = [];

    public loading: boolean = false;

    public pokemons: PokemonDetail[] = [];

    public list: PokemonList[] = [];

    public searchPokemon: PokemonDetail = new PokemonDetail();

    public offset:number = 0;
    public isLastPage: boolean = false;

    public isSearching = false;

    constructor(
        private _pokemonService: PokemonService,
        private matDialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getListPokemon(this.offset)
    }

    

   
    getListPokemon(offset: number) {
        if(!this.loading && !this.isLastPage) {
            this.loading = true;
            this._pokemonService.getPokemonList(offset)
            .subscribe((list: PokemonList[])=>{
                if(list.length === 0){
                    this.isLastPage = true;
                }
                
                if(!this.isLastPage){
                    this.getPokemon(list)
                }
            });
        }
    }

    

    onScroll(event: Event): void {
        const element: HTMLDivElement = event.target as HTMLDivElement;
        if(element.scrollHeight - element.scrollTop < 1000) {
            
            this.getListPokemon(this.offset);

        }
    }

    private getPokemon(list: PokemonList[]) {
        const arr: Observable<PokemonDetail>[] = [];
        list.map((value: PokemonList) => {
            arr.push(
                this._pokemonService.getPokemonDetail(value.name)
            );
        });

        forkJoin([...arr]).subscribe((pokemons: []) => {
            this.pokemons.push(...pokemons);
            this.offset +=20;
            this.loading = false;
        })

    }


    onSearchPokemon(form): void {
        let self = this;
        if(this.pokeSearch === '' || this.pokeSearch === undefined) {
            this.loading = true;
            setTimeout(function(){
                self.isSearching = false;
                self.missingno = false;
                self.loading = false;
            },2000)
        }else{
            this.loading = true;
            this.missingno = false;
            this._pokemonService.getPokemonDetail(this.pokeSearch)
            .subscribe((pokemon: PokemonDetail) => {
                self.isSearching = true;
                setTimeout(function(){
                    self.loading = false;
                },2000)
                this.searchPokemon = pokemon;
                console.log(this.searchPokemon)
            }, (error: any) => {
                this.loading = true;
                setTimeout(function(){
                    console.log('asdasd')
                    self.loading = false;
                    self.isSearching = true;
                    self.missingno = true;
                },2000)


            })
        }
    }
    

    getPrincipalType(types){
        return types.filter(x=> x.slot ===1)[0].type.name
    }

    onDetail(pokemon: PokemonDetail){
        this.matDialog.open(PokemonComponent,{
            width:'500px',
            height:'520px',
            data:pokemon
        })
    }

}
