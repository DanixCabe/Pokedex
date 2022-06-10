import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure:false
})
export class FilterPipe implements PipeTransform {

    transform(value: any, args: any): any {
        const resultFilter = [];
        if(!value){
            return [];
        }else{
            for(let pokemons of value){
                if(pokemons.name.toLowerCase().indexOf(args.toLowerCase()) >-1){
                    
                    resultFilter.push(pokemons);
                }else if(String(pokemons.id).toLowerCase().indexOf(args.toLowerCase()) >-1){
                    resultFilter.push(pokemons);
                }
            }
        }
        return resultFilter
    }

}
