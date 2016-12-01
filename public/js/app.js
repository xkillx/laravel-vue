new Vue({

  // target elemen dengan id 'app'
  el: '#app',

  // data attribut yang akan dibind di html
  data: {
    event: { id: null, name: '', description: '', date: '' },
    events: [],
    edit: false
  },

  // method yang akan dijalankan ketika vue baru berjalan
  mounted: function () {
    // 'this' mereferensi ke object vue
    this.fetchEvents();
  },

  // methods yang akan dipakai di aplikasi ini
  methods: {

    // 
    fetchEvents: function() {
      this.$http.get('api/events').then(function(res) {
        this.$set(this, 'events', res.body);
      }, function(error) {
        console.log(error);
      });
    },

    // Add atau Edit events
    addEvent: function() {
      // jika mempunyai id maka edit
      if (this.edit) {
        this.$http.put('api/events/' + this.event.id, this.event).then(function(res) {
          this.fetchEvents();
          this.clear();
        }, function(error) {
          console.log(error);
        });
      }
      else { // jika tidak maka save
        this.$http.post('api/events', this.event).then(function(res) {
          this.fetchEvents();
          this.clear();
        }, function(error) {
          console.log(error);
        });
      }
    },

    deleteEvent: function(event, index) {
      if(confirm("Are you sure you want to delete this event?")) {
          this.$http.delete('api/events/' + event.id).then(function(res) {
          this.fetchEvents();
          this.clear();
        }, function(error) {
          console.log(error);
        });
      }
    },

    editEvent: function(event) {
      this.event.id = event.id;
      this.event.name = event.name;
      this.event.description = event.description;
      this.event.date = event.date;
      this.edit = true;
    },

    clear() {
      this.event = { id: null, name: '', description: '', date: '' };
      this.edit = false;
    }
  }
});