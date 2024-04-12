

let app = Vue.createApp({ /* Creamos la app de vue. */
        data() {
            return {
                pokemonSearch: new Pokedex.Pokedex(),
                searcherInputElementID: "PokemonSearcher",
                favListKey: "favList",
                favList:new Map(),
                actualPokemon:NaN,
                error:"",
                waitingPok:false
            }
        },
        methods:{
            SetActualPokemon(pokemon){
                this.actualPokemon=pokemon;
            },
            SearchPokemon(){
                this.error="";
                this.waitingPok=true;
                let searchTarget = document.getElementById(this.searcherInputElementID).value;
                try{
                    this.pokemonSearch.getPokemonByName(searchTarget).then(this.ResponseUpdate).catch(this.ErrorUpdate);
                }catch(error){
                    this.waitingPok=false;
                    this.error="Input field must not be empty";
                }
                
            },
            ResponseUpdate(response){
                this.actualPokemon=response;
                this.waitingPok=false;
            },
            ErrorUpdate(msg){
                this.error=msg;
                this.waitingPok=false;
            },
            DeleteDuplicates(array){
                let cleanedSet = new Set(array);
                let cleanedArray= [];

                cleanedSet.forEach((value)=>{
                    cleanedArray.push(value);
                })
                return cleanedArray;
            },
            AddFavourite(){
                this.favList.set(this.actualPokemon.name,this.actualPokemon);
                this.StoreActualFavList();
            },
            RemoveFavourite(){
                this.favList.delete(this.actualPokemon.name);
                this.StoreActualFavList();
            },
            StoreActualFavList(){
                let transformedList = Array.from(this.favList, ([name, value]) => ({ name, value }));
                localStorage.setItem(this.favListKey,JSON.stringify(transformedList));
            }
        },
        beforeMount(){
            let parsedArray = JSON.parse(localStorage.getItem(this.favListKey));
            this.favList = new Map(parsedArray.map((obj)=>[obj.name,obj.value]));
        }
    });
window.addEventListener("load",function(){
    const testMounted = app.mount('#test');
});
    
