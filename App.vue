<script setup>
//Composition Api
import {ref, computed, reactive} from 'vue';

const count = ref(0) //Ref support all (array, objects, strings, integers etc)
const state = reactive({count: 0}) //Reactive can only use Objects and Array
const increment = () =>{ 
	state.count++ //Reactive No need .value to get the value
}
const msg = ref('Message')
const truth = ref(false)
const flavors = ref([])
const priority = ref('')
const attitude = ref(true)
const disable = ref(true)
//Supported Object Keys as Item ID
/*const items = ref({
	'itemID-1': {id:1, label: 'Shoes are good'},
	'itemID-2': {id:2, label: 'WAter is H2o'},
	'itemID-3': {id:3, label: 'I love Programming'}
})*/
const countCharacter = computed(()=>{ 
	return newItem.value.length;
})
const reverseItems = computed(()=>{ //Computed should only modify existing Data
	//return items.value.reverse(); //May Cause Bug since Reverse Change the Data
	return [...items.value].reverse(); //Using spread operator to Clone the Array and Change it from the Clone
					   //Better approach less Bug
})
const newItem = ref("")
const items = ref([
	{id:1, label: 'Shoes are good', remove: false},
	{id:2, label: 'WAter is H2o', remove: true},
	{id:3, label: 'I love Programming', remove: false}
])

const substractButton = () =>{
	count.value = count.value - 1;
}
const addButton = () => {
	count.value = count.value + 1;
}
const toggleRemove = (remove) =>{
	remove = !remove;
}
</script>
<!-- script>
//Options Api
export default ({
     data(){
         return {
	    count: 0,
	    msg: 'Message',
	    /* items: [
		{id:1, label: 'Shoes are good'},
        	{id:2, label: 'WAter is H2o'},
        	{id:3, label: 'I love Programming'}
	    ],*/
	    /* Supported Object Keys as Item ID */
	    items: {
        	'itemID-1': {id:1, label: 'Shoes are good'},
        	'itemID-2': {id:2, label: 'WAter is H2o'},
        	'itemID-3': {id:3, label: 'I love Programming'}
		}
	 }
     },
     methods: {
	substractButton(){
	    this.count = this.count - 1;
	},
	addButton(){
	    this.count = this.count + 1;
	}
     }
})
</script -->
<template>
  <main>
    	<h2>Counter: {{ count }}</h2>
	<h2>Increment: {{ state.count }}</h2>
	<h2>Message 1:{{ msg.toLocaleUpperCase() }}</h2>
	<h2>Message 2: {{ msg || 'Empty String' }}</h2>
	<h2>Truth: {{ truth }}</h2>
	<h2>Flavors: {{ flavors }}</h2>
	<h2>Priority: {{ priority }}</h2>
	<h2 v-if="attitude" >Attitude: Bad </h2>
	<h2 v-else >Attitude: Good </h2>
	<!-- Dapat Unique ang Key, hindi pwedeng Default Index -->
	<h3>List of Items</h3>
	<ul>
		<li v-for="item in reverseItems" :key="item.id"
		:class="{strikethrough: item.remove}">
			{{item.label}}
		</li>
	</ul>
	<br>
	<!-- Different Format to Render -->
	<ul>
		<li v-for="{id, label, remove} in items" :key="id"
		@click="toggleRemove(remove)"
		:class="{strikethrough: remove}">
			id:{{id}}-{{label}}
		</li>
	</ul>
	<br>
	<!-- Access Array Index -->
	<ul>
		<li v-for="({id, label, remove}, index) in items" :key="id"
		:class="{strikethrough: remove}">
			index:{{index}}-{{label}}
		</li>
	</ul>
	<button @click='increment'>Increment</button>
	<br>
	<button @click='count--'>Counter -</button>
	<button @click='count++'>Counter +</button>
	<br>
	<button @click='substractButton'>Counter Decrement</button>
	<button @click='addButton'>Counter Increment</button>
	<br>
	<input type='text' v-model='msg' />
	<br>
	Trim: <input type='text' v-model.trim='msg' placeholder="Trim"/>
	<br>
	Lazy: <input type='text' v-model.lazy='msg' @keyup="enter" placeholder="Lazy"/>
	<br>
	Truth: <input type='checkbox' v-model='truth'/>
	<br>
	Flavors: Strawberry <input type='checkbox' v-model='flavors' value="strawberry"/>
	Chocolate <input type='checkbox' v-model='flavors' value="chocolate"/>
	<br>
	Priority: Low <input type='radio' v-model='priority' value="Low"/>
	High <input type='radio' v-model='priority' value="High"/>
	<br>
	Enter Event: <input type='text' v-model="newItem" v-on:keyup.enter="items.push({id: items.length + 1, label: newItem})" placeholder="Items"/>
	<br>
	Form: <form
	v-on:submit.prevent="items.push({id: items.length + 1, label: newItem})"
	>
	<input type='text' v-model="newItem" placeholder="Items"/>
	<button>Save Item</button>
	</form>
	Attitude <button @click="attitude = !attitude">Toggle</button>
	<br>
	<input type="text" v-bind:readonly="disable" v-bind:placeholder="disable ? 'Disabled' : 'Enabled'" /><button @click="disable = !disable">Enable/Disable</button>
	<br>
	<input type='text' v-model="newItem" placeholder="Chacter Counter"/><p>{{countCharacter}}/100</p>

  </main>
</template>

<style scoped>
.strikethrough {
	text-decoration: line-through
}
</style>
