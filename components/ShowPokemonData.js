app.component("showpokemondata",{
    props:[
        "name",
        "order",
        "weight",
        "stats",
        "spriteURL",
        "onList"
    ],

    template:`
        <div id="SearchResult">
            <img :src="spriteURL">
            <ul>
                <li>name: {{name}}</li>
                <li>Pokedex number: {{order}}</li>
                <li>Weight: {{weight}}</li>
                <li>Stats
                    <ul>
                        <li v-for="(item,index) in stats">
                            {{item.stat.name}}: {{item.base_stat}}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <input type="button" value="Remove Favourite" v-if="onList" @click="$emit('removeFav')">
        <input type="button" value="Add Favourite" v-else @click="$emit('addFav')">
    `
});