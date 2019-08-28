import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {
    this.getPokemon();
  }
  getPokemon() {
    let poke_request = '';
    const bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    bulbasaur.subscribe(<Hit>(data) => {
      console.log('Captured bulbasaur!', data);
      console.log('bulbasaur has the ability ' + data.abilities[1].ability.name);
      poke_request = data.abilities[1].ability.url;
      const pokes = this._http.get(poke_request);
      pokes.subscribe(<Ability>(result) => {
        console.log(result.pokemon.length + ' other Pokemone also have ' + data.abilities[1].ability.name + ' as well ');
        });
      });
    }
  }
  interface Hit {
    abilities: Object[];
  }
  interface Ability {
    pokemone: Object[];
  }