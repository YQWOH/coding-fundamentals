<template>
    <div class="flex flex-row justify-center space-x-10 bg-slate-500 h-screen pt-2 pb-2">
        <div class="container bg-indigo-500 h-full w-1/4 rounded-lg">
            <div class="text-white text-center pt-4 text-2xl font-sans italic">Balance</div>
            <div class="text-white text-center pt-4 text-3xl">MYR <span>{{ total }}</span></div>
            <div class="flex space-x-4 justify-center mt-3">
                <div class="ml-3 mb-1 w-15 flex bg-white items-center rounded-lg">
                    <div class="p-2 flex flex-col">
                        <div class="flex">
                            <h2 class="text-center">Income</h2>
                            <div class="material-icons text-lime-400">transit_enterexit</div>
                        </div>
                      <p>MYR <span>{{ inc }}</span></p>
                    </div>
                </div>
                <div class="ml-3 mb-1 w-15 flex bg-white items-center rounded-lg">
                    <div class="p-2 flex flex-col">
                        <div class="flex">
                            <h2 class="text-center">Expense</h2>
                            <div class="material-icons text-purple-300 rotate-180">transit_enterexit</div>
                        </div>
                      <p>MYR <span>{{ exp }}</span></p>
                    </div>
                </div>
                
            </div>
            <div class="flex flex-col pl-10 pr-10 rounded-lg mt-6 relative bg-slate-100 h-96">
                <div class="pt-3 font-serif">Recent Transactions</div>
                <div class="flex flex-col justify-center items-center h-4/5 text-center text-slate-300" v-if="empty">
                    <i class="fa fa-tag fa-4x"></i>
                    <p>Start adding <br>a new transaction</p>
                </div>
                <ul>
                  <li class="flex justify-between pt-3 pb-3 cursor-pointer font-normal" v-for="(detail, index) in details" v-html="detail" @click="deleteTarget(index)" :key="index.id">
                  </li>
                </ul>
            </div>
        <!-- <img src="../assets/logo.png" alt=""> -->
        </div>
        <div class="container bg-white h-full w-1/4 rounded-lg">
            <!-- <img src="../assets/logo.png" alt=""> -->
            <div class="mt-5 text-center items-center justify-center">
                <div class="flex items-center m-auto justify-center w-3/5 rounded-lg relative text-xl bg-slate-200">
                  <span class="abosulte cursor-pointer rounded-lg  w-full bg-purple-500 text-white transition-all duration-500 ease-in-out transform" ref="tab1" @click="selectedTab(1)"> Income
                    <!-- <input type="radio" class="hidden w-full" name="radio" id="tab-1" checked> -->
                    <!-- <label for="tab-1" class="z-300 cursor-pointer text-center transition-all duration-500 ease-in-out transform translate-x-0 hover:text-primary" @click="selectedTab(1)">Income</label> -->
                  </span>
                  <span class="abosulte cursor-pointer rounded-lg w-full transition-all duration-500 ease-in-out transform" ref="tab2" @click="selectedTab(2)"> Expense
                    <!-- <input type="radio" class="hidden" name="radio" id="tab-2"> -->
                    <!-- <label for="tab-2" class="pt-3 pb-3 z-300 cursor-pointer w-1/2 text-center transition-all duration-500 ease-in-out transform translate-x-full text-gray-600 hover:text-primary" @click="selectedTab(2)">Expense</label> -->
                  </span>
                </div>
            
                <!-- <div class="text-center"> -->
                    <div class="flex flex-rows mt-7 justify-between" v-show="incomeBtn == true">
                      <div class="w-3/5">
                          <input type="radio" class="hidden" name="radio-2" id="tab-3" ref="defaultInc" checked>
                          <label for="tab-3" class="flex flex-col items-center cursor-pointer">
                            <span class="material-icons p-2 bg-yellow-100 rounded-3xl" @click="selectedItem">attach_money</span>
                            <p>Salary</p>
                          </label>
                      </div>
                      <div class="w-3/5">
                          <input type="radio" class="hidden" name="radio-2" id="tab-4">
                          <label for="tab-4" class="flex flex-col items-center cursor-pointer">
                            <span class="material-icons p-2 bg-yellow-100 rounded-3xl" @click="selectedItem">cake</span>
                            <p>Gift</p>
                          </label>
                      </div>
                      <div class="w-3/5">
                          <input type="radio" class="hidden" name="radio-2" id="tab-5">
                          <label for="tab-5" class="flex flex-col items-center cursor-pointer">
                            <span class="material-icons p-2 bg-yellow-100 rounded-3xl" @click="selectedItem">replay</span>
                            <p>Refund</p>
                          </label>
                      </div>
                      <div class="w-3/5">
                          <input type="radio" class="hidden" name="radio-2" id="tab-6">
                          <label for="tab-6" class="flex flex-col items-center cursor-pointer">
                            <span class="material-icons p-2 bg-yellow-100 rounded-3xl" @click="selectedItem">extension</span>
                            <p>Others</p>
                          </label>
                      </div>
                    </div>

                    <div class="flex flex-rows mt-7 justify-between" v-show="incomeBtn == false">
                        <div class="w-3/5">
                          <input type="radio" class="hidden" name="radio-3" id="tab-7" ref="defaultExp" checked>
                          <label for="tab-7" class="flex flex-col items-center cursor-pointer">
                            <span class="material-icons p-2 bg-yellow-100 rounded-3xl" @click="selectedItem">home</span>
                            <p>Rent</p>
                          </label>
                      </div>
                      <div class="w-3/5">
                          <input type="radio" class="hidden" name="radio-3" id="tab-8">
                          <label for="tab-8" class="flex flex-col items-center cursor-pointer">
                            <span class="material-icons p-2 bg-yellow-100 rounded-3xl" @click="selectedItem">shopping_basket</span>
                            <p>Shopping</p>
                          </label>
                      </div>
                      <div class="w-3/5">
                          <input type="radio" class="hidden" name="radio-3" id="tab-9">
                          <label for="tab-9" class="flex flex-col items-center cursor-pointer">
                            <span class="material-icons p-2 bg-yellow-100 rounded-3xl" @click="selectedItem">commute</span>
                            <p>Transport</p>
                          </label>
                      </div>
                      <div class="w-3/5">
                          <input type="radio" class="hidden" name="radio-3" id="tab-10">
                          <label for="tab-10" class="flex flex-col items-center cursor-pointer">
                            <span class="material-icons p-2 bg-yellow-100 rounded-3xl" @click="selectedItem">extension</span>
                            <p>Others</p>
                          </label>
                      </div>
                    </div>
                <!-- </div> -->

                <div class="flex justify-between m-auto pt-7 items-center w-4/5">
                    <p class="text-4xl" :style=" {color: currentColor }">MYR {{ current }}</p>
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
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    data() {
        return {
            current: '0.00',
            exp: 0,
            inc: 0,
            total: 0,
            currentColor: '#bec8e4',
            empty: true,
            incomeBtn: true,
            icon: 'attach_money',
            text: 'Salary',
            class: 'p-2 bg-yellow-100 rounded-3xl',
            type: '',
            color: '#a9e61c',
            transaction: [],
            details: [],
            tab: "Income"
        }
    }, 
    methods: {
        balance() {
            if(this.inc % 1 == 0 && this.exp % 1 == 0) {
                this.total = this.inc - this.exp;
            } else {
                this.total = (this.inc - this.exp).toFixed(2);
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
            this.current = '0.00';
            this.currentColor = '#bec8e4';
        },
        add() {
            if (this.current == 0 || this.current.length > 6) {
                console.log('error');
            } else if(this.incomeBtn){
                console.log("this.incomeBtn", this.incomeBtn);
                this.transaction.unshift(+ this.current);
                this.color = '#a9e61c';
                this.type = '+';
                this.template();

                if(this.current % 1 == 0) {
                    this.inc = Number(this.inc) + Number(this.current);
                } else {
                    this.inc = (Number(this.inc) + Number(this.current)).toFixed(2);
                }
        
                this.current = '0.00';
                this.currentColor = '#bec8e4';
                this.balance();

            } else if(!this.incomeBtn) {
                this.transaction.unshift(- this.current);
                this.color = '#ff6fb7';
                this.type = '-';
                this.template();

                if(this.current % 1 == 0) {
                    this.exp = Number(this.exp) + Number(this.current);
                } else {
                    this.exp = (Number(this.exp) + Number(this.current)).toFixed(2);
                }

                this.current = '0.00';
                this.balance();
            }
            this.isEmpty();
        },
        deleteTarget(index) {
            if(this.transaction[index] < 0) {

                if(this.transaction[index] % 1 == 0) {
                    this.exp = Number(this.exp) + Number(this.transaction[index]);
                } else if(this.transaction[index] % 1 != 0) {
                    this.exp = (Number(this.exp) + Number(this.transaction[index])).toFixed(2);
                }

            } else if(this.transaction[index] > 0) {

                if(this.transaction[index] % 1 == 0) {
                    this.inc = Number(this.inc) - Number(this.transaction[index]);
                } else if(this.transaction[index] % 1 != 0){
                    this.inc = (Number(this.inc) - Number(this.transaction[index])).toFixed(2);
                }
            }

            this.transaction.splice(index, 1);
            this.balance();
            this.details.splice(index, 1);
            this.isEmpty();
        },
        template() {
            let template = `
                <div class="flex items-center" value="${this.current}">
                    <span class="material-icons ${this.class}">${this.icon}</span>
                    <p>${this.text}</p>
                </div>
                <div class="flex items-center">
                    <p style="color: ${this.color}">${this.type} ${this.current}</p>
                    <button class="transaction__bin">
                    <span class="material-icons">delete</span>
                    </button>
                </div>`;
            this.details.unshift(template);
        },
        selectedItem(e) {
            console.log("this.e",e);
            this.icon = e.target.innerText;
            this.text = e.target.nextElementSibling.innerText;
            this.class = e.target.className;
            console.log("this.icon:",e.target.firstChild.innerText);
            console.log("this.text:",e.target.lastChild.innerText);
            console.log("this.class:",e.target.className);
        },
        selectedTab(id) {
            if(id == 1) {
                this.tab = "Income";
                this.incomeBtn = true;
                this.$refs.defaultInc.checked = true;
                this.$refs.tab1.className = this.$refs.tab1.className + ' bg-purple-500 text-white';
                this.$refs.tab2.classList.remove('bg-purple-500', 'text-white');
                this.icon = 'attach_money';
                this.text = 'Salary';
                this.class = 'p-2 bg-yellow-100 rounded-3xl';
            } else if(id == 2) {
                this.tab = "Expense";
                this.incomeBtn = false;
                // this.$refs.tab1.classList
                console.log("this.$refs.tab2.classList: ", this.$refs.tab2.classList);
                this.$refs.tab2.className = this.$refs.tab2.className + ' bg-purple-500 text-white';
                this.$refs.tab1.classList.remove('bg-purple-500', 'text-white');
                this.$refs.defaultExp.checked = true;
                this.icon = 'home';
                this.text = 'Rent';
                this.class = 'p-2 bg-yellow-100 rounded-3xl';
            }
        },
        isEmpty() {
            if(this.details.length == 0) {
                this.empty = true;
            } else {
                this.empty = false;
            }
        }
    }
}
</script>

<style scoped>
    
</style>