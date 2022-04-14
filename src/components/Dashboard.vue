<template>
  <div>
    <v-divider></v-divider>
    <br />
    <h3>Subscribe to Channel to get Notified !</h3>
    <p> your account address is: {{account}} </p>
    <v-divider></v-divider>
    <v-card class="mx-auto">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Channels</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          elevation="2"
          depressed
          right
          color="secondary"
          @click="createAChannel()"
          >Create Channel</v-btn
        >
        <v-btn elevation="2" depressed right color="pink" @click="getChannels()"
          >Refresh</v-btn
        >
      </v-toolbar>

      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="pink--text"
          multiple
        >
          <template v-for="(item) in protocolList">
            <v-list-item :key="item.payload.protocol">
              <template>
                <v-list-item-content>
                  <v-list-item-title v-text="item.payload.protocol"></v-list-item-title>

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.payload.protocolContractAddress"
                  ></v-list-item-subtitle>

                  <v-list-item-subtitle
                    v-text="item.payload._newHash"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn color="secondary"
                        elevation="2"
                @click="viewProtocol(item.payload)"
                >view</v-btn>
                <br/>
                 <v-btn v-if="!subscribed" color="primary"
                        elevation="2"
                 @click="subscribe(item)"
                >Opt-In</v-btn>
                 <v-btn v-if="subscribed" color="warning"
                        elevation="2"
                 @click="unSubscribe(item)"
                >Opt-Out</v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>

            <!-- <v-divider v-if="index < items.payload - 1" :key="index"></v-divider> -->
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { contractInstance1, getAccount } from "../web3";
import { uploadToIPFS  } from "../ipfs";
import { addData, getData, isUserSubscribed, getPushToken } from "../firebase/crud";

export default {
  name: "Dashboard",
  data: () => ({
    protocolName: "",
    protocolAddress: "",
    protocolMeta: "",
    parent: "",
    protocolList: [],
    subscribed: false,
    token: "",
    protocolType: [
      { id: 1, name: "ERC721" },
      { id: 2, name: "DAO" },
    ],
    account: null,
    selected: '',
  }),
  async created() {
    let acnt = await getAccount();
    console.log("acnt" + acnt);
    if (acnt == null || acnt == "") {
      this.$router.push({ path: "/" });
    } else {
      this.account = acnt;
    }
    this.token = await getPushToken();
    console.log('token ' + this.token);
    this.subscribed = await isUserSubscribed(this.account);
    console.log('this.subscribed : ' +  this.subscribed);
    this.protocolList = await getData('protocol');

  },
  methods: {
    getListOfChannels() {
      contractInstance1.methods
        .getChannel(11)
        .call({ from: this.account })
        .then((res) => {
          console.log(JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getChannels() {
      this.protocolList = await getData('protocol');
         this.subscribed = await isUserSubscribed(this.account);
    },
    async createAChannel() {
      const { value } = await this.$swal({
        title: "Create a new Channel",
        html: `<input id="my-input" value="${
          this.protocolName
        }" placeholder="Protocol Name" class="swal2-input">
         <input id="my-input1" value="${
           this.protocolMeta
         }" placeholder="Protocol MetaInfo" class="swal2-input">
          <input id="my-input2" value="${
            this.protocolAddress
          }" placeholder="Protocol Contract Address" class="swal2-input">
          <br>
           <br>
        <label> select contract type </label>
           <br>
         <select id="my-select" value="${
           this.parent
         }" name="parent" class="form-control">
            <option value="">select</option>
            ${this.protocolType.map(
              (cat) => `<option value="${cat.id}">${cat.name}</option>`
            )}
          </select>`,
        preConfirm: () => [
          document.getElementById("my-input").value,
          document.getElementById("my-input1").value,
          document.getElementById("my-input2").value,
          document.getElementById("my-select").value,
        ],
        showCancelButton: true,
        confirmButtonText: "Create",
        cancelButtonText: "Cancel",
        showCloseButton: true,
      });
      let metadata = {
        meta: value[1],
        protocolType: "ERC721",
      };
      console.log(metadata);
      let cid = await uploadToIPFS(metadata);
      console.log("cid : " + cid);
      console.log("protocol name : " + value[0]);
      console.log("protocol address : " + value[2]);
      contractInstance1.methods
        .createChannel(this.protocolList.length+1, value[0], value[2], cid)
        .send({ from: this.account })
        .then(async (res) => {
          await addData('protocol', this.protocolList.length + 1, {
            protocol: value[0],
            protocolContractAddress: value[2],
            _newHash: cid,
          });
          this.$swal.fire(JSON.stringify(res));
          console.log(res);
        })
        .catch((err) => {
          this.$swal.fire(JSON.stringify(err));
        });
    },

    async viewProtocol(protocol) {
        this.$swal.fire({ html: `
          <p>"${JSON.stringify(protocol)}"</p>
        `});
    },
    subscribe(item) {
        contractInstance1.methods.subscribedToChannel(item.id, "")
         .send({ from: this.account })
        .then(async (res) => {
          await addData('subscriber', this.account, {
              IsSubscribed: true,
              token: this.token
          });
          this.$swal.fire(JSON.stringify(res));
          console.log(res);
        })
        .catch((err) => {
          this.$swal.fire(JSON.stringify(err));
        });
    },
    unSubscribe(item) {
             contractInstance1.methods.subscribedToChannel(item.id, "")
         .send({ from: this.account })
        .then(async (res) => {
          await addData('subscriber', this.account, {
              IsSubscribed: false,
              token: this.token
          });
          this.$swal.fire(JSON.stringify(res));
          console.log(res);
        })
        .catch((err) => {
          this.$swal.fire(JSON.stringify(err));
        });

    }
  },
  computed: {},
};
</script>

