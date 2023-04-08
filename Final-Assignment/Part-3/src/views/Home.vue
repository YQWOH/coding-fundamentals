<template>
    <div class="flex flex-row justify-center space-x-10 bg-slate-500 h-screen pt-2 pb-2">
        <div class="container bg-indigo-500 h-full w-1/4 rounded-lg">
            <div class="text-white text-center pt-4 text-2xl font-sans italic">Balance</div>
            <div style="justify-items: center; margin-top: 6px;">
                <div style="display: flex; width: 100px; margin: auto;">
                    <select v-model="selectedCurrency" @change="onCurrencyChange" style="border-radius: 5px 0px 0px 5px;">
                        <option v-for="currency in currencyOptions" :key="currency.currency" :value="currency.currency">
                            {{ currency.currency }}
                        </option>
                    </select>
                    <div style="padding: 10px 20px; background-color: white; border-radius: 0px 5px 5px 0px;">{{ total }}</div>
                </div>
            </div>
            <div class="flex space-x-4 justify-center mt-3">
                <div class="ml-3 mb-1 w-15 flex bg-white items-center rounded-lg">
                    <div class="p-2 flex flex-col">
                        <div class="flex">
                            <h2 class="text-center">Income</h2>
                            <div class="material-icons text-lime-400">transit_enterexit</div>
                        </div>
                      <p>{{ selectedCurrency }} <span>{{ inc }}</span></p>
                    </div>
                </div>
                <div class="ml-3 mb-1 w-15 flex bg-white items-center rounded-lg">
                    <div class="p-2 flex flex-col">
                        <div class="flex">
                            <h2 class="text-center">Expense</h2>
                            <div class="material-icons text-purple-300 rotate-180">transit_enterexit</div>
                        </div>
                      <p>{{ selectedCurrency }} <span>{{ exp }}</span></p>
                    </div>
                </div>
                
            </div>
            <div class="flex flex-col pl-10 pr-10 rounded-lg mt-6 relative bg-slate-100" style="height: 383px; overflow-y: auto;">
              <div class="pt-3 font-serif">Recent Transactions</div>
              <div class="flex flex-col justify-center items-center h-4/5 text-center text-slate-300" v-if="empty">
                  <i class="fa fa-tag fa-4x"></i>
                  <p>Start adding <br>a new transaction</p>
              </div>
              <ul ref="transaction_list">
                <li class="flex justify-between pt-3 pb-3 cursor-pointer font-normal" v-for="trans in this.budgetsArr.transaction" :key="trans.id">
                    <Transaction
                        :transClass="trans.class"
                        :transIcon="trans.icon"
                        :transType="trans.type"
                        :transColor="trans.color"
                        :transCurrent="trans.current"
                        :transText="trans.text"
                        :transId="trans.id"
                        @deleteTransaction="deleteTarget"
                    />
                </li>
              </ul>
          </div>
      </div>
      <div class="container h-full w-1/4 rounded-lg" style="background-color: lavenderblush">
          <div class="mt-5 text-center items-center justify-center">
              <div class="flex items-center m-auto justify-center w-3/5 rounded-lg relative text-xl bg-slate-200">
                <span class="abosulte cursor-pointer rounded-lg  w-full bg-purple-500 text-white transition-all duration-500 ease-in-out transform" ref="tab1" @click="selectedTab(1)"> Income
                </span>
                <span class="abosulte cursor-pointer rounded-lg w-full transition-all duration-500 ease-in-out transform" ref="tab2" @click="selectedTab(2)"> Expense
                </span>
              </div>
          
                  <div class="flex flex-rows mt-7 justify-between" v-show="incomeBtn == true">
                    <div class="w-3/5">
                        <input type="radio" class="hidden" name="radio-2" id="tab-1" ref="defaultInc" checked>
                        <label for="tab-3" class="flex flex-col items-center cursor-pointer">
                          <span :class="getColor(1)"  @click="selectedItem(1, $event)">attach_money</span>
                          <p>Salary</p>
                        </label>
                    </div>
                    <div class="w-3/5">
                        <input type="radio" class="hidden" name="radio-2" id="tab-2">
                        <label for="tab-4" class="flex flex-col items-center cursor-pointer">
                          <span :class="getColor(2)" @click="selectedItem(2, $event)">cake</span>
                          <p>Gift</p>
                        </label>
                    </div>
                    <div class="w-3/5">
                        <input type="radio" class="hidden" name="radio-2" id="tab-3">
                        <label for="tab-5" class="flex flex-col items-center cursor-pointer">
                          <span :class="getColor(3)" @click="selectedItem(3, $event)">replay</span>
                          <p>Refund</p>
                        </label>
                    </div>
                    <div class="w-3/5">
                        <input type="radio" class="hidden" name="radio-2" id="tab-4">
                        <label for="tab-6" class="flex flex-col items-center cursor-pointer">
                          <span :class="getColor(4)" @click="selectedItem(4, $event)">extension</span>
                          <p>Others</p>
                        </label>
                    </div>
                  </div>

                  <div class="flex flex-rows mt-7 justify-between" v-show="incomeBtn == false">
                      <div class="w-3/5">
                        <input type="radio" class="hidden" name="radio-3" id="tab-5" ref="defaultExp" checked>
                        <label for="tab-7" class="flex flex-col items-center cursor-pointer">
                          <span :class="getColor(5)" @click="selectedItem(5, $event)">home</span>
                          <p>Rent</p>
                        </label>
                    </div>
                    <div class="w-3/5">
                        <input type="radio" class="hidden" name="radio-3" id="tab-6">
                        <label for="tab-8" class="flex flex-col items-center cursor-pointer">
                          <span :class="getColor(6)" @click="selectedItem(6, $event)">shopping_basket</span>
                          <p>Shopping</p>
                        </label>
                    </div>
                    <div class="w-3/5">
                        <input type="radio" class="hidden" name="radio-3" id="tab-7">
                        <label for="tab-9" class="flex flex-col items-center cursor-pointer">
                          <span :class="getColor(7)" @click="selectedItem(7, $event)">commute</span>
                          <p>Transport</p>
                        </label>
                    </div>
                    <div class="w-3/5">
                        <input type="radio" class="hidden" name="radio-3" id="tab-8">
                        <label for="tab-10" class="flex flex-col items-center cursor-pointer">
                          <span :class="getColor(8)" @click="selectedItem(8, $event)">extension</span>
                          <p>Others</p>
                        </label>
                    </div>
                  </div>

              <div class="flex justify-between m-auto pt-7 items-center w-4/5">
                  <p class="text-4xl" :style=" {color: currentColor }">{{ selectedCurrency }} {{ current }}</p>
                  <button @click="add">
                      <span class="material-icons" style="font-size: 50px; line-height: none;">add_circle</span>
                  </button>
              </div>
          </div>

          <div class="grid grid-cols-3 mt-7 ml-3">
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed">1</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed">2</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed">3</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed">4</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed">5</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed">6</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed">7</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed">8</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed">9</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed" data-action="decimal">.</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" @click="pressed">0</div>
              <div class="text-center w-20 text-3xl p-6 cursor-pointer" data-action="clear" @click="clear"><span class="material-icons">backspace</span></div>
          </div>
      </div>
  </div>
</template>

<script>
import Transaction from "../components/Transaction.vue"
import axios from "axios";

export default {
    /* eslint-disable */
    name: "Home",
    components: {
      Transaction 
  	},
    emits: ['deleteTransaction'],
    data() {
        return {
            current: 0,
            exp: 0,
            inc: 0,
            total: 0,
            currentColor: '#bec8e4',
            empty: true,
            incomeBtn: true,
            icon: 'attach_money',
            text: 'Salary',
            class: 'p-2 bg-red-300 rounded-3xl',
            type: '',
            color: '#a9e61c',
            transaction: [],
            details: [],
            tab: "Income",
            selectCategory: 1,
            budgetsArr: {
            	currency: 0,
                lastCurrency: 0,
            	total: 0,
            	income: 0,
            	expense: 0,
            	transaction: []
          	},
            selectedCurrency: "USD",
            lastCurrency: "USD",
            currencyOptions: []
        }
    }, 
    mounted() {
        this.getBudgets();
        this.inc = this.budgetsArr.income ? this.budgetsArr.income : 0;
        this.exp = this.budgetsArr.expense ? this.budgetsArr.expense : 0;
        this.total = this.budgetsArr.total ? this.budgetsArr.total : 0;
        if (this.budgetsArr.currency === undefined || this.budgetsArr.currency === "") {
            this.selectedCurrency = "USD";
        } else {
            this.selectedCurrency = this.budgetsArr.currency;
        }
        if (this.budgetsArr.lastCurrency === undefined || this.budgetsArr.lastCurrency === "") {
            this.lastCurrency = "USD";
        } else {
            this.lastCurrency = this.budgetsArr.lastCurrency;
        }

        // get your APIKey on https://freecurrencyapi.com/ and replace below
        const apiKey = "";

        axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`)
            .then(response => {
              for (const [key, value] of Object.entries(response.data.data)) {
                this.currencyOptions.push({ currency: key, rate: value });
              }
            })
            .catch(error => {
              console.error(error);
            });

        this.isEmpty();
    },
    computed: {
        updatedTransaction() {
            return this.budgetsArr.transaction;
        }
    },
    methods: {
        balance() {
          if(this.inc % 1 == 0 && this.exp % 1 == 0) {
              this.total = this.inc - this.exp;
              this.budgetsArr.total = this.total;
          } else {
              this.total = (this.inc - this.exp).toFixed(2);
              this.budgetsArr.total = this.total;
          }
      },
      pressed(e) {
          let key = e.target.innerText;
          if (this.current == '0.00' ) {
              this.current = '';
          }
          if( this.current.length >= 6) {
              this.current = 'error!';
          }
          this.current += key;
          this.currentColor = '#5b657a';
      },
      clear() {
          this.current = 0.00;
          this.currentColor = '#bec8e4';
      },
      add() {
          if (this.current == 0.00 || this.current == 0 || this.current.length > 6) {
              console.log('error');
          } else if(this.incomeBtn){
              this.color = '#a9e61c';
              this.type = '+';
              this.template();
              this.budgetsArr.transaction?.push({
                 id: this.budgetsArr.transaction.length,
                 current: this.current,
                 class: this.class,
                 icon: this.icon,
                 color: this.color,
                 type: this.type,
                 text: this.text
              })
              if(this.current % 1 == 0) {
                  this.inc = (Number(this.inc) + Number(this.current)).toFixed(2);
                  this.budgetsArr.income = this.inc;
              } else {
                  this.inc = (Number(this.inc) + Number(this.current)).toFixed(2);
                  this.budgetsArr.income = this.inc;
              }
              
              this.current = 0.00;
              this.currentColor = '#bec8e4';
              this.budgetsArr.currency = this.selectedCurrency;
              this.budgetsArr.lastCurrency = this.lastCurrency;
              this.balance();
              this.saveBudgets();

          } else if(!this.incomeBtn) {
              this.color = '#ff6fb7';
              this.type = '-';
              this.template();
              this.budgetsArr.transaction?.push({
                 id: this.budgetsArr.transaction.length,
                 current: this.current,
                 class: this.class,
                 icon: this.icon,
                 color: this.color,
                 type: this.type,
                 text: this.text
              })
              if(this.current % 1 == 0) {
                  this.exp = Number(this.exp) + Number(this.current);
                  this.budgetsArr.expense = this.exp;
              } else {
                  this.exp = (Number(this.exp) + Number(this.current)).toFixed(2);
                  this.budgetsArr.expense = this.exp;
              }

              this.current = 0.00;
              this.budgetsArr.currency = this.selectedCurrency;
              this.budgetsArr.lastCurrency = this.lastCurrency;
              this.balance();
              this.saveBudgets();
          }
          this.isEmpty();
      },
      deleteTarget(index) {
        if(this.budgetsArr.transaction[index].type === "-") {
            if(this.budgetsArr.transaction[index].current % 1 == 0) {
                this.exp = Number(this.exp) - Number(this.budgetsArr.transaction[index].current);
                this.budgetsArr.expense = this.exp;
            } else if(this.budgetsArr.transaction[index].current % 1 != 0) {
                this.exp = (Number(this.exp) - Number(this.budgetsArr.transaction[index].current)).toFixed(2);
                this.budgetsArr.expense = this.exp;
            }
        } else if(this.budgetsArr.transaction[index].type  === "+") {
            if(this.budgetsArr.transaction[index].current % 1 == 0) {
                this.inc = Number(this.inc) - Number(this.budgetsArr.transaction[index].current);
                this.budgetsArr.income = this.inc;
            } else if(this.budgetsArr.transaction[index].current % 1 != 0){
                this.inc = (Number(this.inc) - Number(this.budgetsArr.transaction[index].current)).toFixed(2);
                this.budgetsArr.income = this.inc;
            }
        }
        this.budgetsArr.transaction.splice(index, 1);
        this.balance();
        if (this.budgetsArr.transaction.length !== 0) {
            for (let i = 0; i < this.budgetsArr.transaction.length; i++)
            this.budgetsArr.transaction[i].id = i;
        }
        this.saveBudgets();
        this.isEmpty();
      },
      template() {
          let template = `
              <div class="flex items-center">
                  <span class=${this.getColor(this.selectCategory)}>${this.icon}</span>
                  <p>${this.text}</p>
              </div>
              <div class="flex items-center">
                  <p style="color: ${this.color}">${this.type} ${this.current}</p>
                  <button id=${this.budgetsArr.transaction.length} class="transaction__bin">
                  <span class="material-icons">delete</span>
                  </button>
              </div>`;
          this.details.unshift(template);
      },
      selectedItem(category, e) {
          this.selectCategory = category;
          this.icon = e.target.innerText;
          this.text = e.target.nextElementSibling.innerText;
          this.class = this.getColor(this.selectCategory);
      },
      getColor(item) {
          if (item !== this.selectCategory) {
            return "material-icons p-2 bg-slate-200 rounded-3xl"
          } else {
            switch(item) {
                case 1: 
                    return "material-icons p-2 bg-red-300 rounded-3xl";
                case 2: 
                    return "material-icons p-2 bg-yellow-100 rounded-3xl";
                case 3: 
                    return "material-icons p-2 bg-blue-300 rounded-3xl";
                case 4: 
                    return "material-icons p-2 bg-green-300 rounded-3xl";
                case 5: 
                    return "material-icons p-2 bg-orange-300 rounded-3xl";
                case 6: 
                    return "material-icons p-2 bg-teal-300 rounded-3xl";
                case 7: 
                    return "material-icons p-2 bg-indigo-300 rounded-3xl";
                case 8: 
                    return "material-icons p-2 bg-violet-300 rounded-3xl";
                default:
                    return "material-icons p-2 bg-slate-200 rounded-3xl";
            }
          }
      },
      selectedTab(id) {
          if(id == 1) {
              this.tab = "Income";
              this.incomeBtn = true;
              this.$refs.defaultInc.checked = true;
              this.$refs.tab1.className = this.$refs.tab1.className + ' bg-purple-500 text-white';
              this.$refs.tab2.classList.remove('bg-purple-500', 'text-white');
              this.selectCategory = 1;
              this.icon = 'attach_money';
              this.text = 'Salary';
              this.class = 'p-2 bg-red-300 rounded-3xl';
          } else if(id == 2) {
              this.tab = "Expense";
              this.incomeBtn = false;
              this.$refs.tab2.className = this.$refs.tab2.className + ' bg-purple-500 text-white';
              this.$refs.tab1.classList.remove('bg-purple-500', 'text-white');
              this.$refs.defaultExp.checked = true;
              this.selectCategory = 5;
              this.icon = 'home';
              this.text = 'Rent';
              this.class = 'p-2 bg-orange-300 rounded-3xl';
          }
      },
      isEmpty() {
          if(this.budgetsArr.transaction.length == 0) {
              this.empty = true;
          } else {
              this.empty = false;
          }
      },
      onCurrencyChange () {
        this.budgetsArr.lastCurrency = this.budgetsArr.currency;
        this.lastCurrency = this.budgetsArr.lastCurrency;
        this.budgetsArr.currency = this.selectedCurrency;
        let currencyRateIndex = this.currencyOptions.findIndex((option) => option.currency === this.selectedCurrency);
        let lastCurrencyIndex = this.currencyOptions.findIndex((option) => option.currency === this.lastCurrency);
        if (currencyRateIndex !== -1 ) {
            let currencyRate = this.currencyOptions[currencyRateIndex].rate;
            let lastCurrencyRate = this.currencyOptions[lastCurrencyIndex].rate;
            this.exp = (Number(this.exp) * 1/Number(lastCurrencyRate) * Number(currencyRate)).toFixed(2);
            this.inc = (Number(this.inc) * 1/Number(lastCurrencyRate) * Number(currencyRate)).toFixed(2);
            this.total = (Number(this.total) * 1/Number(lastCurrencyRate) * Number(currencyRate)).toFixed(2);
            this.budgetsArr.expense = this.exp;
            this.budgetsArr.income = this.inc;
            this.budgetsArr.total = this.total;
            this.budgetsArr.transaction.forEach((trans) => {
                trans.current = (Number(trans.current) * 1/Number(lastCurrencyRate) * Number(currencyRate)).toFixed(2);
                }
            )
        }
        this.saveBudgets();
      },
      getBudgets() {
        if (localStorage.getItem("budgets") === null) {
            this.budgetsArr = {
                lastCurrency: "",
                currency: "",
                total: "",
                income: "",
                expense: "",
                transaction: []
            }
        return;
        }
        this.budgetsArr = JSON.parse(localStorage.getItem("budgets"));
      }, 
      saveBudgets() {
        localStorage.setItem("budgets", JSON.stringify(this.budgetsArr));
      }
  }
}
</script>

<style scoped>
    
</style>