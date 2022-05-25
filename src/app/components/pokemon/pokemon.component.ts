import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { PokemonDetail } from 'src/app/_models/pokemon.detail';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
declare var $;

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
    public pokemon: PokemonDetail;
    public stats:any = [6];
    public height: number;
    public weight: number;       

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.pokemon = data;
    }

    ngOnInit(): void {
        this.setStats();
    }

    getAbilities(): string {
        return this.pokemon.abilities.map(x => x.ability.name).join(', ');
    }
    
    getPrincipalType(list: any[]) {
        return list.filter(x => x.slot === 1)[0]?.type.name;
    }

    setStats(){
        for (let i = 0; i < this.pokemon.stats.length; i++) {
            if(this.pokemon.stats[i].base_stat > 100){
                this.stats[i] = 100;
            }else{
                this.stats[i] = this.pokemon.stats[i].base_stat;
            }
        }
        this.height = (Number(this.pokemon.height)*10)/100
        this.weight = this.pokemon.weight/10
        
    }
    

}
