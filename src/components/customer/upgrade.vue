

<script>
import axios from 'axios'

export default {
          props: ['user'],

  data: () => ({
      dialog: false,
    package_req: 0,
      ind:0,
    sendData:{},
    packages: [{}],
    url: '',
    paybal_dialog: false,
    haramreceipt: null,
    loading: false,
    wrongcr: false,
    done: false,
    wrgmsg: '',
    absolute: true,
    lod: true,
    successurl: ''
     
  }), 

  methods: {
    changeClass(value) {
      return {
        'mod': value <2 ,
        'rev_mod': value >= 2,
        
      }
    },
    alharam() {
                this.loading = true

      const formData = new FormData();
      formData.append('customer_id', this.user.id);
      formData.append('hostingplan_id', this.package_req);
      formData.append('final_price', this.packages[this.ind].yearly_price);
      formData.append('receipt', this.haramreceipt);

      axios
        .post('/api/customer/alharam', formData,{
            headers: {
              'Content-Type': `multipart/form-data; boundary=<calculated when request is sent>`
            }
        }

        )
      .then(res => {
        if (res.data.status == 'success') {

          console.log(res)
          this.loading = false
          this.done = true
          this.dialog = false
          this.wrgmsg = res.response.data.message

        } else {
            this.wrgmsg = res.response.data.message
            this.wrongcr = true
            this.loading = false
                    this.dialog = false

          }
        })
        .catch(error => {
          console.log(error)
          this.wrgmsg = error.response.data.message
          this.wrongcr = true
          this.loading = false
                    this.dialog = false

        })
    },
     paypale() {
      axios
        .post(
          '/api/customer/pay',
          {
            customer_id:this.user.id,
            package_id:this.package_req,
            final_price:this.packages[this.ind].yearly_price_outside_syria
          },
        
        )
        .then(res => {
          console.log(res)
          const dataToSave = { name: this.user.f_name, package: this.packages[this.ind].package_type };

          sessionStorage.setItem("requested_package", JSON.stringify(dataToSave));
          this.url = res.data.URL
         
        })
       
     
    },

    approve(order_id) {
      {
        const savedData = sessionStorage.getItem("requested_package");
        const parsedData = JSON.parse(savedData);
        this.loading = true
         const formData = new FormData();
        formData.append('username', parsedData.name);
        formData.append('domain', parsedData.name + '.com');
        formData.append('plan', parsedData.package);
        formData.append('password', "fsdkljf234@#EWDFF34234");

        axios.post(`api/add-acc-test`, formData,{
          
          headers: {
            "ngrok-skip-browser-warning": true,

          }
        }).then((response) => {
          console.log(response)
          if (response.data.account_created == "Account was created successfully") {

            axios.post(`api/admin/approved/${order_id}`, {
                customer_id: this.user.id,
              hostingplan_id: this.packages[this.ind].id,
              price: this.packages[this.ind].yearly_price_outside_syria,
              headers: {
                "ngrok-skip-browser-warning": true,
                "content-type": "application/json",

              }
            }).then((response) => {
              console.log(response)
              if (response.data.status == "Success") {
                this.successmsg = true
                this.wrgmsg = response.data.message

              }
              else {
                console.log(response)
                this.wrgmsg = res.data.message
                this.wrongcr = true
              }

            }).catch((error) => console.log(error))

          }
          else {
            console.log(response)
            this.wrgmsg = response.data.message
            this.wrongcr = true
          }

          this.loading = false
          this.Check_request = false,
            this.save = false
          this.getdata()


        }).catch((error) => console.log(error))
      }
    }


    
  },
   created() {
     {
     
      axios.get(`/api/customer/showpackages`, {
        headers: {
          "ngrok-skip-browser-warning": true,
          
        }
      }).then((response) => {
        console.log(response)
        this.packages = response.data.packages
        this.lod = false
      }).catch((error) => console.log(error))

       this.successurl = window.location.href
             const url = new URL(this.successurl);


     
        const searchParams = new URLSearchParams(url.search);
        const status = searchParams.get("status");
        const orderData = JSON.parse(decodeURIComponent(searchParams.get("order")));
      console.log(status);

        if (status == 'Payment_Complete.') {

          this.approve(orderData.id)
        }
      
    }
  }
}

</script>

<style>

</style>