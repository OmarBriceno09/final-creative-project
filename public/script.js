var app = new Vue({
  el: '#app',
  data: {
    game_Ends:false,
    showForm: false,
    user: null,
    img_url_p1: "images/P1.png",
    img_url_p2:"images/question_mark.png",
    addedName: '',
    addedProblem: '',
    addedScore: 1,
    numOfWins: 0,
    p1_ans:0,
    p2_ans:0,
    scores: {},
  },
  created() {
    this.getScores();
  },
  methods: {
    async getScores() {
      try {
        let response = await axios.get("/api/tickets");
        this.scores = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addScores() {
      try {
        let response = await axios.post("/api/tickets", {
          name: this.addedName,
          win_score: this.numOfWins,
          problem: this.addedProblem
        });
        this.addedName = "";
        this.addedScore=1;
        this.numOfWins=0;
        this.addedProblem = "";
        this.getScores();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteScore(score) {
      try {
        let response = await axios.delete("/api/tickets/" + score._id);
        this.getScores();
      } catch (error) {
        console.log(error);
      }
    },
    async playMove() {
      var out_2 = Math.floor(Math.random() * 2);
      //out_2 = 1;
      if (out_2==0){
        this.img_url_p2 = "images/rock.png";
        this.p2_ans = 0;
      }else if(out_2==1){
        this.img_url_p2 = "images/paper.png";
        this.p2_ans = 1;
      }else{
        this.img_url_p2 = "images/scissors.png";
        this.p2_ans = 2;
      }
      if ((this.p1_ans==this.p2_ans)||(this.p1_ans==1&&this.p2_ans==0)||
        (this.p1_ans==2&&this.p2_ans==1)||(this.p1_ans==0&&this.p2_ans==2)){
          
        if(!(this.p1_ans==this.p2_ans)){
          this.numOfWins = this.numOfWins+1;
        }
        window.setTimeout(this.playAgain, 2000);
        window.setTimeout(this.incrementRound, 2000)
      }
      else
        window.setTimeout(this.gameEnds, 2000);
    },
    async gameEnds() {
      this.game_Ends = true;
      this.toggleForm();
    },
    async playAgain() {
      this.game_Ends = false;
      this.img_url_p1 = "images/P1.png";
      this.img_url_p2 = "images/question_mark.png";
      //return this.img_url_p1;
      //this.toggleForm();
    },
    async chooseRock() {
      this.img_url_p1 = "images/rock.png";
      this.p1_ans = 0;
    },
    async choosePaper() {
      this.img_url_p1 = "images/paper.png";
      this.p1_ans = 1;
    },
    async chooseScissor() {
      this.img_url_p1 = "images/scissors.png";
      this.p1_ans = 2;
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    closeForm() {
      this.showForm = false;
    },
    incrementRound(){
      this.addedScore = this.addedScore+1;
    },
  },
  computed: {
    sortedScores(){
      return this.scores.sort((a, b) => {
                var rval = 0;
                if(a.win_score > b.win_score) {
                    rval = -1;
                } else if(a.win_score < b.win_score) {
                    rval = 1;
                }
                return(rval);
            })
    }
  },
});